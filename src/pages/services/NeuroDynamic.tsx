
import PageLayout from "@/components/layout/PageLayout";
export default function NeuroDynamicPage() {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-vitality-700">Neuro Dynamic Solution</h1>
        <img className="w-full rounded-lg mb-8" src="/placeholder.svg" alt="Neuro Dynamic Solution" />
        <p className="mb-6">Neurodynamic solutions target nerve mobility issues contributing to pain and movement limitations.</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Nerve gliding techniques</li>
          <li>Reduction of neural tension</li>
          <li>Functional improvement</li>
        </ul>
      </div>
    </PageLayout>
  );
}
