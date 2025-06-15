
import { useParams, Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { blogPosts } from "@/data/blogPosts";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, ArrowLeft } from "lucide-react";

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
            className="px-6 py-2 bg-vitality-400 text-white rounded-lg hover:bg-vitality-500"
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
      <section className="bg-vitality-50 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center text-vitality-500 hover:text-vitality-700 mb-4"
          >
            <ArrowLeft className="mr-1 h-5 w-5" />
            Back to all articles
          </Link>
          <img
            src={post.image}
            alt={post.title}
            className="w-full rounded-lg mb-8 object-cover max-h-72"
          />
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="outline" className="bg-vitality-100 text-vitality-700 border-vitality-200">
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
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-6 text-vitality-700">
            {post.title}
          </h1>
          <p className="text-gray-600 mb-8 text-lg">{post.excerpt}</p>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br/>") }} />
        </div>
      </section>
    </PageLayout>
  );
}
