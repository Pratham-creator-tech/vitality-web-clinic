import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users, FileText, Dumbbell, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const DoctorDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [doctorData, setDoctorData] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [exerciseForm, setExerciseForm] = useState({
    exerciseName: "",
    description: "",
    sets: "",
    reps: "",
    frequency: "",
    instructions: "",
  });

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const { data: doctor } = await supabase
        .from("doctors")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (!doctor) return;

      setDoctorData(doctor);

      // Check verification status
      if (doctor.verification_status !== 'verified') {
        toast({
          title: "Account Verification",
          description: "Your account is pending verification. Some features may be limited.",
          variant: "destructive",
        });
      }

      // Fetch appointments
      const { data: appointmentsData } = await supabase
        .from("appointments")
        .select(`
          *,
          patient:patients(full_name, email, phone, profile_image)
        `)
        .eq("doctor_id", doctor.id)
        .order("appointment_date", { ascending: true })
        .limit(10);

      setAppointments(appointmentsData || []);

      // Fetch patients
      const { data: patientsData } = await supabase
        .from("patients")
        .select("*")
        .in("id", appointmentsData?.map(a => a.patient_id) || []);

      setPatients(patientsData || []);

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

  const handlePrescribeExercise = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPatient || !doctorData) return;

    try {
      const { error } = await supabase
        .from("exercise_prescriptions")
        .insert({
          patient_id: selectedPatient.id,
          doctor_id: doctorData.id,
          exercise_name: exerciseForm.exerciseName,
          description: exerciseForm.description,
          sets: parseInt(exerciseForm.sets) || null,
          reps: parseInt(exerciseForm.reps) || null,
          frequency: exerciseForm.frequency,
          instructions: exerciseForm.instructions,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Exercise prescription created",
      });

      setExerciseForm({
        exerciseName: "",
        description: "",
        sets: "",
        reps: "",
        frequency: "",
        instructions: "",
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
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
          <h1 className="text-4xl font-bold mb-2">Doctor Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your patients, appointments, and treatments
          </p>
          
          {doctorData?.verification_status === 'pending' && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900">Verification Pending</h3>
                <p className="text-sm text-yellow-800 mt-1">
                  Your account is under review. You'll be able to accept appointments once verified.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {appointments.filter(a => 
                  format(new Date(a.appointment_date), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
                ).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">
                {doctorData?.verification_status || 'Pending'}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="prescribe">Prescribe Exercise</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Manage your scheduled consultations</CardDescription>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No appointments scheduled</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <img
                              src={appointment.patient.profile_image || "/placeholder.svg"}
                              alt={appointment.patient.full_name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-semibold">{appointment.patient.full_name}</h3>
                              <p className="text-sm text-muted-foreground">{appointment.patient.email}</p>
                              <p className="text-sm mt-1">
                                {format(new Date(appointment.appointment_date), "PPP 'at' p")}
                              </p>
                            </div>
                          </div>
                          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Patients</CardTitle>
                <CardDescription>View and manage patient records</CardDescription>
              </CardHeader>
              <CardContent>
                {patients.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No patients yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {patients.map((patient) => (
                      <div key={patient.id} className="border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <img
                            src={patient.profile_image || "/placeholder.svg"}
                            alt={patient.full_name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{patient.full_name}</h3>
                            <p className="text-sm text-muted-foreground">{patient.email}</p>
                            <p className="text-sm text-muted-foreground">{patient.phone}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedPatient(patient)}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescribe" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Prescribe Exercise</CardTitle>
                <CardDescription>Create custom exercise plans for patients</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePrescribeExercise} className="space-y-4">
                  <div>
                    <Label>Select Patient</Label>
                    <select
                      className="w-full p-2 border rounded"
                      onChange={(e) => {
                        const patient = patients.find(p => p.id === e.target.value);
                        setSelectedPatient(patient);
                      }}
                      required
                    >
                      <option value="">Choose a patient...</option>
                      {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                          {patient.full_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="exerciseName">Exercise Name</Label>
                    <Input
                      id="exerciseName"
                      value={exerciseForm.exerciseName}
                      onChange={(e) => setExerciseForm({ ...exerciseForm, exerciseName: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={exerciseForm.description}
                      onChange={(e) => setExerciseForm({ ...exerciseForm, description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sets">Sets</Label>
                      <Input
                        id="sets"
                        type="number"
                        value={exerciseForm.sets}
                        onChange={(e) => setExerciseForm({ ...exerciseForm, sets: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="reps">Reps</Label>
                      <Input
                        id="reps"
                        type="number"
                        value={exerciseForm.reps}
                        onChange={(e) => setExerciseForm({ ...exerciseForm, reps: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Input
                      id="frequency"
                      placeholder="e.g., 3 times per week"
                      value={exerciseForm.frequency}
                      onChange={(e) => setExerciseForm({ ...exerciseForm, frequency: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea
                      id="instructions"
                      value={exerciseForm.instructions}
                      onChange={(e) => setExerciseForm({ ...exerciseForm, instructions: e.target.value })}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={!selectedPatient}>
                    <Dumbbell className="mr-2 h-4 w-4" />
                    Prescribe Exercise
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default DoctorDashboard;