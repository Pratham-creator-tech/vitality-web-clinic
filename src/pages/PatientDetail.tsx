
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Calendar,
  ClipboardList,
  FileText,
  FilePlus2,
  FileCheck2,
  Loader2,
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

interface Patient {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  dob: string | null;
  medical_history: string | null;
  profile_image: string | null;
}

interface Diagnosis {
  id: string;
  patient_id: string;
  doctor_id: string;
  doctor: {
    full_name: string;
  };
  diagnosis_date: string;
  condition: string;
  description: string | null;
  treatment_plan: string | null;
}

interface Prescription {
  id: string;
  patient_id: string;
  doctor_id: string;
  doctor: {
    full_name: string;
  };
  prescription_date: string;
  valid_until: string | null;
  instructions: string | null;
  medicines: any;
  treatments: any;
}

interface Invoice {
  id: string;
  invoice_number: string;
  patient_id: string;
  doctor_id: string;
  doctor: {
    full_name: string;
  };
  amount: number;
  total_amount: number;
  payment_status: string;
  invoice_date: string;
  due_date: string;
}

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const { toast } = useToast();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page.",
        variant: "destructive",
      });
      navigate("/signin");
      return;
    }

    if (!id) return;

    const fetchPatientData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch patient details
        const { data: patientData, error: patientError } = await supabase
          .from("patients")
          .select("*")
          .eq("id", id)
          .single();

        if (patientError) throw patientError;
        setPatient(patientData);

        // Fetch diagnoses
        const { data: diagnosesData, error: diagnosesError } = await supabase
          .from("diagnoses")
          .select(`
            *,
            doctor:doctor_id (full_name)
          `)
          .eq("patient_id", id)
          .order("diagnosis_date", { ascending: false });

        if (diagnosesError) throw diagnosesError;
        setDiagnoses(diagnosesData || []);

        // Fetch prescriptions
        const { data: prescriptionsData, error: prescriptionsError } = await supabase
          .from("prescriptions")
          .select(`
            *,
            doctor:doctor_id (full_name)
          `)
          .eq("patient_id", id)
          .order("prescription_date", { ascending: false });

        if (prescriptionsError) throw prescriptionsError;
        setPrescriptions(prescriptionsData || []);

        // Fetch invoices
        const { data: invoicesData, error: invoicesError } = await supabase
          .from("invoices")
          .select(`
            *,
            doctor:doctor_id (full_name)
          `)
          .eq("patient_id", id)
          .order("invoice_date", { ascending: false });

        if (invoicesError) throw invoicesError;
        setInvoices(invoicesData || []);

      } catch (error) {
        console.error("Error fetching patient data:", error);
        toast({
          title: "Error",
          description: "Failed to load patient data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, [id, user, navigate, toast]);

  const getInitials = (name: string = "") => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateAge = (dobString: string | null) => {
    if (!dobString) return "N/A";
    
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    return `${age} years`;
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-20 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-vitality-500 mr-2" />
          <span>Loading patient data...</span>
        </div>
      </PageLayout>
    );
  }

  if (!patient) {
    return (
      <PageLayout>
        <div className="container mx-auto py-20 text-center">
          <AlertCircle className="h-16 w-16 mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Patient Not Found</h2>
          <p className="text-gray-600 mb-6">The patient record you're looking for doesn't exist or you don't have permission to view it.</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <SectionTitle 
            title="Patient Details" 
            subtitle="Complete patient information and medical history"
          />
          <div className="flex gap-2 mt-4 md:mt-0">
            {userRole === "doctor" && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/diagnoses/new?patient=${id}`)}
                  className="flex items-center gap-2"
                >
                  <FilePlus2 className="h-4 w-4" />
                  New Diagnosis
                </Button>
                <Button 
                  onClick={() => navigate(`/prescriptions/new?patient=${id}`)}
                  className="flex items-center gap-2"
                >
                  <FileCheck2 className="h-4 w-4" />
                  Write Prescription
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Patient Profile Card */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader className="text-center pb-0">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24 border-4 border-vitality-100">
                    <AvatarImage src={patient.profile_image || undefined} />
                    <AvatarFallback className="bg-vitality-600 text-white text-2xl">
                      {getInitials(patient.full_name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{patient.full_name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Age: {calculateAge(patient.dob)}
                    </span>
                  </div>
                  {patient.dob && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">
                        DOB: {formatDate(patient.dob)}
                      </span>
                    </div>
                  )}
                  {patient.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">{patient.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">{patient.email}</span>
                  </div>
                  {patient.address && (
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{patient.address}</span>
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-medium mb-2">Medical History</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {patient.medical_history || "No medical history recorded."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Content - Medical Information */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="diagnoses">
              <TabsList className="mb-4">
                <TabsTrigger value="diagnoses" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  Diagnoses
                </TabsTrigger>
                <TabsTrigger value="prescriptions" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Prescriptions
                </TabsTrigger>
                <TabsTrigger value="invoices" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Invoices
                </TabsTrigger>
              </TabsList>
              
              {/* Diagnoses Tab */}
              <TabsContent value="diagnoses">
                <Card>
                  <CardHeader>
                    <CardTitle>Diagnosis History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {diagnoses.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No diagnoses have been recorded for this patient.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {diagnoses.map((diagnosis) => (
                          <div key={diagnosis.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-bold text-lg">{diagnosis.condition}</h3>
                                <p className="text-sm text-gray-500">
                                  Diagnosed by: {diagnosis.doctor?.full_name}
                                </p>
                              </div>
                              <Badge>{formatDate(diagnosis.diagnosis_date)}</Badge>
                            </div>
                            {diagnosis.description && (
                              <div className="mt-2">
                                <h4 className="text-sm font-medium mb-1">Description</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{diagnosis.description}</p>
                              </div>
                            )}
                            {diagnosis.treatment_plan && (
                              <div className="mt-3">
                                <h4 className="text-sm font-medium mb-1">Treatment Plan</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{diagnosis.treatment_plan}</p>
                              </div>
                            )}
                            <div className="mt-4 flex justify-end">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => navigate(`/diagnoses/${diagnosis.id}`)}
                              >
                                View Full Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Prescriptions Tab */}
              <TabsContent value="prescriptions">
                <Card>
                  <CardHeader>
                    <CardTitle>Prescription History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {prescriptions.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No prescriptions have been recorded for this patient.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {prescriptions.map((prescription) => (
                          <div key={prescription.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-bold text-lg">Prescription</h3>
                                <p className="text-sm text-gray-500">
                                  Prescribed by: {prescription.doctor?.full_name}
                                </p>
                              </div>
                              <div className="text-right">
                                <Badge>{formatDate(prescription.prescription_date)}</Badge>
                                {prescription.valid_until && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    Valid until: {formatDate(prescription.valid_until)}
                                  </div>
                                )}
                              </div>
                            </div>
                            {prescription.instructions && (
                              <div className="mt-2">
                                <h4 className="text-sm font-medium mb-1">Instructions</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{prescription.instructions}</p>
                              </div>
                            )}
                            <div className="mt-4 flex justify-end">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="mr-2"
                                onClick={() => navigate(`/prescriptions/${prescription.id}/download`)}
                              >
                                Download PDF
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => navigate(`/prescriptions/${prescription.id}`)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Invoices Tab */}
              <TabsContent value="invoices">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {invoices.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No invoices have been recorded for this patient.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {invoices.map((invoice) => (
                          <div key={invoice.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-bold text-lg">Invoice #{invoice.invoice_number}</h3>
                                <p className="text-sm text-gray-500">
                                  Doctor: {invoice.doctor?.full_name}
                                </p>
                              </div>
                              <div className="text-right">
                                <Badge variant={invoice.payment_status === "paid" ? "success" : "destructive"}>
                                  {invoice.payment_status === "paid" ? "Paid" : "Unpaid"}
                                </Badge>
                                <div className="text-xs text-gray-500 mt-1">
                                  Date: {formatDate(invoice.invoice_date)}
                                </div>
                              </div>
                            </div>
                            <div className="mt-2">
                              <div className="flex justify-between text-sm">
                                <span>Amount:</span>
                                <span className="font-medium">${invoice.total_amount}</span>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="mr-2"
                                onClick={() => navigate(`/invoices/${invoice.id}/download`)}
                              >
                                Download PDF
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => navigate(`/invoices/${invoice.id}`)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PatientDetail;
