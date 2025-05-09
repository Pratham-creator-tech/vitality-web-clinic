
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export interface PatientProfileProps {
  patient: any;
  getInitials: (name?: string) => string;
  formatDate: (dateString: string) => string;
  calculateAge: (dobString: string) => string;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ 
  patient,
  getInitials,
  formatDate,
  calculateAge
}) => {
  if (!patient) return null;
  
  return (
    <Card className="mb-6">
      <CardContent className="py-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24">
            {patient.profile_image ? (
              <AvatarImage src={patient.profile_image} alt={patient.full_name || "Patient"} />
            ) : (
              <AvatarFallback className="text-lg bg-vitality-100 text-vitality-800">
                {getInitials(patient.full_name)}
              </AvatarFallback>
            )}
          </Avatar>
          <h2 className="mt-4 text-xl font-bold">{patient.full_name}</h2>
          
          <Badge variant="outline" className="mt-2">
            {patient.gender || "Not specified"}
          </Badge>
        </div>
        
        <div className="mt-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">ID</TableCell>
                <TableCell className="text-right truncate max-w-[150px]" title={patient.id}>
                  {patient.id ? patient.id.substring(0, 8) + "..." : "N/A"}
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Age</TableCell>
                <TableCell className="text-right">
                  {patient.dob ? calculateAge(patient.dob) : "Not specified"}
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Date of Birth</TableCell>
                <TableCell className="text-right">
                  {patient.dob ? formatDate(patient.dob) : "Not specified"}
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Email</TableCell>
                <TableCell className="text-right truncate max-w-[150px]" title={patient.email}>
                  {patient.email || "Not specified"}
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Phone</TableCell>
                <TableCell className="text-right">
                  {patient.phone || "Not specified"}
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="font-medium">Address</TableCell>
                <TableCell className="text-right">
                  {patient.address || "Not specified"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientProfile;
