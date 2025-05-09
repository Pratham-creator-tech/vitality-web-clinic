
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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

interface PrescriptionsListProps {
  prescriptions: Prescription[];
  formatDate: (date: string) => string;
}

const PrescriptionsList = ({ prescriptions, formatDate }: PrescriptionsListProps) => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default PrescriptionsList;
