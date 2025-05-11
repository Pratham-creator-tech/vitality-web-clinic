
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminAppointments } from "@/components/admin/AdminAppointments";
import { AdminServices } from "@/components/admin/AdminServices";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { AdminHome } from "@/components/admin/AdminHome";
import { UserPlus, CalendarRange, Layout, Settings, Home } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const AdminDashboard = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    // Redirect non-admin users
    if (user && userRole !== "admin") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard",
        variant: "destructive",
      });
      navigate("/");
    } else if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue",
        variant: "destructive",
      });
      navigate("/signin");
    }
  }, [user, userRole, navigate, toast]);

  if (!user || userRole !== "admin") {
    return null;
  }

  return (
    <PageLayout>
      <div className="py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex overflow-x-auto pb-2">
              <TabsList className="bg-background border rounded-lg">
                <TabsTrigger value="home" className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-1">
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Users</span>
                </TabsTrigger>
                <TabsTrigger value="appointments" className="flex items-center gap-1">
                  <CalendarRange className="h-4 w-4" />
                  <span className="hidden sm:inline">Appointments</span>
                </TabsTrigger>
                <TabsTrigger value="services" className="flex items-center gap-1">
                  <Layout className="h-4 w-4" />
                  <span className="hidden sm:inline">Services</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-1">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="home">
              <AdminHome />
            </TabsContent>
            
            <TabsContent value="users">
              <AdminUsers />
            </TabsContent>
            
            <TabsContent value="appointments">
              <AdminAppointments />
            </TabsContent>
            
            <TabsContent value="services">
              <AdminServices />
            </TabsContent>
            
            <TabsContent value="settings">
              <AdminSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminDashboard;
