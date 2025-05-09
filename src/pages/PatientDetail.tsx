
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useFormatters } from "@/hooks/useFormatters";
import { usePatientData } from "@/hooks/usePatientData";

// Import refactored components
import PatientProfile from "@/components/patient/PatientProfile";
import PatientHeader from "@/components/patient/PatientHeader";
import MedicalTabContent from "@/components/patient/MedicalTabContent";
import PatientNotFound from "@/components/patient/PatientNotFound";
import PatientLoading from "@/components/patient/PatientLoading";

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

  // Handle goBack for the PatientNotFound component
  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <PageLayout>
        <PatientLoading />
      </PageLayout>
    );
  }

  if (!patient) {
    return (
      <PageLayout>
        <PatientNotFound onGoBack={handleGoBack} />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-12 px-4">
        <PatientHeader 
          patientId={id || ''}
          userRole={userRole || ''}
          onNewDiagnosis={handleNewDiagnosis}
          onNewPrescription={handleNewPrescription}
        />

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
            <MedicalTabContent 
              diagnoses={diagnoses}
              prescriptions={prescriptions}
              invoices={invoices}
              formatDate={formatDate}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PatientDetail;
