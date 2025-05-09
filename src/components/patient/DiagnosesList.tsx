
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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

interface DiagnosesListProps {
  diagnoses: Diagnosis[];
  formatDate: (date: string) => string;
}

const DiagnosesList = ({ diagnoses, formatDate }: DiagnosesListProps) => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default DiagnosesList;
