
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Phone, Mail, MapPin, Calendar } from "lucide-react";

interface PatientProfileProps {
  patient: {
    id: string;
    full_name: string;
    email: string;
    phone: string | null;
    address: string | null;
    dob: string | null;
    medical_history: string | null;
    profile_image: string | null;
  };
  calculateAge: (dob: string | null) => string;
  formatDate: (date: string) => string;
  getInitials: (name: string) => string;
}

const PatientProfile = ({ patient, calculateAge, formatDate, getInitials }: PatientProfileProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="text-center pb-0">
        <div className="flex justify-center mb-4">
          <Avatar className="h-24 w-24 border-4 border-vitality-100">
            <AvatarImage src={patient.profile_image || undefined} />
            <AvatarFallback className="bg-vitality-600 text-white text-2xl">
              {getInitials(patient.full_name)}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl">{patient.full_name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-gray-700 dark:text-gray-300">
              Age: {calculateAge(patient.dob)}
            </span>
          </div>
          {patient.dob && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">
                DOB: {formatDate(patient.dob)}
              </span>
            </div>
          )}
          {patient.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">{patient.phone}</span>
            </div>
          )}
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-gray-700 dark:text-gray-300">{patient.email}</span>
          </div>
          {patient.address && (
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">{patient.address}</span>
            </div>
          )}
        </div>

        <Separator className="my-6" />

        <div>
          <h3 className="font-medium mb-2">Medical History</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {patient.medical_history || "No medical history recorded."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientProfile;
