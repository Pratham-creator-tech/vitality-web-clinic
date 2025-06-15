
import PageLayout from "@/components/layout/PageLayout";
export default function ExampleServicePage() {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-vitality-700">Example Service Title</h1>
        <img className="w-full rounded-lg mb-8" src="/placeholder.svg" alt="Example Service" />
        <p className="mb-6">
          This is a placeholder service detail page. Replace this with a specific description of the service, including what the patient can expect.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Feature or benefit 1</li>
          <li>Feature or benefit 2</li>
          <li>Feature or benefit 3</li>
        </ul>
      </div>
    </PageLayout>
  );
}
