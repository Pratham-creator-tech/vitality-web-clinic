
// ... similar structure: use relevant title/excerpt/image from Blog.tsx ...
import PageLayout from "@/components/layout/PageLayout";
export default function SportsInjuryRecovery() {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-vitality-700">Recovering from a Sports Injury: What You Need to Know</h1>
        <img className="w-full rounded-lg mb-8" src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" alt="" />
        <p className="mb-6">A comprehensive guide to the recovery process after a sports injury, including what to expect and how to enhance healing.</p>
        <p>Follow your care professional’s advice.<br/>Eat well, rest, and gradually increase activity as guided.</p>
      </div>
    </PageLayout>
  );
}
