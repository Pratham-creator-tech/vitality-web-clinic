
import React from "react";
import { Button } from "@/components/ui/button";
import { FilePlus2, FileCheck2 } from "lucide-react";

interface PatientDetailActionsProps {
  patientId: string;
  userRole: string;
  onNewDiagnosis: () => void;
  onNewPrescription: () => void;
}

const PatientDetailActions = ({ 
  patientId, 
  userRole, 
  onNewDiagnosis, 
  onNewPrescription 
}: PatientDetailActionsProps) => {
  if (userRole !== "doctor") return null;
  
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        onClick={onNewDiagnosis}
        className="flex items-center gap-2"
      >
        <FilePlus2 className="h-4 w-4" />
        New Diagnosis
      </Button>
      <Button 
        onClick={onNewPrescription}
        className="flex items-center gap-2"
      >
        <FileCheck2 className="h-4 w-4" />
        Write Prescription
      </Button>
    </div>
  );
};

export default PatientDetailActions;
