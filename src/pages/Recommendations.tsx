
import PageLayout from "@/components/layout/PageLayout";
import RecommendationEngine from "@/components/recommendations/RecommendationEngine";

const Recommendations = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <RecommendationEngine />
      </div>
    </PageLayout>
  );
};

export default Recommendations;
