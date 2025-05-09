
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  PlusCircle, 
  Pill, 
  Phone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSendWhatsAppNotification } from "@/utils/whatsappService";

interface PatientDetailActionsProps {
  patientId: string;
  userRole: string;
  patientPhone?: string;
  patientName?: string;
  onNewDiagnosis: () => void;
  onNewPrescription: () => void;
}

const PatientDetailActions = ({ 
  patientId,
  userRole,
  patientPhone,
  patientName = "Patient",
  onNewDiagnosis,
  onNewPrescription
}: PatientDetailActionsProps) => {
  const { toast } = useToast();
  const { sendNotification } = useSendWhatsAppNotification();
  
  const handleContactViaWhatsApp = () => {
    if (!patientPhone) {
      toast({
        title: "Missing Phone Number",
        description: "No phone number available for this patient.",
        variant: "destructive",
      });
      return;
    }
    
    sendNotification(
      patientPhone,
      `Hello ${patientName}, this is a message from your healthcare provider at Vitality Physio. How may we assist you today?`
    );
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      {userRole === "doctor" && (
        <>
          <Button 
            variant="outline"
            className="flex items-center"
            onClick={onNewDiagnosis}
          >
            <FileText className="h-4 w-4 mr-2" />
            New Diagnosis
          </Button>
          
          <Button 
            variant="outline"
            className="flex items-center"
            onClick={onNewPrescription}
          >
            <Pill className="h-4 w-4 mr-2" />
            New Prescription
          </Button>
          
          {patientPhone && (
            <Button 
              variant="outline"
              className="flex items-center"
              onClick={handleContactViaWhatsApp}
            >
              <Phone className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          )}
        </>
      )}
      
      {userRole === "admin" && (
        <>
          <Button 
            variant="outline"
            className="flex items-center"
            onClick={onNewDiagnosis}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Diagnosis
          </Button>
          
          {patientPhone && (
            <Button 
              variant="outline"
              className="flex items-center"
              onClick={handleContactViaWhatsApp}
            >
              <Phone className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default PatientDetailActions;
