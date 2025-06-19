
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";
import AIChat from "@/components/ai/AIChat";
import { Heart } from "lucide-react";

const AIAssistant = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-vitality-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-vitality-100/30"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6 bg-white rounded-full py-2 px-6 w-fit mx-auto shadow-sm border border-blue-100">
              <Heart className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-sm font-medium text-gray-700">AI-Powered Healthcare Assistant</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display text-blue-900 leading-tight">
              AI 
              <span className="text-blue-600 block">Healthcare Assistant</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Get instant answers to your physiotherapy questions and concerns with our intelligent AI assistant powered by Yasha Physiocare's expertise.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <SectionTitle
          title="Chat with Our AI Assistant"
          subtitle="Ask questions about physiotherapy, treatments, exercises, or general health concerns."
          center
        />

        <div className="max-w-4xl mx-auto mt-8">
          <Card className="border-2 border-blue-100 shadow-lg">
            <CardContent className="p-6">
              <AIChat />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default AIAssistant;
