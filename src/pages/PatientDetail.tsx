
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Loader2, ClipboardList, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormatters } from "@/hooks/useFormatters";
import { usePatientData } from "@/hooks/usePatientData";

// Import refactored components
import PatientProfile from "@/components/patient/PatientProfile";
import DiagnosesList from "@/components/patient/DiagnosesList";
import PrescriptionsList from "@/components/patient/PrescriptionsList";
import InvoicesList from "@/components/patient/InvoicesList";
import PatientDetailActions from "@/components/patient/PatientDetailActions";

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const { toast } = useToast();
  const { patient, diagnoses, prescriptions, invoices, isLoading } = usePatientData(id);
  const { getInitials, formatDate, calculateAge } = useFormatters();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page.",
        variant: "destructive",
      });
      navigate("/signin");
    }
  }, [user, toast, navigate]);

  // Handlers for doctor actions
  const handleNewDiagnosis = () => {
    navigate(`/diagnoses/new?patient=${id}`);
  };

  const handleNewPrescription = () => {
    navigate(`/prescriptions/new?patient=${id}`);
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
          
          <div className="mt-4 md:mt-0">
            <PatientDetailActions
              patientId={id || ''}
              userRole={userRole || ''}
              onNewDiagnosis={handleNewDiagnosis}
              onNewPrescription={handleNewPrescription}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Patient Profile Card */}
          <div className="lg:col-span-1">
            <PatientProfile 
              patient={patient}
              calculateAge={calculateAge}
              formatDate={formatDate}
              getInitials={getInitials}
            />
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
                <DiagnosesList diagnoses={diagnoses} formatDate={formatDate} />
              </TabsContent>
              
              {/* Prescriptions Tab */}
              <TabsContent value="prescriptions">
                <PrescriptionsList prescriptions={prescriptions} formatDate={formatDate} />
              </TabsContent>
              
              {/* Invoices Tab */}
              <TabsContent value="invoices">
                <InvoicesList invoices={invoices} formatDate={formatDate} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PatientDetail;
