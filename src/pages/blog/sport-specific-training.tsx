
import PageLayout from "@/components/layout/PageLayout";
export default function SportSpecificTraining() {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-vitality-700">Improving Athletic Performance with Sport-Specific Training</h1>
        <img className="w-full rounded-lg mb-8" src="https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" alt="" />
        <p className="mb-6">
          Discover how targeted physiotherapy and training can enhance performance in your specific sport or athletic activity.
        </p>
        <p>Work with coaches or therapists to tailor your program.</p>
      </div>
    </PageLayout>
  );
}
