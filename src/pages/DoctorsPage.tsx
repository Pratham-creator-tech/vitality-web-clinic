
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Phone, Mail, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Doctor {
  id: string;
  full_name: string;
  specialization: string | null;
  profile_image: string | null;
  clinic_address: string | null;
  phone: string | null;
  email: string;
  about: string | null;
  experience_years: number | null;
}

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Redirect if user is a doctor, they should see the patients page instead
    if (userRole === 'doctor') {
      navigate('/patients');
      return;
    }
    
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('doctors')
          .select('*')
          .order('full_name');
        
        if (error) {
          throw error;
        }
        
        setDoctors(data || []);
      } catch (err: any) {
        console.error("Error fetching doctors:", err);
        setError(err.message);
        toast({
          title: "Error",
          description: "Could not load doctors. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [navigate, userRole, toast]);

  // Generate initials from name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-32 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-vitality-500" />
          <span className="ml-2">Loading doctors...</span>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="container mx-auto py-32 text-center">
          <h2 className="text-2xl font-bold text-red-500">Error Loading Doctors</h2>
          <p className="mt-4">Please try again later.</p>
          <Button 
            className="mt-6" 
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <SectionTitle 
          title="Our Physiotherapy Team" 
          subtitle="Meet our experienced team of physiotherapists dedicated to your health and recovery"
          center
        />
        
        {doctors.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No doctors found</p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={doctor.profile_image || "/placeholder.svg"} 
                    alt={doctor.full_name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4 border-2 border-vitality-100">
                      <AvatarImage src={doctor.profile_image || undefined} alt={doctor.full_name} />
                      <AvatarFallback>{getInitials(doctor.full_name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold text-vitality-700 dark:text-vitality-300">{doctor.full_name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialization || "General Physiotherapy"}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{doctor.about || "Experienced physiotherapist focusing on patient recovery and well-being."}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {doctor.clinic_address && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-vitality-500" />
                        <span>{doctor.clinic_address}</span>
                      </div>
                    )}
                    {doctor.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-vitality-500" />
                        <span>{doctor.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-vitality-500" />
                      <span>{doctor.email}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/doctor/${doctor.id}`}>View Profile</Link>
                    </Button>
                    <Button asChild size="sm" className="flex items-center gap-2">
                      <Link to="/booking">
                        <Calendar className="h-4 w-4" />
                        Book Appointment
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default DoctorsPage;
