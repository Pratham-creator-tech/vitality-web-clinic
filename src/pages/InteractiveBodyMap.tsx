
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Interactive3DBodyMap from "@/components/features/Interactive3DBodyMap";

type BodyPart = {
  id: string;
  name: string;
  title: string;
  description: string;
  commonIssues: string[];
  treatments: string[];
  link: string;
};

const bodyPartsData: BodyPart[] = [
  {
    id: "neck",
    name: "neck",
    title: "Neck",
    description: "The neck contains vertebrae, muscles, and connective tissue that support the head and allow movement.",
    commonIssues: [
      "Cervical strain",
      "Whiplash",
      "Herniated disc",
      "Cervical spondylosis",
      "Tech neck"
    ],
    treatments: [
      "Manual therapy",
      "Postural correction",
      "Strengthening exercises",
      "Ergonomic adjustments"
    ],
    link: "/services/manual-therapy"
  },
  {
    id: "shoulder",
    name: "shoulders",
    title: "Shoulders",
    description: "The shoulder is a ball-and-socket joint with extensive range of motion, supported by muscles and ligaments.",
    commonIssues: [
      "Rotator cuff tears",
      "Frozen shoulder",
      "Impingement",
      "Bursitis",
      "Tendonitis"
    ],
    treatments: [
      "Joint mobilization",
      "Rotator cuff strengthening",
      "Range of motion exercises",
      "Posture correction"
    ],
    link: "/services/sports-rehabilitation"
  },
  {
    id: "back",
    name: "back",
    title: "Back",
    description: "The back contains the spine, multiple muscle groups, and supports the body's structure and movement.",
    commonIssues: [
      "Lower back pain",
      "Sciatica",
      "Herniated discs",
      "Spinal stenosis",
      "Muscle strains"
    ],
    treatments: [
      "Core strengthening",
      "Manual therapy",
      "Postural education",
      "McKenzie method exercises"
    ],
    link: "/services/chronic-pain"
  },
  {
    id: "elbow",
    name: "elbows",
    title: "Elbows",
    description: "The elbow is a hinge joint that allows extension and flexion of the arm, crucial for daily activities.",
    commonIssues: [
      "Tennis elbow",
      "Golfer's elbow",
      "Cubital tunnel syndrome",
      "Bursitis",
      "Sprains"
    ],
    treatments: [
      "Eccentric strengthening",
      "Wrist and forearm exercises",
      "Manual therapy",
      "Activity modification"
    ],
    link: "/services/sports-rehabilitation"
  },
  {
    id: "wrist",
    name: "wrists",
    title: "Wrists & Hands",
    description: "The wrists and hands contain multiple small joints and muscles that provide dexterity and grip strength.",
    commonIssues: [
      "Carpal tunnel syndrome",
      "Trigger finger",
      "DeQuervain's tenosynovitis",
      "Arthritis",
      "Sprains"
    ],
    treatments: [
      "Grip strengthening",
      "Nerve gliding exercises",
      "Joint mobilization",
      "Ergonomic training"
    ],
    link: "/services/manual-therapy"
  },
  {
    id: "hip",
    name: "hips",
    title: "Hips",
    description: "The hip is a ball-and-socket joint connecting the leg to the pelvis, supporting weight and allowing movement.",
    commonIssues: [
      "Osteoarthritis",
      "Hip bursitis",
      "Labral tears",
      "Hip impingement",
      "Tendonitis"
    ],
    treatments: [
      "Strengthening exercises",
      "Range of motion work",
      "Manual therapy",
      "Gait training"
    ],
    link: "/services/strength-conditioning"
  },
  {
    id: "knee",
    name: "knees",
    title: "Knees",
    description: "The knee is a hinge joint that allows flexion and extension of the leg, crucial for walking and running.",
    commonIssues: [
      "ACL tears",
      "Meniscus injuries",
      "Patellofemoral pain",
      "Osteoarthritis",
      "Patellar tendonitis"
    ],
    treatments: [
      "Quadriceps strengthening",
      "Balance training",
      "Manual therapy",
      "Functional exercises"
    ],
    link: "/services/sports-rehabilitation"
  },
  {
    id: "ankle",
    name: "ankles",
    title: "Ankles & Feet",
    description: "The ankles and feet contain numerous bones, joints, and muscles that support weight and enable movement.",
    commonIssues: [
      "Ankle sprains",
      "Plantar fasciitis",
      "Achilles tendonitis",
      "Flat feet",
      "Bunions"
    ],
    treatments: [
      "Balance exercises",
      "Foot intrinsic strengthening",
      "Joint mobilization",
      "Gait retraining"
    ],
    link: "/services/manual-therapy"
  },
];

const InteractiveBodyMap = () => {
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [view, setView] = useState<"front" | "back">("front");

  const handlePartClick = (partId: string) => {
    const part = bodyPartsData.find(part => part.id === partId);
    if (part) {
      setSelectedPart(part);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4 max-w-full overflow-x-hidden">
        <SectionTitle
          title="Interactive Body Map"
          subtitle="Explore the human body and learn about common injuries and treatments"
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="md:col-span-1 flex flex-col">
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Interact with the 3D model to learn about common injuries and treatments for different body regions.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Click and drag to rotate the model</li>
                  <li>Click on any body part for information</li>
                  <li>Toggle between front and back views</li>
                  <li>Learn about treatments we offer</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-[400px] h-[600px]"
            >
              <Interactive3DBodyMap 
                bodyPartsData={bodyPartsData} 
                onPartSelect={handlePartClick}
              />
            </motion.div>
          </div>

          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{selectedPart ? selectedPart.title : "Body Information"}</CardTitle>
                <CardDescription>
                  {selectedPart 
                    ? `Learn about common issues and treatments for the ${selectedPart.name}`
                    : "Select a body part to see detailed information"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedPart ? (
                  <motion.div
                    key={selectedPart.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedPart.description}</p>
                    
                    <h4 className="font-semibold text-vitality-700 dark:text-vitality-300 mt-4 mb-2">Common Issues:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
                      {selectedPart.commonIssues.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                    
                    <h4 className="font-semibold text-vitality-700 dark:text-vitality-300 mt-4 mb-2">Treatment Approaches:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-6">
                      {selectedPart.treatments.map((treatment, index) => (
                        <li key={index}>{treatment}</li>
                      ))}
                    </ul>
                    
                    <Button asChild className="w-full mt-4 bg-vitality-600 hover:bg-vitality-700 text-white">
                      <Link to={selectedPart.link} className="flex items-center justify-center">
                        View Related Services
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Click on a body part to view information</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default InteractiveBodyMap;
