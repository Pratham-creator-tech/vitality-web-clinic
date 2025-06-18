
import { useParams, Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { blogPosts } from "@/data/blogPosts";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, ArrowLeft, Heart } from "lucide-react";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find the blog post by slug (note: in Blog.tsx, slugs used as "/blog/slug")
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <PageLayout>
        <div className="container mx-auto py-20 px-4 text-center">
          <h2 className="text-3xl font-bold mb-2 text-vitality-700">Article Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the article you're looking for.</p>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="inline-block mr-2 h-4 w-4" />
            Go Back
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-vitality-50 via-white to-blue-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-green-100/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-1 h-5 w-5" />
            Back to all articles
          </Link>
          
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <img
              src={post.image}
              alt={post.title}
              className="w-full object-cover max-h-96"
            />
            
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="secondary" className="bg-vitality-100 text-vitality-700 border-vitality-200">
                  {post.category}
                </Badge>
                <span className="flex items-center text-gray-500 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.date}
                </span>
                <span className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold font-display mb-6 text-vitality-700 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">{post.excerpt}</p>
              
              <div className="prose max-w-none text-gray-600 leading-relaxed" 
                   dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br/>") }} />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
