
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Users, Clock, CreditCard } from "lucide-react";

export const AdminHome = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-2xl font-bold">2,845</div>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New Appointments</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-2xl font-bold">76</div>
            <CalendarDays className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Session Hours</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-2xl font-bold">245</div>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-2xl font-bold">$24,780</div>
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Overview of recent system activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-2">
                <p className="text-sm font-medium">New user registered: John Doe</p>
                <p className="text-xs text-muted-foreground">10 minutes ago</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm font-medium">New appointment booked by Maria Garcia</p>
                <p className="text-xs text-muted-foreground">45 minutes ago</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm font-medium">Dr. Smith modified treatment plan for patient #2853</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm font-medium">Payment received for Invoice #10045</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="">
                <p className="text-sm font-medium">System backup completed successfully</p>
                <p className="text-xs text-muted-foreground">6 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used admin tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="w-full justify-start">
                Generate Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Manage User Roles
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Update Service Prices
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View System Logs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Database Backup
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
