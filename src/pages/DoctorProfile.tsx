
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  GraduationCap,
  CheckCircle,
  Loader2,
  X,
  Languages
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
}

interface Certification {
  id: string;
  certification_name: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date: string | null;
}

interface Schedule {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

interface Doctor {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  specialization: string | null;
  clinic_address: string | null;
  about: string | null;
  profile_image: string | null;
  experience_years: number | null;
  languages: string[] | null;
  services: string[] | null;
  awards: string[] | null;
  professional_memberships: string[] | null;
}

const DoctorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [educations, setEducations] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        setIsLoading(true);

        if (!id) {
          throw new Error("Doctor ID is missing");
        }

        // Fetch doctor profile
        const { data: doctorData, error: doctorError } = await supabase
          .from('doctors')
          .select('*')
          .eq('id', id)
          .single();

        if (doctorError) throw doctorError;
        
        setDoctor(doctorData);

        // Fetch doctor education
        const { data: educationData, error: educationError } = await supabase
          .from('doctor_education')
          .select('*')
          .eq('doctor_id', id);

        if (educationError) throw educationError;
        setEducations(educationData || []);

        // Fetch doctor certifications
        const { data: certificationData, error: certificationError } = await supabase
          .from('doctor_certifications')
          .select('*')
          .eq('doctor_id', id);

        if (certificationError) throw certificationError;
        setCertifications(certificationData || []);

        // Fetch doctor schedule
        const { data: scheduleData, error: scheduleError } = await supabase
          .from('doctor_schedule')
          .select('*')
          .eq('doctor_id', id);

        if (scheduleError) throw scheduleError;
        setSchedules(scheduleData || []);

      } catch (error: any) {
        console.error("Error fetching doctor data:", error);
        setError(error.message || "Error loading doctor profile");
        toast({
          title: "Error",
          description: "Could not load doctor profile. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorData();
  }, [id, toast]);

  // Generate initials from name
  const getInitials = (name: string = "") => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getDayName = (day: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-32 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-vitality-500 mb-4" />
          <span>Loading doctor profile...</span>
        </div>
      </PageLayout>
    );
  }

  if (error || !doctor) {
    return (
      <PageLayout>
        <div className="container mx-auto py-20 px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 flex flex-col items-center">
              <X className="h-16 w-16 text-red-500 mb-4" />
              <h2 className="text-2xl font-bold text-center mb-2">Doctor Not Found</h2>
              <p className="text-gray-600 text-center mb-6">
                The doctor profile you're looking for doesn't exist or may have been removed.
              </p>
              <Button asChild>
                <Link to="/doctors">View All Doctors</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Info */}
          <div className="lg:col-span-1">
            <Card className="mb-6 overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-vitality-600 to-vitality-400 flex items-center justify-center">
                {doctor.profile_image ? (
                  <img 
                    src={doctor.profile_image} 
                    alt={doctor.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Avatar className="h-32 w-32 border-4 border-white">
                    <AvatarFallback className="text-4xl bg-vitality-700 text-white">
                      {getInitials(doctor.full_name)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <CardContent className="pt-6">
                <h1 className="text-2xl font-bold text-vitality-700 mb-1">{doctor.full_name}</h1>
                <p className="text-gray-600 font-medium mb-4">{doctor.specialization || "General Physiotherapy"}</p>
                
                <div className="flex items-center mb-4">
                  <Badge className="bg-vitality-500">
                    {doctor.experience_years} {doctor.experience_years === 1 ? 'Year' : 'Years'} Experience
                  </Badge>
                </div>

                <Separator className="my-4" />
                
                <div className="space-y-3 mt-4">
                  {doctor.clinic_address && (
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-vitality-500" />
                      <span>{doctor.clinic_address}</span>
                    </div>
                  )}
                  
                  {doctor.phone && (
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-vitality-500" />
                      <span>{doctor.phone}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-vitality-500" />
                    <span>{doctor.email}</span>
                  </div>

                  {doctor.languages && doctor.languages.length > 0 && (
                    <div className="flex items-start">
                      <Languages className="h-5 w-5 mr-2 text-vitality-500 flex-shrink-0 mt-1" />
                      <span>{doctor.languages.join(', ')}</span>
                    </div>
                  )}
                </div>

                <Button className="w-full mt-6 mb-2" asChild>
                  <Link to="/booking">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Schedule Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="mr-2 h-5 w-5 text-vitality-500" />
                  Working Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                {schedules.length > 0 ? (
                  <div className="space-y-2">
                    {schedules.map((schedule) => (
                      <div key={schedule.id} className="flex items-center justify-between">
                        <span className="font-medium">{getDayName(schedule.day_of_week)}</span>
                        <span>
                          {schedule.start_time.substring(0, 5)} - {schedule.end_time.substring(0, 5)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No schedule information available</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Bio & Qualifications */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {doctor.about || "No biography information available."}
                </p>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-vitality-500" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                {educations.length > 0 ? (
                  <div className="space-y-6">
                    {educations.map((education) => (
                      <div key={education.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <h3 className="font-bold text-lg">{education.degree}</h3>
                        <p className="text-vitality-600">{education.field_of_study}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-gray-600">{education.institution}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(education.start_date).getFullYear()} - {education.end_date ? new Date(education.end_date).getFullYear() : 'Present'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No education information available</p>
                )}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-vitality-500" />
                  Certifications & Licenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                {certifications.length > 0 ? (
                  <div className="space-y-4">
                    {certifications.map((certification) => (
                      <div key={certification.id} className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-3 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-bold">{certification.certification_name}</h3>
                          <p className="text-sm text-gray-600">{certification.issuing_organization}</p>
                          <p className="text-xs text-gray-500">
                            Issued: {new Date(certification.issue_date).toLocaleDateString()}
                            {certification.expiry_date && ` • Expires: ${new Date(certification.expiry_date).toLocaleDateString()}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No certification information available</p>
                )}
              </CardContent>
            </Card>

            {/* Services */}
            {doctor.services && doctor.services.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {doctor.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="bg-vitality-50 text-vitality-700 border-vitality-200">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Awards */}
            {doctor.awards && doctor.awards.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-vitality-500" />
                    Awards & Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside pl-2 space-y-2">
                    {doctor.awards.map((award, index) => (
                      <li key={index}>{award}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DoctorProfile;
