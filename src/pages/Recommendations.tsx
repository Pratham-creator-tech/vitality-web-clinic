
import PageLayout from "@/components/layout/PageLayout";
import RecommendationEngine from "@/components/recommendations/RecommendationEngine";
import { Heart } from "lucide-react";

const Recommendations = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-vitality-50 via-white to-blue-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-green-100/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6 bg-white rounded-full py-2 px-6 w-fit mx-auto shadow-sm border border-blue-100">
              <Heart className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-sm font-medium text-gray-700">Personalized Healthcare Recommendations</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700 leading-tight">
              Doctor 
              <span className="text-blue-600 block">Recommendations</span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Find the perfect healthcare professional based on your specific needs and location.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-16 px-4">
        <RecommendationEngine />
      </div>
    </PageLayout>
  );
};

export default Recommendations;
