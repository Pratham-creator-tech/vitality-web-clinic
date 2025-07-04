
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";
import EnhancedAIChat from "@/components/ai/EnhancedAIChat";
import { Heart, Bot, FileText, Stethoscope } from "lucide-react";

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
              <Bot className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-sm font-medium text-gray-700">AI-Powered Healthcare Assistant</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display text-blue-900 leading-tight">
              Enhanced AI 
              <span className="text-blue-600 block">Medical Assistant</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Upload medical files for analysis, get doctor recommendations, and receive expert answers to your healthcare questions with our advanced AI assistant.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">File Analysis</h3>
              <p className="text-gray-600 text-sm">
                Upload medical reports, lab results, and documents for intelligent analysis and insights.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Stethoscope className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Doctor Recommendations</h3>
              <p className="text-gray-600 text-sm">
                Get personalized specialist recommendations based on your symptoms and health needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Bot className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Answers</h3>
              <p className="text-gray-600 text-sm">
                Ask questions about health, treatments, and medical conditions for expert guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <SectionTitle
          title="Your AI Medical Assistant"
          subtitle="Upload files, find doctors, and get expert medical guidance all in one place."
          center
        />

        <div className="max-w-5xl mx-auto mt-8">
          <Card className="border-2 border-blue-100 shadow-lg">
            <CardContent className="p-6">
              <EnhancedAIChat />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default AIAssistant;
