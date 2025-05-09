
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  AlertCircle 
} from "lucide-react";
import { format } from "date-fns";

interface PatientProfileProps {
  patient: any;
  calculateAge?: (dobString: string | null) => string;
  formatDate?: (dateString: string) => string;
  getInitials?: (name?: string) => string;
}

const PatientProfile = ({ 
  patient, 
  calculateAge, 
  formatDate, 
  getInitials 
}: PatientProfileProps) => {
  // Format date of birth if available
  const formattedDob = patient.dob 
    ? (formatDate ? formatDate(patient.dob) : format(new Date(patient.dob), "PPP"))
    : "Not provided";
  
  // Use calculateAge if provided, otherwise just display DOB
  const ageDisplay = patient.dob && calculateAge 
    ? `${calculateAge(patient.dob)} (${formattedDob})`
    : formattedDob;
  
  // Get initials for avatar
  const initials = getInitials 
    ? getInitials(patient.full_name)
    : (patient.full_name?.charAt(0)?.toUpperCase() || "P");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Patient Avatar and Basic Info */}
        <Card className="w-full md:w-1/3">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage 
                  src={patient.profile_image || undefined}
                  alt={patient.full_name}
                />
                <AvatarFallback className="text-xl bg-vitality-100 text-vitality-700">
                  {initials}
                </AvatarFallback>
              </Avatar>
              
              <h3 className="mt-4 text-xl font-semibold">{patient.full_name}</h3>
              
              <div className="mt-2 flex gap-2">
                <Badge variant="outline">Patient</Badge>
                <Badge variant="default">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Patient Contact Information */}
        <Card className="w-full md:w-2/3">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Contact Information</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{patient.email || "Not provided"}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{patient.phone || "Not provided"}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{patient.address || "Not provided"}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">{ageDisplay}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Medical History */}
      {patient.medical_history && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Medical History</h3>
            <p className="text-gray-700">{patient.medical_history}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientProfile;
