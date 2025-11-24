import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Activity, FileText, Dumbbell, Users, Video, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

const PatientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [treatmentPlans, setTreatmentPlans] = useState<any[]>([]);
  const [exercises, setExercises] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Get patient profile
      const { data: patient } = await supabase
        .from("patients")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (!patient) {
        toast({
          title: "Profile not found",
          description: "Please complete your profile setup",
          variant: "destructive",
        });
        return;
      }

      setPatientData(patient);

      // Fetch appointments with doctor details
      const { data: appointmentsData } = await supabase
        .from("appointments")
        .select(`
          *,
          doctor:doctors(full_name, specialization, profile_image)
        `)
        .eq("patient_id", patient.id)
        .order("appointment_date", { ascending: false })
        .limit(5);

      setAppointments(appointmentsData || []);

      // Fetch prescriptions
      const { data: prescriptionsData } = await supabase
        .from("prescriptions")
        .select(`
          *,
          doctor:doctors(full_name)
        `)
        .eq("patient_id", patient.id)
        .order("prescription_date", { ascending: false })
        .limit(5);

      setPrescriptions(prescriptionsData || []);

      // Fetch treatment plans
      const { data: plansData } = await supabase
        .from("treatment_plans")
        .select(`
          *,
          doctor:doctors(full_name)
        `)
        .eq("patient_id", patient.id)
        .order("created_at", { ascending: false });

      setTreatmentPlans(plansData || []);

      // Fetch exercise prescriptions
      const { data: exercisesData } = await supabase
        .from("exercise_prescriptions")
        .select(`
          *,
          doctor:doctors(full_name)
        `)
        .eq("patient_id", patient.id)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      setExercises(exercisesData || []);

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      scheduled: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      active: "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Health Dashboard</h1>
          <p className="text-muted-foreground">
            Track your appointments, treatments, and progress all in one place
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {appointments.filter(a => a.status === 'scheduled').length}
              </div>
              <p className="text-xs text-muted-foreground">Appointments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {treatmentPlans.filter(t => t.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">Treatment Plans</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Exercises</CardTitle>
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{exercises.length}</div>
              <p className="text-xs text-muted-foreground">To Complete</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{prescriptions.length}</div>
              <p className="text-xs text-muted-foreground">Active</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="treatments">Treatment Plans</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Appointments</CardTitle>
                <CardDescription>View and manage your scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">No appointments scheduled</p>
                    <Button onClick={() => navigate("/booking")}>Book Appointment</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-start gap-3">
                            <img
                              src={appointment.doctor.profile_image || "/placeholder.svg"}
                              alt={appointment.doctor.full_name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-semibold">{appointment.doctor.full_name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {appointment.doctor.specialization}
                              </p>
                              <p className="text-sm mt-1">
                                {format(new Date(appointment.appointment_date), "PPP 'at' p")}
                              </p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        {appointment.notes && (
                          <p className="text-sm text-muted-foreground mt-2">{appointment.notes}</p>
                        )}
                        {appointment.status === 'scheduled' && (
                          <div className="mt-3">
                            <Button size="sm" onClick={() => navigate(`/meeting/${appointment.id}`)}>
                              <Video className="w-4 h-4 mr-2" />
                              Join Video Call
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="treatments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Treatment Plans</CardTitle>
                <CardDescription>Your personalized treatment journey</CardDescription>
              </CardHeader>
              <CardContent>
                {treatmentPlans.length === 0 ? (
                  <div className="text-center py-8">
                    <Activity className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No treatment plans assigned yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {treatmentPlans.map((plan) => (
                      <div key={plan.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{plan.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              By Dr. {plan.doctor.full_name}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(plan.status)}`}>
                            {plan.status}
                          </span>
                        </div>
                        <p className="text-sm mb-3">{plan.description}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>Start: {format(new Date(plan.start_date), "PP")}</span>
                          {plan.end_date && (
                            <span>End: {format(new Date(plan.end_date), "PP")}</span>
                          )}
                        </div>
                        {plan.goals && (
                          <div className="mt-3">
                            <h4 className="text-sm font-semibold mb-1">Goals:</h4>
                            <ul className="text-sm list-disc list-inside">
                              {Object.values(plan.goals).map((goal: any, idx: number) => (
                                <li key={idx}>{goal}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exercises" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Exercise Prescriptions</CardTitle>
                <CardDescription>Your personalized exercise program</CardDescription>
              </CardHeader>
              <CardContent>
                {exercises.length === 0 ? (
                  <div className="text-center py-8">
                    <Dumbbell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No exercises assigned yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exercises.map((exercise) => (
                      <div key={exercise.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-2">{exercise.exercise_name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>
                        
                        {exercise.video_url && (
                          <div className="mb-3">
                            <video
                              src={exercise.video_url}
                              controls
                              className="w-full rounded-lg"
                            />
                          </div>
                        )}
                        
                        <div className="space-y-1 text-sm">
                          {exercise.sets && exercise.reps && (
                            <p><strong>Sets/Reps:</strong> {exercise.sets} sets × {exercise.reps} reps</p>
                          )}
                          {exercise.duration && (
                            <p><strong>Duration:</strong> {exercise.duration}</p>
                          )}
                          {exercise.frequency && (
                            <p><strong>Frequency:</strong> {exercise.frequency}</p>
                          )}
                        </div>
                        
                        {exercise.instructions && (
                          <div className="mt-3 p-2 bg-muted rounded">
                            <p className="text-sm">{exercise.instructions}</p>
                          </div>
                        )}
                        
                        <p className="text-xs text-muted-foreground mt-3">
                          Prescribed by Dr. {exercise.doctor.full_name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Prescriptions</CardTitle>
                <CardDescription>Your medication and treatment prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                {prescriptions.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No prescriptions available</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {prescriptions.map((prescription) => (
                      <div key={prescription.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Prescribed by Dr. {prescription.doctor.full_name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Date: {format(new Date(prescription.prescription_date), "PP")}
                            </p>
                          </div>
                          {prescription.valid_until && (
                            <p className="text-sm text-muted-foreground">
                              Valid until: {format(new Date(prescription.valid_until), "PP")}
                            </p>
                          )}
                        </div>
                        
                        {prescription.medicines && (
                          <div className="mb-3">
                            <h4 className="font-semibold mb-2">Medicines:</h4>
                            <ul className="space-y-1">
                              {Object.values(prescription.medicines).map((medicine: any, idx: number) => (
                                <li key={idx} className="text-sm">{medicine}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {prescription.instructions && (
                          <div className="p-2 bg-muted rounded">
                            <p className="text-sm">{prescription.instructions}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={() => navigate("/booking")} className="h-20">
            <Calendar className="mr-2" />
            Book New Appointment
          </Button>
          <Button onClick={() => navigate("/progress-tracker")} variant="outline" className="h-20">
            <TrendingUp className="mr-2" />
            Track Progress
          </Button>
          <Button onClick={() => navigate("/doctors")} variant="outline" className="h-20">
            <Users className="mr-2" />
            Find Doctors
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default PatientDashboard;