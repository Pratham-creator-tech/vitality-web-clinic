
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bookmark,
  BookmarkCheck,
  Clock,
  Filter,
  Play,
  Search,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

type VideoCategory = "all" | "neck" | "back" | "shoulder" | "knee" | "hip" | "ankle" | "posture" | "strength";

type Video = {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: VideoCategory;
  bodyPart: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  videoUrl: string;
  thumbnailUrl: string;
  tags: string[];
};

const videos: Video[] = [
  {
    id: "1",
    title: "Neck Pain Relief Exercises",
    description: "Simple exercises to relieve neck pain and stiffness, perfect for desk workers.",
    duration: "8:24",
    category: "neck",
    bodyPart: "Neck",
    difficulty: "beginner",
    videoUrl: "https://www.youtube.com/embed/JM8gP5zIrPM",
    thumbnailUrl: "https://images.unsplash.com/photo-1616279967983-ec413476e824?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    tags: ["neck pain", "stretching", "beginner"],
  },
  {
    id: "2",
    title: "Lower Back Mobility Routine",
    description: "Improve mobility and reduce stiffness in your lower back with this simple routine.",
    duration: "12:15",
    category: "back",
    bodyPart: "Lower Back",
    difficulty: "intermediate",
    videoUrl: "https://www.youtube.com/embed/2Cl0lD2Uyj0",
    thumbnailUrl: "https://images.unsplash.com/photo-1579126038374-6064e9370f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    tags: ["lower back", "mobility", "flexibility"],
  },
  {
    id: "3",
    title: "Shoulder Strengthening Program",
    description: "Build stability and strength in your shoulders to prevent injury and improve function.",
    duration: "15:42",
    category: "shoulder",
    bodyPart: "Shoulders",
    difficulty: "intermediate",
    videoUrl: "https://www.youtube.com/embed/LQNbLI2lWpk",
    thumbnailUrl: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?ixlib=rb-4.0.3&auto=format&fit=crop&w=1765&q=80",
    tags: ["shoulders", "strength", "stability"],
  },
  {
    id: "4",
    title: "Knee Rehabilitation Exercises",
    description: "Recovery exercises after knee injury or surgery to rebuild strength and mobility.",
    duration: "10:18",
    category: "knee",
    bodyPart: "Knees",
    difficulty: "beginner",
    videoUrl: "https://www.youtube.com/embed/jb3UVq67WQ8",
    thumbnailUrl: "https://images.unsplash.com/photo-1569758267239-d08deb78ea76?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    tags: ["knee", "rehabilitation", "recovery"],
  },
  {
    id: "5",
    title: "Hip Mobility Flow",
    description: "Improve hip flexibility and reduce pain with this dynamic mobility flow.",
    duration: "18:03",
    category: "hip",
    bodyPart: "Hips",
    difficulty: "intermediate",
    videoUrl: "https://www.youtube.com/embed/nJ41Uy8xr_E",
    thumbnailUrl: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    tags: ["hip", "mobility", "flexibility"],
  },
  {
    id: "6",
    title: "Ankle Stability Training",
    description: "Strengthen your ankles and improve balance with these targeted exercises.",
    duration: "7:55",
    category: "ankle",
    bodyPart: "Ankles",
    difficulty: "beginner",
    videoUrl: "https://www.youtube.com/embed/ozyRsuhCgvQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1559106963-8aec253b7e66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    tags: ["ankle", "stability", "balance"],
  },
  {
    id: "7",
    title: "Perfect Posture Correction",
    description: "Fix your posture and reduce upper back and neck pain with these techniques.",
    duration: "13:47",
    category: "posture",
    bodyPart: "Spine",
    difficulty: "beginner",
    videoUrl: "https://www.youtube.com/embed/4Ml-EP-Ej0Q",
    thumbnailUrl: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1774&q=80",
    tags: ["posture", "spine", "alignment"],
  },
  {
    id: "8",
    title: "Full Body Strength Routine",
    description: "Comprehensive strength workout designed for overall functional improvement.",
    duration: "22:38",
    category: "strength",
    bodyPart: "Full Body",
    difficulty: "advanced",
    videoUrl: "https://www.youtube.com/embed/4dF1DOWzf20",
    thumbnailUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    tags: ["strength", "full body", "advanced"],
  },
  {
    id: "9",
    title: "Core Stability for Lower Back Pain",
    description: "Strengthen your core to reduce back pain and improve spinal stability.",
    duration: "16:24",
    category: "back",
    bodyPart: "Core",
    difficulty: "intermediate",
    videoUrl: "https://www.youtube.com/embed/BDfL5VMWHVk",
    thumbnailUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    tags: ["core", "back pain", "stability"],
  },
  {
    id: "10",
    title: "Advanced Shoulder Mobility",
    description: "Take your shoulder mobility to the next level with these advanced techniques.",
    duration: "14:12",
    category: "shoulder",
    bodyPart: "Shoulders",
    difficulty: "advanced",
    videoUrl: "https://www.youtube.com/embed/5iICtOPsHJU",
    thumbnailUrl: "https://images.unsplash.com/photo-1531842477197-54acf89bff98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    tags: ["shoulders", "mobility", "advanced"],
  },
];

const VideoLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [favoriteVideos, setFavoriteVideos] = useState<string[]>([]);

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    
    const matchesDifficulty = selectedDifficulty === "all" || video.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const toggleFavorite = (videoId: string) => {
    if (favoriteVideos.includes(videoId)) {
      setFavoriteVideos(favoriteVideos.filter(id => id !== videoId));
    } else {
      setFavoriteVideos([...favoriteVideos, videoId]);
    }
  };

  const favoriteVideosList = videos.filter(video => favoriteVideos.includes(video.id));

  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <SectionTitle
          title="Video Exercise Library"
          subtitle="Access our collection of therapeutic exercises and rehabilitation videos"
          center
        />

        <div className="mt-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Select
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value as VideoCategory)}
              >
                <SelectTrigger className="w-[160px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Category</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="neck">Neck</SelectItem>
                  <SelectItem value="back">Back</SelectItem>
                  <SelectItem value="shoulder">Shoulder</SelectItem>
                  <SelectItem value="knee">Knee</SelectItem>
                  <SelectItem value="hip">Hip</SelectItem>
                  <SelectItem value="ankle">Ankle</SelectItem>
                  <SelectItem value="posture">Posture</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
              >
                <SelectTrigger className="w-[160px]">
                  <span>Difficulty</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="all">
            <TabsList className="w-full max-w-[300px] mx-auto">
              <TabsTrigger value="all">All Videos</TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center gap-2">
                <BookmarkCheck className="h-4 w-4" /> Favorites
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              {filteredVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      isFavorite={favoriteVideos.includes(video.id)}
                      onFavoriteToggle={toggleFavorite}
                      onPlay={() => setSelectedVideo(video)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No videos found matching your search criteria</p>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedDifficulty("all");
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="favorites" className="mt-6">
              {favoriteVideosList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteVideosList.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      isFavorite={true}
                      onFavoriteToggle={toggleFavorite}
                      onPlay={() => setSelectedVideo(video)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No favorite videos saved yet</p>
                  <p className="text-gray-400">Click the bookmark icon on videos to add them to your favorites</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <VideoDialog
          video={selectedVideo}
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      </div>
    </PageLayout>
  );
};

interface VideoCardProps {
  video: Video;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
  onPlay: () => void;
}

const VideoCard = ({ video, isFavorite, onFavoriteToggle, onPlay }: VideoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/90 rounded-full w-12 h-12"
              onClick={onPlay}
            >
              <Play className="h-6 w-6 text-vitality-500" />
            </Button>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {video.duration}
          </div>
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{video.title}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500"
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle(video.id);
              }}
            >
              {isFavorite ? (
                <BookmarkCheck className="h-5 w-5 text-vitality-500" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </Button>
          </div>
          <CardDescription className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{video.bodyPart}</Badge>
            <Badge 
              variant={
                video.difficulty === "beginner" 
                  ? "outline" 
                  : video.difficulty === "intermediate" 
                    ? "default" 
                    : "secondary"
              }
            >
              {video.difficulty}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4 flex-grow">
          <p className="text-gray-600 text-sm line-clamp-3">{video.description}</p>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="outline" className="w-full" onClick={onPlay}>
            Watch Video
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

interface VideoDialogProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoDialog = ({ video, isOpen, onClose }: VideoDialogProps) => {
  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[90vw]">
        <DialogHeader>
          <DialogTitle>{video.title}</DialogTitle>
          <DialogDescription>{video.description}</DialogDescription>
        </DialogHeader>
        <div className="aspect-video w-full">
          <iframe
            src={video.videoUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {video.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoLibrary;
