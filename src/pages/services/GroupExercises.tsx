
import PageLayout from "@/components/layout/PageLayout";
export default function GroupExercisesPage() {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-vitality-700">Group Exercise</h1>
        <img className="w-full rounded-lg mb-8" src="/placeholder.svg" alt="Group Exercise" />
        <p className="mb-6">Participate in expertly-led group exercise sessions designed for all fitness levels with focus on injury prevention and fun!</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Inclusive sessions</li>
          <li>Motivational environment</li>
          <li>Supportive community</li>
        </ul>
      </div>
    </PageLayout>
  );
}
