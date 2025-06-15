
import PageLayout from "@/components/layout/PageLayout";
export default function LowerBackPainExercises() {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-vitality-700">5 Exercises to Relieve Lower Back Pain</h1>
        <img className="w-full rounded-lg mb-8" src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1720&q=80" alt="" />
        <p className="mb-6">Discover effective stretches and strengthening exercises that can help alleviate lower back pain and improve mobility.</p>
        <p>
          1. Cat-Cow Stretch<br/>
          2. Child’s Pose<br/>
          3. Pelvic Tilts<br/>
          4. Knee-to-Chest Stretch<br/>
          5. Bird Dog<br/><br/>
          Always consult your physiotherapist before starting new exercises.
        </p>
      </div>
    </PageLayout>
  );
}
