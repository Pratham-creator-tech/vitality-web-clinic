
import { Link } from "react-router-dom";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "5 Exercises to Relieve Lower Back Pain",
    excerpt: "Discover effective stretches and strengthening exercises that can help alleviate lower back pain and improve mobility.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1720&q=80",
    date: "April 12, 2023",
    readTime: "5 min read",
    slug: "/blog/lower-back-pain-exercises"
  },
  {
    id: 2,
    title: "The Importance of Proper Posture for Office Workers",
    excerpt: "Learn how maintaining good posture during long hours at a desk can prevent chronic pain and improve your overall wellbeing.",
    image: "https://images.unsplash.com/photo-1541591425126-4e6dcb9351d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    date: "March 28, 2023",
    readTime: "7 min read",
    slug: "/blog/office-worker-posture"
  },
  {
    id: 3,
    title: "Recovering from a Sports Injury: What You Need to Know",
    excerpt: "A comprehensive guide to the recovery process after a sports injury, including what to expect and how to enhance healing.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    date: "March 15, 2023",
    readTime: "8 min read",
    slug: "/blog/sports-injury-recovery"
  }
];

const BlogPreview = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Latest Health Tips & Insights" 
          subtitle="Stay informed with our latest articles on physiotherapy, wellness, and maintaining optimal health."
          center
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <Link to={post.slug} className="block">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-vitality-700">
                  <Link to={post.slug} className="hover:text-vitality-500 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <Link 
                  to={post.slug}
                  className="inline-flex items-center text-vitality-500 font-medium hover:text-vitality-600"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="outline">
            <Link to="/blog" className="flex items-center">
              View All Articles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
