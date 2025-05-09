
import React from "react";
import { Loader2 } from "lucide-react";

const PatientLoading = () => {
  return (
    <div className="container mx-auto py-20 flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-vitality-500 mr-2" />
      <span>Loading patient data...</span>
    </div>
  );
};

export default PatientLoading;
