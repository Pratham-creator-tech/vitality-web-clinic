
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export const AdminSettings = () => {
  const [saveLoading, setSaveLoading] = useState(false);
  
  const handleSaveSettings = () => {
    setSaveLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSaveLoading(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>System Settings</CardTitle>
        <CardDescription>Configure application settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Clinic Information</h3>
                <p className="text-sm text-muted-foreground">Update your clinic details and contact information</p>
              </div>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="clinic-name">Clinic Name</Label>
                  <Input id="clinic-name" defaultValue="YASHA's Physiocare" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="clinic-email">Email Address</Label>
                  <Input id="clinic-email" type="email" defaultValue="contact@physiocare.com" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="clinic-phone">Phone Number</Label>
                  <Input id="clinic-phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="clinic-address">Address</Label>
                  <Textarea id="clinic-address" defaultValue="123 Healing Way, Wellness City, WC 12345" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Business Hours</h3>
                  <p className="text-sm text-muted-foreground">Set your clinic's operating hours</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Monday - Friday</Label>
                    <div className="flex gap-2">
                      <Input defaultValue="09:00" />
                      <span className="flex items-center">to</span>
                      <Input defaultValue="18:00" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Saturday</Label>
                    <div className="flex gap-2">
                      <Input defaultValue="10:00" />
                      <span className="flex items-center">to</span>
                      <Input defaultValue="15:00" />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 flex items-center space-x-2">
                    <Switch id="closed-sunday" />
                    <Label htmlFor="closed-sunday">Closed on Sundays</Label>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSaveSettings} disabled={saveLoading}>
                {saveLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Interface Settings</h3>
                <p className="text-sm text-muted-foreground">Customize how the application looks and behaves</p>
              </div>
              
              <div className="grid gap-4 py-4">
                <div className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable dark theme for the admin interface</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>High Contrast</Label>
                    <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <Select defaultValue="purple">
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={handleSaveSettings} disabled={saveLoading}>
                {saveLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Notification Settings</h3>
                <p className="text-sm text-muted-foreground">Configure automatic notifications and alerts</p>
              </div>
              
              <div className="grid gap-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive emails about new appointments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send SMS reminders to patients</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Alerts</Label>
                    <p className="text-sm text-muted-foreground">Notify about system updates or maintenance</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="space-y-2">
                  <Label>Appointment Reminder Time</Label>
                  <Select defaultValue="24h">
                    <SelectTrigger>
                      <SelectValue placeholder="Select reminder time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12 hours before</SelectItem>
                      <SelectItem value="24h">24 hours before</SelectItem>
                      <SelectItem value="48h">48 hours before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={handleSaveSettings} disabled={saveLoading}>
                {saveLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Security Settings</h3>
                <p className="text-sm text-muted-foreground">Configure authentication and data protection</p>
              </div>
              
              <div className="grid gap-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Automatically log out inactive users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Session Timeout Duration</Label>
                  <Select defaultValue="30m">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeout duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15m">15 minutes</SelectItem>
                      <SelectItem value="30m">30 minutes</SelectItem>
                      <SelectItem value="60m">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Password Policy</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger>
                      <SelectValue placeholder="Select password policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="strong">Strong</SelectItem>
                      <SelectItem value="very-strong">Very Strong</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={handleSaveSettings} disabled={saveLoading}>
                {saveLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
