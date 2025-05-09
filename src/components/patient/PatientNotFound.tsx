
import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PatientNotFoundProps {
  onGoBack: () => void;
}

const PatientNotFound = ({ onGoBack }: PatientNotFoundProps) => {
  return (
    <div className="container mx-auto py-20 text-center">
      <AlertCircle className="h-16 w-16 mx-auto text-red-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Patient Not Found</h2>
      <p className="text-gray-600 mb-6">
        The patient record you're looking for doesn't exist or you don't have permission to view it.
      </p>
      <Button onClick={onGoBack}>Go Back</Button>
    </div>
  );
};

export default PatientNotFound;
