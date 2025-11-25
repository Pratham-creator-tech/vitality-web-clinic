import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, XCircle, Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

export const AdminDoctorVerification = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", email: "sarah@example.com", specialization: "Sports Rehabilitation", status: "pending", submitted: "2024-01-15" },
    { id: 2, name: "Dr. Michael Chen", email: "michael@example.com", specialization: "Manual Therapy", status: "verified", submitted: "2024-01-10" },
    { id: 3, name: "Dr. Emily Brown", email: "emily@example.com", specialization: "Chronic Pain", status: "rejected", submitted: "2024-01-12" },
  ];

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      verified: "bg-green-100 text-green-800 border-green-300",
      rejected: "bg-red-100 text-red-800 border-red-300"
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const handleVerify = (doctorId: number) => {
    toast({
      title: "Doctor Verified",
      description: "Doctor credentials have been verified successfully.",
    });
  };

  const handleReject = (doctorId: number) => {
    toast({
      title: "Verification Rejected",
      description: "Doctor verification has been rejected.",
      variant: "destructive",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor Verification</CardTitle>
        <CardDescription>Review and verify doctor credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell className="font-medium">{doctor.name}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(doctor.status)}>
                      {doctor.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                      {doctor.status === "verified" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {doctor.status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
                      {doctor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{doctor.submitted}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">Actions</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleVerify(doctor.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Verify
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleReject(doctor.id)}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};