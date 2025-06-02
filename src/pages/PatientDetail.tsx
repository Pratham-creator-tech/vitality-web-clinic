
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";

const PatientDetail = () => {
  const { id } = useParams();

  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Patient Details</h1>
          <Button asChild variant="outline">
            <Link to="/patients">Back to Patients</Link>
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p><strong>Patient ID:</strong> {id}</p>
              {/* Add more patient details here */}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default PatientDetail;
