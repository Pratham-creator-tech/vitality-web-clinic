import React from 'react';
import { useAuth } from "@/context/AuthContext";
import SEO from "@/components/SEO";
import PageLayout from "@/components/layout/PageLayout";

const Profile: React.FC = () => {
  const { user } = useAuth();

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
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        
        {/* Display user information here */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">User Information</h2>
          <p><strong>Name:</strong> {user.user_metadata?.full_name || 'N/A'}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Add more user details as needed */}
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
