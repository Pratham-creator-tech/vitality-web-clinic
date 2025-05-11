
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, CalendarPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const AdminAppointments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock appointment data
  const appointments = [
    { 
      id: 1, 
      patient: "John Doe", 
      doctor: "Dr. Emily Wilson", 
      service: "Sports Rehabilitation",
      date: "2023-06-15T10:30:00", 
      status: "completed" 
    },
    { 
      id: 2, 
      patient: "Jane Smith", 
      doctor: "Dr. Michael Brown", 
      service: "Manual Therapy",
      date: "2023-06-18T14:00:00", 
      status: "cancelled" 
    },
    { 
      id: 3, 
      patient: "Robert Johnson", 
      doctor: "Dr. Emily Wilson", 
      service: "Chronic Pain Management",
      date: "2025-06-20T11:15:00", 
      status: "scheduled" 
    },
    { 
      id: 4, 
      patient: "Maria Garcia", 
      doctor: "Dr. Michael Brown", 
      service: "Post-surgical Rehabilitation",
      date: "2025-06-22T09:00:00", 
      status: "confirmed" 
    },
    { 
      id: 5, 
      patient: "David Lee", 
      doctor: "Dr. Emily Wilson", 
      service: "Neurological Rehabilitation",
      date: "2025-06-25T15:30:00", 
      status: "scheduled" 
    },
  ];
  
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "confirmed":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };
  
  const formatAppointmentDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "PPP p"); // Example: "Apr 29, 2023, 3:00 PM"
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Appointments Management</CardTitle>
        <CardDescription>View and manage all patient appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search appointments..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="w-full sm:w-auto flex items-center gap-1">
            <CalendarPlus className="h-4 w-4" />
            <span>New Appointment</span>
          </Button>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.patient}</TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>{appointment.service}</TableCell>
                    <TableCell>{formatAppointmentDate(appointment.date)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getStatusBadgeColor(appointment.status)}`}>
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Reschedule</DropdownMenuItem>
                          <DropdownMenuItem>Send reminder</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No appointments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
