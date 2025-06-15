
import PageLayout from "@/components/layout/PageLayout";
export default function ExampleArticle() {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-vitality-700">Example Blog Article</h1>
        <img className="w-full rounded-lg mb-8" src="/placeholder.svg" alt="Blog Example" />
        <p className="mb-6">This is a placeholder blog article. Replace this with actual health tips or insights relevant to your clinic and patients.</p>
        <p>
          Written by our experts. Stay tuned for regular updates!
        </p>
      </div>
    </PageLayout>
  );
}
