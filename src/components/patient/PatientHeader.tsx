
import React from "react";
import { SectionTitle } from "@/components/ui/section-title";
import PatientDetailActions from "@/components/patient/PatientDetailActions";

interface PatientHeaderProps {
  patientId: string;
  userRole: string;
  patientName?: string;
  patientPhone?: string;
  onNewDiagnosis: () => void;
  onNewPrescription: () => void;
}

const PatientHeader = ({ 
  patientId,
  userRole,
  patientName,
  patientPhone,
  onNewDiagnosis,
  onNewPrescription
}: PatientHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <SectionTitle 
        title={patientName ? `Patient: ${patientName}` : "Patient Details"} 
        subtitle="Complete patient information and medical history"
      />
      
      <div className="mt-4 md:mt-0">
        <PatientDetailActions
          patientId={patientId}
          userRole={userRole}
          patientName={patientName}
          patientPhone={patientPhone}
          onNewDiagnosis={onNewDiagnosis}
          onNewPrescription={onNewPrescription}
        />
      </div>
    </div>
  );
};

export default PatientHeader;
