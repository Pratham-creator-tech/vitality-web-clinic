
import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, Calendar, ArrowRight } from "lucide-react";

const categories = [
  "All",
  "Exercise Tips",
  "Pain Management",
  "Injury Prevention",
  "Rehabilitation",
  "Wellness",
  "Sports Performance"
];

const blogPosts = [
  {
    id: 1,
    title: "5 Exercises to Relieve Lower Back Pain",
    excerpt: "Discover effective stretches and strengthening exercises that can help alleviate lower back pain and improve mobility.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1720&q=80",
    date: "April 12, 2023",
    readTime: "5 min read",
    category: "Pain Management",
    slug: "/blog/lower-back-pain-exercises",
    featured: true
  },
  {
    id: 2,
    title: "The Importance of Proper Posture for Office Workers",
    excerpt: "Learn how maintaining good posture during long hours at a desk can prevent chronic pain and improve your overall wellbeing.",
    image: "https://images.unsplash.com/photo-1541591425126-4e6dcb9351d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    date: "March 28, 2023",
    readTime: "7 min read",
    category: "Injury Prevention",
    slug: "/blog/office-worker-posture",
    featured: false
  },
  {
    id: 3,
    title: "Recovering from a Sports Injury: What You Need to Know",
    excerpt: "A comprehensive guide to the recovery process after a sports injury, including what to expect and how to enhance healing.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    date: "March 15, 2023",
    readTime: "8 min read",
    category: "Rehabilitation",
    slug: "/blog/sports-injury-recovery",
    featured: false
  },
  {
    id: 4,
    title: "How to Choose the Right Running Shoes to Prevent Injuries",
    excerpt: "Find out what factors to consider when selecting running shoes that will support your unique gait and help prevent common injuries.",
    image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
    date: "February 28, 2023",
    readTime: "6 min read",
    category: "Injury Prevention",
    slug: "/blog/choosing-running-shoes",
    featured: false
  },
  {
    id: 5,
    title: "The Role of Physiotherapy in Managing Chronic Conditions",
    excerpt: "Explore how physiotherapy can help manage and improve quality of life for those living with chronic health conditions.",
    image: "https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80",
    date: "February 15, 2023",
    readTime: "9 min read",
    category: "Wellness",
    slug: "/blog/physio-for-chronic-conditions",
    featured: false
  },
  {
    id: 6,
    title: "Core Strengthening Exercises for Better Stability",
    excerpt: "Discover effective core exercises that improve stability, posture, and help prevent back injuries.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    date: "January 30, 2023",
    readTime: "7 min read",
    category: "Exercise Tips",
    slug: "/blog/core-strengthening",
    featured: false
  },
  {
    id: 7,
    title: "Nutrition Tips for Optimal Recovery After Injury",
    excerpt: "Learn about the key nutrients and dietary strategies that can support healing and recovery after an injury or surgery.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1753&q=80",
    date: "January 15, 2023",
    readTime: "8 min read",
    category: "Wellness",
    slug: "/blog/nutrition-for-recovery",
    featured: false
  },
  {
    id: 8,
    title: "Improving Athletic Performance with Sport-Specific Training",
    excerpt: "Discover how targeted physiotherapy and training can enhance performance in your specific sport or athletic activity.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    date: "January 5, 2023",
    readTime: "10 min read",
    category: "Sports Performance",
    slug: "/blog/sport-specific-training",
    featured: false
  }
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
              Health Tips & Insights
            </h1>
            <p className="text-lg text-gray-700">
              Stay informed with the latest articles on physiotherapy, wellness, and maintaining optimal physical health.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <SectionTitle 
              title="Featured Article" 
              subtitle="Our most popular and informative content"
            />
            
            <div className="mt-8 bg-gray-50 rounded-lg overflow-hidden shadow-sm md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="p-8 md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <Badge variant="outline" className="bg-vitality-100 text-vitality-700 border-vitality-200">
                    {featuredPost.category}
                  </Badge>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredPost.date}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-vitality-700">
                  <Link to={featuredPost.slug} className="hover:text-vitality-500 transition-colors">
                    {featuredPost.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 mb-6">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {featuredPost.readTime}
                  </span>
                  
                  <Button asChild variant="outline">
                    <Link to={featuredPost.slug} className="flex items-center">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Blog Listing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <div className="relative md:w-1/3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search articles..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex overflow-x-auto pb-2 gap-2 md:flex-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                      selectedCategory === category
                        ? "bg-vitality-400 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Articles Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
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
                      <div className="flex items-center mb-2">
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                          {post.category}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 text-vitality-700 line-clamp-2">
                        <Link to={post.slug} className="hover:text-vitality-500 transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </span>
                        
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold text-gray-700 mb-2">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
            
            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="bg-vitality-100">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <span className="text-gray-500">...</span>
                <Button variant="outline" size="sm">8</Button>
                <Button variant="outline" size="sm">Next</Button>
              </nav>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-vitality-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-vitality-700">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 mb-6">
              Get the latest health tips, clinic updates, and exclusive content delivered straight to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1"
                required
              />
              <Button className="bg-accent hover:bg-accent/90 whitespace-nowrap">
                Subscribe Now
              </Button>
            </form>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
