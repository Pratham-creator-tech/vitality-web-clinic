
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Search, Calendar, Activity, Bone, Heart, Brain, Dumbbell, Shield } from "lucide-react";
import AIFloatingButton from "@/components/ai/AIFloatingButton";

type Patient = {
  id: string;
  full_name: string;
  email: string; // We'll mask this for privacy
  dob: string | null;
  address: string | null; // We'll mask this for privacy
  medical_history: string | null;
  created_at: string;
};

const PatientsList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  const { user, userRole, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Sample specialties for filtering
  const specialties = [
    { id: "sports", name: "Sports Rehabilitation", icon: <Activity className="h-5 w-5 mr-2" /> },
    { id: "manual", name: "Manual Therapy", icon: <Activity className="h-5 w-5 mr-2" /> },
    { id: "surgical", name: "Post-Surgical", icon: <Bone className="h-5 w-5 mr-2" /> },
    { id: "pain", name: "Chronic Pain", icon: <Heart className="h-5 w-5 mr-2" /> },
    { id: "neuro", name: "Neurological", icon: <Brain className="h-5 w-5 mr-2" /> },
    { id: "strength", name: "Strength & Conditioning", icon: <Dumbbell className="h-5 w-5 mr-2" /> },
  ];

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page.",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }

    if (userRole !== "doctor") {
      toast({
        title: "Access denied",
        description: "This page is only available to doctors.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    fetchPatients();
  }, [user, userRole, isLoading, navigate]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      
      // In a real implementation, this would fetch patients associated with the doctor
      // For demo purposes, we're fetching all patients
      const { data, error } = await supabase
        .from("patients")
        .select("id, full_name, email, dob, address, medical_history, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Mask sensitive information before setting to state
      const maskedData = data?.map(patient => ({
        ...patient,
        email: maskEmail(patient.email),
        address: patient.address ? "Available upon request" : null,
      })) || [];

      setPatients(maskedData);
    } catch (error) {
      console.error("Error fetching patients:", error);
      toast({
        title: "Error",
        description: "Failed to load patients. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to mask email for privacy
  const maskEmail = (email: string): string => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    return `${maskedUsername}@${domain}`;
  };

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (currentFilter === "all") return matchesSearch;
    
    // In a real implementation, we would filter by specialty/condition
    // For demo purposes, we're using a random assignment
    const patientId = parseInt(patient.id.replace(/-/g, "").substring(0, 8), 16);
    const specialtyIndex = patientId % specialties.length;
    return matchesSearch && specialties[specialtyIndex].id === currentFilter;
  });

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="Patient Management"
          subtitle="View and manage your patients based on their conditions and treatment progress."
        />

        <Card className="mt-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Patient Records</CardTitle>
                <CardDescription>
                  You have {patients.length} registered patients
                </CardDescription>
              </div>

              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search patients..."
                    className="pl-8 w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Export
                </Button>
                {/* Removed "Add Patient" button since doctors shouldn't add patients */}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="mb-6" onValueChange={setCurrentFilter}>
              <TabsList className="mb-4 flex flex-wrap">
                <TabsTrigger value="all">All Patients</TabsTrigger>
                {specialties.map((specialty) => (
                  <TabsTrigger key={specialty.id} value={specialty.id} className="flex items-center">
                    {specialty.icon}
                    {specialty.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all" className="mt-0">
                {renderPatientsTable(filteredPatients, loading)}
              </TabsContent>
              
              {specialties.map((specialty) => (
                <TabsContent key={specialty.id} value={specialty.id} className="mt-0">
                  {renderPatientsTable(filteredPatients, loading)}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <AIFloatingButton />
    </PageLayout>
  );
};

const renderPatientsTable = (patients: Patient[], loading: boolean) => {
  if (loading) {
    return <div className="text-center py-8">Loading patients...</div>;
  }

  if (patients.length === 0) {
    return <div className="text-center py-8">No patients found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="hidden md:table-cell">Medical Info</TableHead>
            <TableHead>Last Appointment</TableHead>
            <TableHead>Next Appointment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => {
            // Generate mock appointment dates for demo purposes
            const patientIdNum = parseInt(patient.id.replace(/-/g, "").substring(0, 8), 16);
            const daysAgo = patientIdNum % 30;
            const daysAhead = (patientIdNum % 14) + 1;
            
            const lastAppointment = new Date();
            lastAppointment.setDate(lastAppointment.getDate() - daysAgo);
            
            const nextAppointment = new Date();
            nextAppointment.setDate(nextAppointment.getDate() + daysAhead);
            
            const hasUpcoming = (patientIdNum % 3) !== 0; // 2/3 of patients have upcoming appointments

            return (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.full_name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-vitality-500" />
                    {patient.email}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {patient.medical_history ? (
                    <span className="text-sm text-gray-600">Available</span>
                  ) : (
                    <span className="text-sm text-gray-400">Not provided</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    {lastAppointment.toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  {hasUpcoming ? (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-vitality-400" />
                      {nextAppointment.toLocaleDateString()}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">None scheduled</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/patient/${patient.id}`}>View</Link>
                  </Button>
                  <Button variant="ghost" size="sm">
                    Schedule
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientsList;
