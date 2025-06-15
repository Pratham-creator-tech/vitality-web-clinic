
import PageLayout from "@/components/layout/PageLayout";
export default function DryNeedlingPage() {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-vitality-700">Dry Needling Therapy</h1>
        <img className="w-full rounded-lg mb-8" src="/placeholder.svg" alt="Dry Needling Therapy" />
        <p className="mb-6">Dry needling helps release muscle trigger points and relieve chronic pain through specialist techniques.</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Trigger point release</li>
          <li>Reduction of muscle pain</li>
          <li>Improved flexibility</li>
        </ul>
      </div>
    </PageLayout>
  );
}
