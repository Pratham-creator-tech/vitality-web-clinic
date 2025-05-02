
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Edit, Lock, Video, BarChart, BookOpen, ClipboardList, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/layout/PageLayout";

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  status: "upcoming" | "completed" | "cancelled";
  type: string;
}

interface ProgressData {
  date: string;
  painLevel: number;
  mobility: number;
  strength: number;
}

const Profile = () => {
  const { user, userRole } = useAuth();
  const { toast } = useToast();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);

  useEffect(() => {
    // Check if user has subscription
    const checkSubscription = async () => {
      if (user) {
        try {
          // For demo purposes, we're hardcoding the subscription status
          // In a real app, you would check this from the database
          setIsSubscribed(false);
        } catch (error) {
          console.error("Error checking subscription:", error);
        }
      }
    };

    // Fetch user's appointments
    const fetchAppointments = async () => {
      if (user) {
        try {
          // Simulated appointment data - in a real app, fetch from Supabase
          setAppointments([
            {
              id: "1",
              date: "2025-05-10",
              time: "10:00 AM",
              doctor: "Dr. Sarah Johnson",
              status: "upcoming",
              type: "Initial Assessment"
            },
            {
              id: "2",
              date: "2025-04-25",
              time: "2:30 PM",
              doctor: "Dr. Michael Chen",
              status: "completed",
              type: "Follow-up"
            },
            {
              id: "3",
              date: "2025-04-15",
              time: "3:45 PM",
              doctor: "Dr. Sarah Johnson",
              status: "completed",
              type: "Treatment Session"
            }
          ]);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      }
    };

    // Fetch progress data
    const fetchProgressData = async () => {
      if (user) {
        try {
          // Simulated progress data - in a real app, fetch from Supabase
          setProgressData([
            { date: "2025-04-15", painLevel: 7, mobility: 4, strength: 3 },
            { date: "2025-04-22", painLevel: 6, mobility: 5, strength: 4 },
            { date: "2025-04-29", painLevel: 5, mobility: 6, strength: 5 },
            { date: "2025-05-06", painLevel: 3, mobility: 7, strength: 6 }
          ]);
        } catch (error) {
          console.error("Error fetching progress data:", error);
        }
      }
    };

    checkSubscription();
    fetchAppointments();
    fetchProgressData();
  }, [user]);

  const handleUpgradeClick = () => {
    toast({
      title: "Upgrade to Premium",
      description: "Visit the billing page to upgrade your plan and access exercises.",
    });
  };

  if (!user) {
    return (
      <PageLayout>
        <div className="container py-10">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
            <Button asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container py-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader className="text-center">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                    <AvatarFallback className="text-xl bg-vitality-100 text-vitality-700 dark:bg-vitality-800 dark:text-vitality-300">
                      {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-4">{user.user_metadata?.full_name || user.email}</CardTitle>
                  <CardDescription>
                    {userRole === "doctor" ? "Physiotherapist" : "Patient"}
                    <Badge variant="outline" className="ml-2 bg-vitality-50 text-vitality-700 dark:bg-vitality-900 dark:text-vitality-300">
                      {isSubscribed ? "Premium" : "Free Plan"}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Email:</span>
                      <span className="text-sm font-medium">{user.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Member since:</span>
                      <span className="text-sm font-medium">
                        {new Date(user.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/account-settings" className="flex items-center gap-2 justify-center">
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/booking">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Book Appointment
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/pain-tracker">
                      <BarChart className="mr-2 h-4 w-4" />
                      Track Pain & Recovery
                    </Link>
                  </Button>
                  {isSubscribed ? (
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link to="/video-library">
                        <Video className="mr-2 h-4 w-4" />
                        Exercise Videos
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full justify-start" onClick={handleUpgradeClick}>
                      <Lock className="mr-2 h-4 w-4" />
                      Exercise Videos
                      <Badge variant="outline" className="ml-auto bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                        Premium
                      </Badge>
                    </Button>
                  )}
                  {userRole === "doctor" && (
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link to="/patients">
                        <ClipboardList className="mr-2 h-4 w-4" />
                        View Patients
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content Area */}
            <div className="md:col-span-2">
              <Tabs defaultValue="appointments" className="space-y-6">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="exercises">My Exercises</TabsTrigger>
                </TabsList>
                
                {/* Appointments Tab */}
                <TabsContent value="appointments" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>Upcoming Appointments</CardTitle>
                          <CardDescription>
                            Your scheduled appointments
                          </CardDescription>
                        </div>
                        <Button asChild size="sm">
                          <Link to="/booking">Book New</Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {appointments.filter(app => app.status === "upcoming").length > 0 ? (
                        <div className="space-y-4">
                          {appointments
                            .filter(app => app.status === "upcoming")
                            .map(appointment => (
                              <Card key={appointment.id}>
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-center flex-wrap gap-4">
                                    <div className="flex items-center gap-4">
                                      <div className="bg-vitality-100 dark:bg-vitality-900 p-3 rounded-full">
                                        <CalendarIcon className="h-6 w-6 text-vitality-700 dark:text-vitality-300" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium">{appointment.type}</h4>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                          <Clock className="mr-1 h-3 w-3" />
                                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                                        </div>
                                        <p className="text-sm">With {appointment.doctor}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                                        Confirmed
                                      </Badge>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No upcoming appointments</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Schedule your next session to continue your treatment
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Past Appointments</CardTitle>
                      <CardDescription>
                        Your appointment history
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {appointments.filter(app => app.status === "completed").length > 0 ? (
                        <div className="space-y-4">
                          {appointments
                            .filter(app => app.status === "completed")
                            .map(appointment => (
                              <Card key={appointment.id}>
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-center flex-wrap gap-4">
                                    <div className="flex items-center gap-4">
                                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                                        <CalendarIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                      </div>
                                      <div>
                                        <h4 className="font-medium">{appointment.type}</h4>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                          <Clock className="mr-1 h-3 w-3" />
                                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                                        </div>
                                        <p className="text-sm">With {appointment.doctor}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <Badge variant="outline" className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                        Completed
                                      </Badge>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No past appointments</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Progress Tab */}
                <TabsContent value="progress" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recovery Progress</CardTitle>
                      <CardDescription>
                        Track your healing journey
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {progressData.length > 0 ? (
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <h4 className="font-medium">Pain Level Trend</h4>
                            <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-end">
                              {progressData.map((data, index) => (
                                <div 
                                  key={index} 
                                  className="bg-red-500 h-full transition-all duration-500"
                                  style={{ 
                                    width: `${100 / progressData.length}%`,
                                    opacity: 0.4 + ((10 - data.painLevel) / 10) * 0.6,
                                    height: `${data.painLevel * 10}%`
                                  }}
                                  title={`${data.date}: Pain level ${data.painLevel}/10`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Your pain level has decreased from {progressData[0].painLevel}/10 to {progressData[progressData.length - 1].painLevel}/10
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Mobility Improvement</h4>
                            <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-end">
                              {progressData.map((data, index) => (
                                <div 
                                  key={index} 
                                  className="bg-green-500 transition-all duration-500"
                                  style={{ 
                                    width: `${100 / progressData.length}%`,
                                    height: `${data.mobility * 10}%`
                                  }}
                                  title={`${data.date}: Mobility ${data.mobility}/10`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Your mobility has improved from {progressData[0].mobility}/10 to {progressData[progressData.length - 1].mobility}/10
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Strength Progress</h4>
                            <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-end">
                              {progressData.map((data, index) => (
                                <div 
                                  key={index} 
                                  className="bg-blue-500 transition-all duration-500"
                                  style={{ 
                                    width: `${100 / progressData.length}%`,
                                    height: `${data.strength * 10}%`
                                  }}
                                  title={`${data.date}: Strength ${data.strength}/10`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Your strength has improved from {progressData[0].strength}/10 to {progressData[progressData.length - 1].strength}/10
                            </p>
                          </div>
                          
                          <div className="flex justify-center">
                            <Button asChild size="sm">
                              <Link to="/pain-tracker">View Detailed Progress</Link>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No progress data available yet</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Complete assessments to track your recovery journey
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Exercises Tab */}
                <TabsContent value="exercises" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Prescribed Exercises</CardTitle>
                      <CardDescription>
                        Your personalized exercise plan
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!isSubscribed ? (
                        <div className="text-center py-10 space-y-6">
                          <div className="mx-auto w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                            <Lock className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-medium mb-2">Premium Feature</h3>
                            <p className="text-muted-foreground mb-6">
                              Upgrade to our Premium plan to access personalized exercises and video tutorials
                            </p>
                            <Button asChild>
                              <Link to="/billing">Upgrade to Premium</Link>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* This content would only be visible to subscribed users */}
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">No exercises assigned yet</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Your therapist will assign exercises after your next session
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Exercise Resources</CardTitle>
                      <CardDescription>
                        Educational materials to support your recovery
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!isSubscribed ? (
                        <div className="text-center py-10 space-y-6">
                          <div className="mx-auto w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                            <Lock className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-medium mb-2">Premium Feature</h3>
                            <p className="text-muted-foreground mb-6">
                              Upgrade to our Premium plan to access our extensive library of exercise resources
                            </p>
                            <Button asChild>
                              <Link to="/billing">Upgrade to Premium</Link>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Card>
                            <CardContent className="p-4 flex items-center gap-4">
                              <div className="bg-vitality-100 dark:bg-vitality-900 p-2 rounded">
                                <BookOpen className="h-5 w-5 text-vitality-700 dark:text-vitality-300" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">Shoulder Recovery Exercises</h4>
                                <p className="text-sm text-muted-foreground">PDF guide with illustrated techniques</p>
                              </div>
                              <Button size="sm" variant="outline">View</Button>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardContent className="p-4 flex items-center gap-4">
                              <div className="bg-vitality-100 dark:bg-vitality-900 p-2 rounded">
                                <Video className="h-5 w-5 text-vitality-700 dark:text-vitality-300" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">Lower Back Pain Relief</h4>
                                <p className="text-sm text-muted-foreground">Video tutorials series (10 videos)</p>
                              </div>
                              <Button size="sm" variant="outline">Watch</Button>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
