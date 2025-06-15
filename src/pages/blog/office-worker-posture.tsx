
import PageLayout from "@/components/layout/PageLayout";
export default function OfficeWorkerPosture() {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-vitality-700">The Importance of Proper Posture for Office Workers</h1>
        <img className="w-full rounded-lg mb-8" src="https://images.unsplash.com/photo-1541591425126-4e6dcb9351d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" alt="" />
        <p className="mb-6">Learn how maintaining good posture during long hours at a desk can prevent chronic pain and improve your overall wellbeing.</p>
        <p>Tips: Adjust your ergonomic setup, take regular breaks, and include stretching in your routine.</p>
      </div>
    </PageLayout>
  );
}
