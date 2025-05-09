
import React from "react";
import { SectionTitle } from "@/components/ui/section-title";
import PatientDetailActions from "@/components/patient/PatientDetailActions";

interface PatientHeaderProps {
  patientId: string;
  userRole: string;
  onNewDiagnosis: () => void;
  onNewPrescription: () => void;
}

const PatientHeader = ({ 
  patientId,
  userRole,
  onNewDiagnosis,
  onNewPrescription
}: PatientHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <SectionTitle 
        title="Patient Details" 
        subtitle="Complete patient information and medical history"
      />
      
      <div className="mt-4 md:mt-0">
        <PatientDetailActions
          patientId={patientId}
          userRole={userRole}
          onNewDiagnosis={onNewDiagnosis}
          onNewPrescription={onNewPrescription}
        />
      </div>
    </div>
  );
};

export default PatientHeader;
