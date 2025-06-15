
import PageLayout from "@/components/layout/PageLayout";
export default function KinesiotapingPage() {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-vitality-700">Kinesiotaping</h1>
        <img className="w-full rounded-lg mb-8" src="/placeholder.svg" alt="Kinesiotaping" />
        <p className="mb-6">Our certified therapists use kinesiotaping techniques to support muscles, manage pain, and improve function during rehabilitation.</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Pain management</li>
          <li>Enhanced joint stability</li>
          <li>Injury prevention</li>
        </ul>
      </div>
    </PageLayout>
  );
}
