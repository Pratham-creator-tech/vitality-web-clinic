import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, Search, Users, Calendar, Activity, FileText } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";

interface Patient {
  id: string;
  created_at: string;
  user_id: string;
  full_name: string;
  email: string;
  dob: string;
  gender: string;
  phone: string;
  address: string;
  medical_history: string;
}

const PatientsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, userRole } = useAuth();

  const { data: patients, isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
    enabled: !!user && userRole === 'doctor'
  });

  const filteredPatients = patients?.filter(patient =>
    patient.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (userRole !== 'doctor') {
    return (
      <PageLayout>
        <div className="container mx-auto py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-gray-600 mt-2">This page is only accessible to doctors.</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-8">
        <SectionTitle
          title="Patient Management"
          subtitle="Manage and view your patients"
        />

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search patients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold">{patients?.length || 0}</p>
                </div>
                <Users className="h-8 w-8 text-vitality-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New This Month</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Cases</p>
                  <p className="text-2xl font-bold">28</p>
                </div>
                <Activity className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patients List */}
        {isLoading ? (
          <div className="text-center py-8">
            <p>Loading patients...</p>
          </div>
        ) : filteredPatients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{patient.full_name}</CardTitle>
                    <Badge variant="outline">Patient</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Email:</strong> {patient.email}
                    </p>
                    {patient.phone && (
                      <p className="text-sm text-gray-600">
                        <strong>Phone:</strong> {patient.phone}
                      </p>
                    )}
                    {patient.dob && (
                      <p className="text-sm text-gray-600">
                        <strong>DOB:</strong> {new Date(patient.dob).toLocaleDateString()}
                      </p>
                    )}
                    <div className="pt-4">
                      <Button asChild size="sm" className="w-full">
                        <Link to={`/patient/${patient.id}`} className="flex items-center justify-center">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-600">
              {searchTerm ? "Try adjusting your search terms." : "No patients have been registered yet."}
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

const fetchPatients = async () => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export default PatientsList;
