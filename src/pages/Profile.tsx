
import React from 'react';
import { useAuth } from "@/context/AuthContext";
import SEO from "@/components/SEO";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: user?.user_metadata?.full_name || '',
      email: user?.email || '',
      phone: user?.user_metadata?.phone || '',
      address: user?.user_metadata?.address || '',
      emergencyContact: user?.user_metadata?.emergency_contact || '',
      medicalHistory: user?.user_metadata?.medical_history || '',
    }
  });

  const onSubmit = (data: ProfileFormData) => {
    // Here you would typically update the user's metadata
    console.log('Updating profile:', data);
    toast.success('Profile updated successfully');
  };

  if (!user) {
    return (
      <PageLayout>
        <SEO 
          title="Profile | Vitality Physio"  
          description="Manage your physiotherapy profile, appointments, and personal information."
        />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <p>Please sign in to view your profile.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <SEO 
        title="Your Profile | Vitality Physio"  
        description="Manage your physiotherapy profile, appointments, and personal information."
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 col-span-2">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input {...register('fullName')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input {...register('email')} type="email" disabled />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input {...register('phone')} type="tel" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input {...register('address')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Emergency Contact</label>
                  <Input {...register('emergencyContact')} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Medical History</label>
                  <Input {...register('medicalHistory')} />
                </div>
              </div>
              <Button type="submit" className="mt-6">Save Changes</Button>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/appointments">My Appointments</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/exercise-plan">Exercise Plans</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/medical-records">Medical Records</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/pain-tracker">Pain Tracker</a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/billing">Billing & Payments</a>
              </Button>
            </nav>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
