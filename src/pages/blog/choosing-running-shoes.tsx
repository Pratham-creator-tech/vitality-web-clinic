
import PageLayout from "@/components/layout/PageLayout";
export default function ChoosingRunningShoes() {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-vitality-700">How to Choose the Right Running Shoes to Prevent Injuries</h1>
        <img className="w-full rounded-lg mb-8" src="https://images.unsplash.com/photo-1562183241-b937e95585b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1965&q=80" alt="" />
        <p className="mb-6">
          Find out what factors to consider when selecting running shoes that will support your unique gait and help prevent common injuries.
        </p>
        <p>
          Consider gait analysis, cushioning, fit, and always try before buying.
        </p>
      </div>
    </PageLayout>
  );
}
