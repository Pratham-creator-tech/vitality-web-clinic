
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Dumbbell, Calendar, CheckCircle, PlayCircle, Info, ChevronDown, ChevronUp } from "lucide-react";

// Mock exercise data - in a real app this would come from your API
const exercises = [
  {
    id: "ex1",
    name: "Shoulder External Rotation",
    description: "Strengthens rotator cuff muscles",
    sets: 3,
    reps: "10 each side",
    duration: "30 seconds rest between sets",
    difficulty: "beginner",
    bodyPart: "shoulder",
    videoUrl: "https://www.youtube.com/embed/dNOMmQARQTQ",
    imageUrl: "https://placehold.co/300x200/4ade80/1f2937?text=Shoulder+Exercise",
    instructions: [
      "Stand with elbow bent at 90 degrees",
      "Keep elbow close to your side",
      "Rotate forearm outward away from body",
      "Slowly return to starting position",
      "Maintain good posture throughout"
    ]
  },
  {
    id: "ex2",
    name: "Hip Bridge",
    description: "Activates glutes and strengthens lower back",
    sets: 3,
    reps: "12-15",
    duration: "45 seconds rest between sets",
    difficulty: "beginner",
    bodyPart: "hip",
    videoUrl: "https://www.youtube.com/embed/wPM8icPu6H8",
    imageUrl: "https://placehold.co/300x200/60a5fa/1f2937?text=Hip+Bridge",
    instructions: [
      "Lie on your back with knees bent and feet flat on the floor",
      "Keep arms by your sides with palms facing down",
      "Engage your core and squeeze glutes",
      "Lift hips toward the ceiling until body forms a straight line",
      "Hold for 2-3 seconds at the top",
      "Lower back down with control"
    ]
  },
  {
    id: "ex3",
    name: "Knee Stability Exercise",
    description: "Improves knee tracking and stability",
    sets: 2,
    reps: "15 each leg",
    duration: "30 seconds rest between sets",
    difficulty: "intermediate",
    bodyPart: "knee",
    videoUrl: "https://www.youtube.com/embed/GaAPki5tFA0",
    imageUrl: "https://placehold.co/300x200/f97316/1f2937?text=Knee+Exercise",
    instructions: [
      "Stand on one leg with knee slightly bent",
      "Perform small knee bends while maintaining alignment",
      "Ensure knee tracks over second toe",
      "Keep hips level throughout the movement",
      "Engage core for stability"
    ]
  }
];

const ExercisePlan = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  
  if (!user) {
    navigate("/sign-in");
    return null;
  }
  
  const toggleExerciseCompletion = (exerciseId: string) => {
    setCompletedExercises(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };
  
  const toggleExpandExercise = (exerciseId: string) => {
    setExpandedExercise(prev => prev === exerciseId ? null : exerciseId);
  };
  
  const completionPercentage = Math.round((completedExercises.length / exercises.length) * 100);
  
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-vitality-700">Your Exercise Plan</h1>
              <p className="text-gray-600">Follow these exercises for optimal recovery</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Daily progress</p>
                <p className="font-bold">{completionPercentage}% complete</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-vitality-50 flex items-center justify-center">
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12" viewBox="0 0 36 36">
                    <path
                      className="stroke-current text-vitality-200"
                      fill="none"
                      strokeWidth="3"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="stroke-current text-vitality-500"
                      fill="none"
                      strokeWidth="3"
                      strokeDasharray={`${completionPercentage}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <Dumbbell className="h-5 w-5 text-vitality-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="today">
            <TabsList className="mb-6">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="today">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Today's Exercises</CardTitle>
                  <CardDescription>
                    Complete these exercises as prescribed by your physiotherapist
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={completionPercentage} className="h-2 mb-6" />
                  
                  <div className="space-y-6">
                    {exercises.map((exercise) => (
                      <div key={exercise.id} className="border rounded-lg overflow-hidden">
                        <div 
                          className={`p-4 ${
                            completedExercises.includes(exercise.id) 
                              ? "bg-green-50 border-b border-green-100" 
                              : "bg-white border-b"
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="mr-4">
                              <Checkbox 
                                id={`complete-${exercise.id}`}
                                checked={completedExercises.includes(exercise.id)}
                                onCheckedChange={() => toggleExerciseCompletion(exercise.id)}
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                <div>
                                  <h3 className="font-medium text-lg">{exercise.name}</h3>
                                  <p className="text-sm text-gray-500">{exercise.description}</p>
                                </div>
                                <div className="mt-2 sm:mt-0">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-vitality-100 text-vitality-800">
                                    {exercise.sets} sets × {exercise.reps}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-wrap items-center mt-2 gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8"
                                  onClick={() => toggleExpandExercise(exercise.id)}
                                >
                                  {expandedExercise === exercise.id ? (
                                    <>
                                      <ChevronUp className="h-4 w-4 mr-1" />
                                      Hide Details
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="h-4 w-4 mr-1" />
                                      Show Details
                                    </>
                                  )}
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 text-vitality-600">
                                  <PlayCircle className="h-4 w-4 mr-1" />
                                  Watch Video
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {expandedExercise === exercise.id && (
                          <div className="p-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium mb-2 flex items-center text-gray-700">
                                  <Info className="h-4 w-4 mr-1" />
                                  Instructions
                                </h4>
                                <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-600">
                                  {exercise.instructions.map((instruction, idx) => (
                                    <li key={idx}>{instruction}</li>
                                  ))}
                                </ol>
                                <div className="mt-4">
                                  <h4 className="font-medium mb-2 text-gray-700">Tips</h4>
                                  <p className="text-sm text-gray-600">
                                    Maintain proper form throughout the exercise. If you feel pain (not just exertion), stop and consult your physiotherapist.
                                  </p>
                                </div>
                              </div>
                              <div className="flex justify-center items-center">
                                <img 
                                  src={exercise.imageUrl} 
                                  alt={exercise.name} 
                                  className="rounded-lg max-h-48"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => navigate("/pain-tracker")}>
                    Track Your Pain
                  </Button>
                  <Button 
                    className="bg-vitality-600 hover:bg-vitality-700"
                    disabled={completedExercises.length !== exercises.length}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark All Complete
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Keep consistent with your exercises</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        For optimal results, complete your exercises daily. If you're having trouble with any exercise, message your physiotherapist through the chat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="week">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                  <CardDescription>
                    Your exercise plan for the week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                      <div 
                        key={day} 
                        className={`text-center p-2 rounded-lg ${
                          i === (new Date().getDay() - 1 + 7) % 7 
                            ? "bg-vitality-100 font-medium text-vitality-700" 
                            : "bg-gray-50"
                        }`}
                      >
                        <p className="text-sm">{day}</p>
                        <div className="mt-1">
                          {i % 2 === 0 ? (
                            <div className="h-2 w-2 rounded-full bg-vitality-500 mx-auto"></div>
                          ) : i === 2 ? (
                            <div className="h-2 w-2 rounded-full bg-gray-300 mx-auto"></div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-vitality-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Your full weekly plan will be available after your initial assessment</p>
                    <Button onClick={() => navigate("/booking")}>
                      Book Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Exercise History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">Your exercise history will appear here as you complete your daily routines</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default ExercisePlan;
