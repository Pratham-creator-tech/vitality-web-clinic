
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
  ZoomOut,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Calendar,
  MapPin,
  Users,
  Award,
  Star,
  CheckCircle,
  Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";

type Hotspot = {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  category: "equipment" | "area" | "service" | "info";
};

type PanoramaScene = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  hotspots: Hotspot[];
  connectedScenes: string[];
  features: string[];
  stats?: { label: string; value: string; icon: React.ReactNode }[];
};

const panoramaScenes: PanoramaScene[] = [
  {
    id: "reception",
    title: "Reception & Welcome Area",
    description: "Our welcoming reception area where our friendly staff will greet you upon arrival.",
    imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    features: ["24/7 Reception", "Comfortable Seating", "Free WiFi", "Health Magazines"],
    stats: [
      { label: "Daily Visitors", value: "150+", icon: <Users className="h-4 w-4" /> },
      { label: "Satisfaction", value: "98%", icon: <Star className="h-4 w-4" /> },
    ],
    hotspots: [
      {
        id: "reception-desk",
        x: 25,
        y: 40,
        title: "Reception Desk",
        description: "Our reception team is ready to assist you with appointments, paperwork, and any questions you may have.",
        icon: <Info className="h-4 w-4" />,
        category: "service",
      },
      {
        id: "waiting-area",
        x: 75,
        y: 50,
        title: "Waiting Lounge",
        description: "Comfortable seating area with complimentary refreshments and reading materials.",
        icon: <Info className="h-4 w-4" />,
        category: "area",
      },
      {
        id: "information-board",
        x: 50,
        y: 30,
        title: "Information Board",
        description: "Health tips, clinic information, and upcoming wellness programs.",
        icon: <Info className="h-4 w-4" />,
        category: "info",
      },
    ],
    connectedScenes: ["treatment-room", "gym"],
  },
  {
    id: "treatment-room",
    title: "Treatment & Therapy Room",
    description: "Private treatment rooms equipped with state-of-the-art physiotherapy equipment.",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80",
    features: ["Private Rooms", "Advanced Equipment", "Hygienic Environment", "Personalized Care"],
    stats: [
      { label: "Success Rate", value: "95%", icon: <CheckCircle className="h-4 w-4" /> },
      { label: "Equipment", value: "15+", icon: <Award className="h-4 w-4" /> },
    ],
    hotspots: [
      {
        id: "treatment-table",
        x: 45,
        y: 55,
        title: "Treatment Table",
        description: "Ergonomic treatment tables designed for patient comfort during manual therapy sessions.",
        icon: <Info className="h-4 w-4" />,
        category: "equipment",
      },
      {
        id: "ultrasound-machine",
        x: 70,
        y: 40,
        title: "Ultrasound Therapy",
        description: "Advanced ultrasound equipment for deep tissue treatment and pain relief.",
        icon: <Info className="h-4 w-4" />,
        category: "equipment",
      },
      {
        id: "electrotherapy",
        x: 30,
        y: 35,
        title: "Electrotherapy Unit",
        description: "State-of-the-art electrotherapy equipment for muscle stimulation and pain management.",
        icon: <Info className="h-4 w-4" />,
        category: "equipment",
      },
    ],
    connectedScenes: ["reception", "gym"],
  },
  {
    id: "gym",
    title: "Rehabilitation Gymnasium",
    description: "Spacious rehabilitation gym with specialized equipment for exercise and functional rehabilitation.",
    imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1775&q=80",
    features: ["Open Space", "Specialized Equipment", "Group Sessions", "Personal Training"],
    stats: [
      { label: "Equipment Items", value: "50+", icon: <Award className="h-4 w-4" /> },
      { label: "Daily Sessions", value: "30+", icon: <Calendar className="h-4 w-4" /> },
    ],
    hotspots: [
      {
        id: "cardio-equipment",
        x: 30,
        y: 45,
        title: "Cardio Equipment",
        description: "Treadmills, exercise bikes, and elliptical machines for cardiovascular rehabilitation.",
        icon: <Heart className="h-4 w-4" />,
        category: "equipment",
      },
      {
        id: "strength-machines",
        x: 60,
        y: 50,
        title: "Strength Training",
        description: "Specialized rehabilitation machines designed for targeted muscle strengthening and stability training.",
        icon: <Info className="h-4 w-4" />,
        category: "equipment",
      },
      {
        id: "exercise-area",
        x: 80,
        y: 40,
        title: "Exercise Mat Area",
        description: "Open area for stretching, balance exercises, yoga, and group rehabilitation sessions.",
        icon: <Info className="h-4 w-4" />,
        category: "area",
      },
      {
        id: "parallel-bars",
        x: 20,
        y: 60,
        title: "Parallel Bars",
        description: "Adjustable parallel bars for gait training and balance rehabilitation.",
        icon: <Info className="h-4 w-4" />,
        category: "equipment",
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
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Auto rotation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoRotating) {
      interval = setInterval(() => {
        setRotation((prev) => prev - 0.5);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAutoRotating]);

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
      setIsAutoRotating(false);
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

  const getHotspotColor = (category: Hotspot["category"]) => {
    switch (category) {
      case "equipment": return "border-blue-400 bg-blue-500/20 hover:bg-blue-500/30";
      case "area": return "border-green-400 bg-green-500/20 hover:bg-green-500/30";
      case "service": return "border-purple-400 bg-purple-500/20 hover:bg-purple-500/30";
      case "info": return "border-orange-400 bg-orange-500/20 hover:bg-orange-500/30";
      default: return "border-vitality-400 bg-vitality-500/20 hover:bg-vitality-500/30";
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <SectionTitle
            title="360° Virtual Clinic Tour"
            subtitle="Explore our state-of-the-art facilities and experience the comfort of our clinic environment"
            center
          />
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              <MapPin className="h-4 w-4 mr-2" />
              3 Interactive Areas
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Users className="h-4 w-4 mr-2" />
              15+ Equipment Points
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <Award className="h-4 w-4 mr-2" />
              Modern Facilities
            </Badge>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Tour Interface */}
          <div
            ref={containerRef}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black mb-8"
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
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>

                {/* Hotspots */}
                <TooltipProvider>
                  <AnimatePresence>
                    {currentScene.hotspots.map((hotspot, index) => (
                      <motion.div
                        key={hotspot.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${hotspot.x}%`,
                          top: `${hotspot.y}%`,
                        }}
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className={`rounded-full border-2 ${getHotspotColor(hotspot.category)} backdrop-blur-sm transition-all duration-300 hover:scale-110 animate-pulse`}
                              onClick={() => setSelectedHotspot(hotspot)}
                            >
                              {hotspot.icon || <Info className="h-4 w-4" />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <div className="text-center">
                              <p className="font-medium">{hotspot.title}</p>
                              <p className="text-sm text-gray-600 mt-1">{hotspot.description}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </TooltipProvider>

                {/* Scene Navigation Buttons */}
                {currentScene.connectedScenes.map((sceneId, index) => {
                  const scene = panoramaScenes.find((s) => s.id === sceneId);
                  if (!scene) return null;

                  const position = {
                    left: `${20 + (index * 30)}%`,
                    bottom: "10%",
                  };

                  return (
                    <motion.div
                      key={sceneId}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="absolute z-20"
                      style={position}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="bg-white/90 backdrop-blur-sm border border-white/20 hover:bg-white shadow-lg transition-all duration-300 hover:scale-105"
                              onClick={() => navigateToScene(sceneId)}
                            >
                              <Navigation className="h-4 w-4 mr-2" />
                              {scene.title.split(' ')[0]}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Navigate to {scene.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Controls Overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-30">
                <Badge variant="secondary" className="bg-black/60 text-white border-white/20 backdrop-blur-sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  {currentScene.title}
                </Badge>
              </div>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
                <Card className="bg-black/80 backdrop-blur-md border-white/20">
                  <CardContent className="p-3 flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 h-8 w-8"
                      onClick={() => handleRotate("left")}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 h-8 w-8"
                      onClick={() => setRotation(0)}
                    >
                      <RotateCw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 h-8 w-8"
                      onClick={() => handleRotate("right")}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <div className="h-6 w-px bg-white/20" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`text-white hover:bg-white/20 h-8 w-8 ${isAutoRotating ? 'bg-white/20' : ''}`}
                      onClick={() => setIsAutoRotating(!isAutoRotating)}
                    >
                      {isAutoRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 h-8 w-8"
                      onClick={toggleFullscreen}
                    >
                      {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Scene Information Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{currentScene.title}</CardTitle>
                    <CardDescription className="text-base mt-2">{currentScene.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-vitality-50 text-vitality-700 border-vitality-200">
                    {currentScene.hotspots.length} Points
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {currentScene.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {currentScene.stats && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Statistics:</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {currentScene.stats.map((stat, index) => (
                          <div key={index} className="bg-vitality-50 rounded-lg p-3 text-center">
                            <div className="flex items-center justify-center mb-1">
                              {stat.icon}
                              <span className="text-2xl font-bold text-vitality-700 ml-2">{stat.value}</span>
                            </div>
                            <p className="text-sm text-gray-600">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Selected Hotspot Details */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">
                  {selectedHotspot ? "Point of Interest" : "Explore Interactive Points"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedHotspot ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-full ${getHotspotColor(selectedHotspot.category)}`}>
                        {selectedHotspot.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-vitality-700">{selectedHotspot.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {selectedHotspot.category.charAt(0).toUpperCase() + selectedHotspot.category.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{selectedHotspot.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedHotspot(null)}
                      className="w-full"
                    >
                      Close Details
                    </Button>
                  </motion.div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Info className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 mb-4">
                      Click on any interactive point in the tour to learn more about our facilities and equipment.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center justify-center p-2 bg-blue-50 rounded-lg">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        Equipment
                      </div>
                      <div className="flex items-center justify-center p-2 bg-green-50 rounded-lg">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        Areas
                      </div>
                      <div className="flex items-center justify-center p-2 bg-purple-50 rounded-lg">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        Services
                      </div>
                      <div className="flex items-center justify-center p-2 bg-orange-50 rounded-lg">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                        Information
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Scene Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {panoramaScenes.map((scene) => (
              <motion.div
                key={scene.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    currentScene.id === scene.id
                      ? "ring-2 ring-vitality-400 bg-vitality-50"
                      : "hover:shadow-lg"
                  }`}
                  onClick={() => navigateToScene(scene.id)}
                >
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img
                      src={scene.imageUrl}
                      alt={scene.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{scene.title}</CardTitle>
                      {currentScene.id === scene.id && (
                        <Badge variant="default" className="bg-vitality-500">
                          Current
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm">{scene.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-vitality-500 to-blue-600 text-white shadow-xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Experience Our Clinic in Person?</h3>
              <p className="text-lg mb-6 opacity-90">
                Book your appointment today and see how our modern facilities can help you achieve optimal health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-vitality-600 hover:bg-gray-100">
                  <Link to="/booking" className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Appointment
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-vitality-600">
                  <Link to="/contact" className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Visit Our Clinic
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default VirtualTour;
