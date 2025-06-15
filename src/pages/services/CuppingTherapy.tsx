
import PageLayout from "@/components/layout/PageLayout";
export default function CuppingTherapyPage() {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-vitality-700">Cupping Therapy</h1>
        <img className="w-full rounded-lg mb-8" src="/placeholder.svg" alt="Cupping Therapy" />
        <p className="mb-6">Cupping therapy relieves muscle tension, improves circulation, and is used as a recovery aid in rehabilitation programs.</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Muscle relaxation</li>
          <li>Improved blood flow</li>
          <li>Pain relief</li>
        </ul>
      </div>
    </PageLayout>
  );
}
