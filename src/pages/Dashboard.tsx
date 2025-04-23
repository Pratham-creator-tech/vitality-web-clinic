
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MessageCircle, BarChart3, Dumbbell, UserCircle, CalendarClock } from "lucide-react";
import { toast } from "sonner";

interface PatientProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  medical_history: string | null;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(null);
  const [painInfo, setPainInfo] = useState<any>(null);
  
  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    
    const fetchPatientProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("patients")
          .select("*")
          .eq("user_id", user.id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setPatientProfile(data);
          
          // Try to parse medical history for pain information
          if (data.medical_history) {
            try {
              const medicalHistory = JSON.parse(data.medical_history);
              if (medicalHistory.pain) {
                setPainInfo(medicalHistory.pain);
              }
            } catch (e) {
              console.error("Error parsing medical history:", e);
            }
          }
        }
      } catch (error: any) {
        console.error("Error fetching patient profile:", error);
        toast.error("Error loading your profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPatientProfile();
  }, [user, navigate]);
  
  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-12 w-64 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  // Handle case when user hasn't completed profile
  if (!patientProfile) {
    return (
      <PageLayout>
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Complete Your Profile</CardTitle>
                <CardDescription>
                  Please complete your profile to access all features.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-6">
                <UserCircle className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                <p className="mb-6">Your profile information is needed to personalize your treatment plan.</p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => navigate("/onboarding")} 
                  className="w-full"
                >
                  Complete Profile Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-vitality-700">Welcome, {patientProfile.full_name}</h1>
              <p className="text-gray-600">Manage your physiotherapy journey</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button 
                onClick={() => navigate("/booking")} 
                className="bg-accent hover:bg-accent/90"
              >
                <CalendarClock className="mr-2 h-4 w-4" />
                Book New Session
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/exercise-plan")}>
                  <Dumbbell className="mr-2 h-4 w-4" />
                  View Exercise Plan
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/pain-tracker")}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Track Pain Levels
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/chat")}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message Your Physio
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/booking")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
            
            {/* Pain Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle>Pain Summary</CardTitle>
                <CardDescription>
                  {painInfo ? "Your reported pain information" : "No pain information recorded"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {painInfo ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Type</p>
                      <p className="capitalize">{painInfo.type.replace("-", " ")}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Locations</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {painInfo.locations.map((location: string) => (
                          <span 
                            key={location} 
                            className="bg-vitality-100 text-vitality-700 rounded-full px-2 py-1 text-xs capitalize"
                          >
                            {location.replace("-", " ")}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pain Level</p>
                      <div className="flex items-center mt-1">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
                          style={{ width: "100%" }}
                        ></div>
                        <div 
                          className="h-4 w-4 rounded-full bg-white border-2 border-vitality-600 relative -ml-2"
                          style={{ left: `${(parseInt(painInfo.level) - 1) * 10}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1</span>
                        <span>5</span>
                        <span>10</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 mb-4">No pain information recorded</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigate("/onboarding")}
                    >
                      Add Pain Information
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Upcoming Appointments Card */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No upcoming appointments</p>
                  <Button 
                    onClick={() => navigate("/booking")} 
                    size="sm"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-vitality-700">Your Exercise Plan</h2>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Dumbbell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Your personalized exercise plan will appear here after your first appointment</p>
                  <Button 
                    onClick={() => navigate("/booking")} 
                    variant="outline"
                  >
                    Book Initial Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
