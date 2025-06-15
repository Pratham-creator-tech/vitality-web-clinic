
// Page for "Obesity Management & Fitness"
import PageLayout from "@/components/layout/PageLayout";
export default function ObesityManagementPage() {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-vitality-700">Obesity Management & Fitness</h1>
        <img className="w-full rounded-lg mb-8" src="/placeholder.svg" alt="Obesity Management & Fitness" />
        <p className="mb-6">Our comprehensive programs help clients manage weight and improve fitness through guided exercise, nutrition, and ongoing support.</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Personalized fitness plans</li>
          <li>Nutrition counseling</li>
          <li>Behavior modification techniques</li>
        </ul>
      </div>
    </PageLayout>
  );
}
