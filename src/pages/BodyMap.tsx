
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import Interactive3DBodyMap from "@/components/features/Interactive3DBodyMap";

// Minimal dummy data just to make component render
const bodyPartsData = [
  {
    id: "neck",
    name: "Neck",
    title: "Neck",
    description: "The neck contains vertebrae, muscles, and connective tissue.",
    commonIssues: ["Cervical strain", "Herniated disc"],
    treatments: ["Manual therapy", "Postural correction"],
    link: "#"
  },
  {
    id: "back",
    name: "Back",
    title: "Back",
    description: "The back supports the body's structure and movement.",
    commonIssues: ["Lower back pain"],
    treatments: ["Core strengthening"],
    link: "#"
  },
  // Add more as needed for demo, or use your full data...
];

const BodyMap = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-12">
        <SectionTitle
          title="3D Body Map"
          subtitle="Click on a body part to explore details"
          center
        />
        <div className="flex justify-center my-12">
          <div className="w-full max-w-xl">
            <Interactive3DBodyMap
              bodyPartsData={bodyPartsData}
              onPartSelect={() => {}}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BodyMap;
