
import { useState, useRef, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  Info, 
  Maximize, 
  Minimize, 
  Navigation,
  RotateCw, 
  ZoomIn, 
  ZoomOut 
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type Hotspot = {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
};

type PanoramaScene = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  hotspots: Hotspot[];
  connectedScenes: string[];
};

const panoramaScenes: PanoramaScene[] = [
  {
    id: "reception",
    title: "Reception Area",
    description: "Our welcoming reception area where our friendly staff will greet you upon arrival.",
    imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    hotspots: [
      {
        id: "reception-info",
        x: 25,
        y: 40,
        title: "Reception Desk",
        description: "Our reception team is ready to assist you with appointments, paperwork, and any questions you may have.",
        icon: <Info />,
      },
      {
        id: "reception-waiting",
        x: 75,
        y: 50,
        title: "Waiting Area",
        description: "Comfortable seating area where you can relax before your appointment.",
        icon: <Info />,
      },
    ],
    connectedScenes: ["treatment-room", "gym"],
  },
  {
    id: "treatment-room",
    title: "Treatment Room",
    description: "Private treatment rooms equipped with state-of-the-art physiotherapy equipment.",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80",
    hotspots: [
      {
        id: "treatment-table",
        x: 45,
        y: 55,
        title: "Treatment Table",
        description: "Ergonomic treatment tables designed for patient comfort during manual therapy sessions.",
        icon: <Info />,
      },
      {
        id: "treatment-equipment",
        x: 70,
        y: 40,
        title: "Therapeutic Equipment",
        description: "Advanced equipment used for electrotherapy, ultrasound, and other physiotherapy treatments.",
        icon: <Info />,
      },
    ],
    connectedScenes: ["reception", "gym"],
  },
  {
    id: "gym",
    title: "Rehabilitation Gym",
    description: "Spacious rehabilitation gym with specialized equipment for exercise and functional rehabilitation.",
    imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1775&q=80",
    hotspots: [
      {
        id: "gym-weights",
        x: 30,
        y: 45,
        title: "Weight Area",
        description: "Various weights and resistance equipment used for strengthening exercises.",
        icon: <Info />,
      },
      {
        id: "gym-machines",
        x: 60,
        y: 50,
        title: "Exercise Machines",
        description: "Specialized rehabilitation machines designed for targeted muscle strengthening and stability training.",
        icon: <Info />,
      },
      {
        id: "gym-area",
        x: 80,
        y: 40,
        title: "Open Space",
        description: "Open area for stretching, balance exercises, and group sessions.",
        icon: <Info />,
      },
    ],
    connectedScenes: ["reception", "treatment-room"],
  },
];

const VirtualTour = () => {
  const [currentScene, setCurrentScene] = useState<PanoramaScene>(panoramaScenes[0]);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Handle rotation
  const handleRotate = (direction: "left" | "right") => {
    const rotationAmount = direction === "left" ? 15 : -15;
    setRotation((prev) => prev + rotationAmount);
  };

  // Navigation to another scene
  const navigateToScene = (sceneId: string) => {
    const nextScene = panoramaScenes.find((scene) => scene.id === sceneId);
    if (nextScene) {
      setCurrentScene(nextScene);
      setSelectedHotspot(null);
      setRotation(0);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <SectionTitle
          title="360° Virtual Clinic Tour"
          subtitle="Explore our clinic virtually and get familiar with our facilities before your visit"
          center
        />

        <div className="mt-12 max-w-5xl mx-auto">
          <div
            ref={containerRef}
            className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black"
          >
            <div
              className="relative w-full h-full overflow-hidden"
              style={{
                perspective: "1000px",
              }}
            >
              {/* Panorama Image */}
              <motion.div
                animate={{ rotateY: rotation }}
                transition={{ type: "spring", stiffness: 50 }}
                style={{
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                }}
                className="relative"
              >
                <img
                  src={currentScene.imageUrl}
                  alt={currentScene.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Hotspots */}
                <TooltipProvider>
                  {currentScene.hotspots.map((hotspot) => (
                    <Tooltip key={hotspot.id}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute p-1 rounded-full bg-white/80 hover:bg-white text-vitality-500 hover:text-vitality-600 border-2 border-vitality-400 transform -translate-x-1/2 -translate-y-1/2 z-10"
                          style={{
                            left: `${hotspot.x}%`,
                            top: `${hotspot.y}%`,
                          }}
                          onClick={() => setSelectedHotspot(hotspot)}
                        >
                          {hotspot.icon || <Info className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{hotspot.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>

                {/* Scene Navigation */}
                {currentScene.connectedScenes.map((sceneId, index) => {
                  const scene = panoramaScenes.find((s) => s.id === sceneId);
                  if (!scene) return null;

                  // Position navigation buttons along the bottom
                  const position = {
                    left: `${(index + 1) * (100 / (currentScene.connectedScenes.length + 1))}%`,
                    bottom: "5%",
                  };

                  return (
                    <TooltipProvider key={sceneId}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="absolute transform -translate-x-1/2 flex items-center gap-1 animate-pulse hover:animate-none"
                            style={position}
                            onClick={() => navigateToScene(sceneId)}
                          >
                            <Navigation className="h-4 w-4 mr-1" />
                            {scene.title}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Navigate to {scene.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </motion.div>

              {/* Controls Overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                <Badge variant="secondary" className="text-sm py-1 px-3">
                  {currentScene.title}
                </Badge>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-center z-20">
                <Card className="bg-black/60 backdrop-blur border-none">
                  <CardContent className="p-2 flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={() => handleRotate("left")}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={() => setRotation(0)}
                    >
                      <RotateCw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={() => handleRotate("right")}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <div className="h-6 w-px bg-white/20" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={toggleFullscreen}
                    >
                      {isFullscreen ? (
                        <Minimize className="h-4 w-4" />
                      ) : (
                        <Maximize className="h-4 w-4" />
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Scene Information */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{currentScene.title}</CardTitle>
              <CardDescription>{currentScene.description}</CardDescription>
            </CardHeader>
            {selectedHotspot && (
              <CardContent>
                <div className="p-4 bg-vitality-50 rounded-lg">
                  <h4 className="text-lg font-medium text-vitality-700 mb-2">
                    {selectedHotspot.title}
                  </h4>
                  <p className="text-gray-600">{selectedHotspot.description}</p>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Scene Navigation */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {panoramaScenes.map((scene) => (
              <Card
                key={scene.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  currentScene.id === scene.id
                    ? "border-2 border-vitality-400"
                    : ""
                }`}
                onClick={() => navigateToScene(scene.id)}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={scene.imageUrl}
                    alt={scene.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-3">
                  <CardTitle className="text-lg">{scene.title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default VirtualTour;
