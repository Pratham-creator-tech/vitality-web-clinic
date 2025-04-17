
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";
import AIChat from "@/components/ai/AIChat";

const AIAssistant = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="AI Assistant"
          subtitle="Get instant answers to your physiotherapy questions and concerns."
          center
        />

        <div className="max-w-4xl mx-auto mt-8">
          <Card className="border-2 border-vitality-100">
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
