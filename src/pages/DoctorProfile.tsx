import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Star, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  Award, 
  GraduationCap, 
  Languages,
  Heart,
  Shield,
  User,
  FileText,
  MessageCircle,
  Video,
  ArrowLeft
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '@/components/layout/PageLayout';

interface Doctor {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  specialization?: string;
  about?: string;
  profile_image?: string;
  subscription_tier?: string;
  subscription_status?: string;
  languages?: string[];
  services?: string[];
  clinic_address?: string;
  awards?: string[];
  professional_memberships?: string[];
  experience_years?: number;
  subscription_start_date?: string;
  subscription_end_date?: string;
  created_at: string;
  updated_at: string;
  // UI enhancement fields
  rating?: number;
  reviews_count?: number;
  consultation_fee?: number;
  education?: string[];
  certifications?: string[];
  services_offered?: string[];
  availability_hours?: string;
  achievements?: string[];
}

interface Review {
  id: string;
  patient_name: string;
  rating: number;
  comment: string;
  date: string;
  treatment_type?: string;
}

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchDoctorProfile();
      fetchReviews();
    }
  }, [id]);

  const fetchDoctorProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        setError('Doctor not found');
        return;
      }

      // Enhance with mock data for demonstration
      const enhancedDoctor: Doctor = {
        ...data,
        rating: 4.2 + Math.random() * 0.8,
        reviews_count: Math.floor(Math.random() * 500) + 50,
        consultation_fee: Math.floor(Math.random() * 500) + 300,
        education: ['Bachelor of Physiotherapy (BPT)', 'Master of Physiotherapy (MPT)'],
        certifications: ['Certified Manual Therapist', 'Dry Needling Certification', 'Sports Injury Specialist'],
        services_offered: data?.services || [
          'Orthopedic Rehabilitation',
          'Sports Injury Treatment',
          'Manual Therapy',
          'Post-Operative Care',
          'Pain Management'
        ],
        availability_hours: 'Mon-Sat: 9:00 AM - 7:00 PM',
        achievements: [
          'Best Physiotherapist Award 2023',
          '1000+ Successful Treatments',
          'Published Research in Rehabilitation'
        ]
      };

      setDoctor(enhancedDoctor);
    } catch (error: any) {
      console.error('Error fetching doctor profile:', error);
      toast({
        title: "Error",
        description: "Failed to load doctor profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReviews = async () => {
    // Mock reviews for demonstration
    const mockReviews: Review[] = [
      {
        id: '1',
        patient_name: 'Rajesh K.',
        rating: 5,
        comment: 'Excellent treatment for my back pain. Dr. helped me recover completely within 3 months.',
        date: '2024-01-15',
        treatment_type: 'Back Pain Treatment'
      },
      {
        id: '2',
        patient_name: 'Priya S.',
        rating: 4,
        comment: 'Very professional and caring. The exercises recommended were very effective.',
        date: '2024-01-10',
        treatment_type: 'Neck Pain'
      },
      {
        id: '3',
        patient_name: 'Amit P.',
        rating: 5,
        comment: 'Great experience with sports injury recovery. Highly recommend!',
        date: '2024-01-05',
        treatment_type: 'Sports Injury'
      }
    ];
    
    setReviews(mockReviews);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        ))}
        {hasHalfStar && <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 opacity-50" />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-gray-300" />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-xl text-muted-foreground">Loading doctor profile...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!doctor) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Doctor not found</h2>
            <Button asChild>
              <Link to="/doctors">Back to Doctors</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50 py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/doctors" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Doctors
            </Link>
          </Button>

          {/* Doctor Header */}
          <Card className="mb-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex flex-col items-center lg:items-start">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-xl mb-4">
                    <AvatarImage src={doctor.profile_image} alt={doctor.full_name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                      {getInitials(doctor.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">Available</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.full_name}</h1>
                      <p className="text-xl text-blue-600 font-medium mb-4">{doctor.specialization}</p>
                      
                      <div className="flex items-center gap-6 mb-4">
                        <div className="flex items-center">
                          {renderStars(doctor.rating || 0)}
                          <span className="ml-2 font-semibold">{doctor.rating?.toFixed(1)}</span>
                          <span className="text-muted-foreground ml-1">({doctor.reviews_count} reviews)</span>
                        </div>
                        
                        {doctor.experience_years && (
                          <div className="flex items-center text-muted-foreground">
                            <Award className="h-4 w-4 mr-1" />
                            <span>{doctor.experience_years} years experience</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {doctor.clinic_address && (
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{doctor.clinic_address}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{doctor.availability_hours}</span>
                        </div>

                        {doctor.phone && (
                          <div className="flex items-center text-muted-foreground">
                            <Phone className="h-4 w-4 mr-2" />
                            <span>{doctor.phone}</span>
                          </div>
                        )}

                        <div className="flex items-center text-green-600 font-semibold">
                          <span className="text-muted-foreground mr-2">Consultation Fee:</span>
                          ₹{doctor.consultation_fee}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:ml-8">
                      <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Calendar className="h-5 w-5 mr-2" />
                        Book Appointment
                      </Button>
                      
                      <Button variant="outline" size="lg">
                        <Video className="h-5 w-5 mr-2" />
                        Video Consultation
                      </Button>
                      
                      <Button variant="outline" size="lg">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-lg">
                      <Shield className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Government Certified</span>
                    </div>
                    <div className="flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                      <Heart className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">1000+ Patients Treated</span>
                    </div>
                    <div className="flex items-center bg-purple-50 text-purple-700 px-4 py-2 rounded-lg">
                      <Award className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Award Winner</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white rounded-lg shadow-md">
              <TabsTrigger value="about" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                About
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Services
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2" />
                Education
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center">
                <Star className="h-4 w-4 mr-2" />
                Reviews
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Contact
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>About Dr. {doctor.full_name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {doctor.about || "Dr. " + doctor.full_name + " is a dedicated physiotherapist committed to providing exceptional care and helping patients achieve their recovery goals through evidence-based treatment approaches."}
                  </p>

                  {doctor.achievements && (
                    <div>
                      <h3 className="font-semibold mb-3">Achievements & Awards</h3>
                      <div className="space-y-2">
                        {doctor.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center">
                            <Award className="h-4 w-4 text-yellow-500 mr-3" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {doctor.languages && (
                    <div>
                      <h3 className="font-semibold mb-3">Languages Spoken</h3>
                      <div className="flex flex-wrap gap-2">
                        {doctor.languages.map((language, index) => (
                          <Badge key={index} variant="outline" className="flex items-center">
                            <Languages className="h-3 w-3 mr-1" />
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services">
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctor.services_offered?.map((service, index) => (
                      <div key={index} className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="font-medium">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Education & Certifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Education</h3>
                    <div className="space-y-3">
                      {doctor.education?.map((degree, index) => (
                        <div key={index} className="flex items-center">
                          <GraduationCap className="h-5 w-5 text-blue-500 mr-3" />
                          <span>{degree}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3">Certifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {doctor.certifications?.map((cert, index) => (
                        <Badge key={index} variant="secondary" className="p-3 justify-start">
                          <Award className="h-4 w-4 mr-2" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Patient Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                              {review.patient_name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold">{review.patient_name}</p>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          {renderStars(review.rating)}
                        </div>
                        
                        {review.treatment_type && (
                          <Badge variant="outline" className="mb-3">
                            {review.treatment_type}
                          </Badge>
                        )}
                        
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {doctor.phone && (
                      <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                        <Phone className="h-6 w-6 text-green-500 mr-4" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-muted-foreground">{doctor.phone}</p>
                        </div>
                      </div>
                    )}

                    {doctor.email && (
                      <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                        <Mail className="h-6 w-6 text-blue-500 mr-4" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-muted-foreground">{doctor.email}</p>
                        </div>
                      </div>
                    )}

                    {doctor.clinic_address && (
                      <div className="flex items-start p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg md:col-span-2">
                        <MapPin className="h-6 w-6 text-purple-500 mr-4 mt-0.5" />
                        <div>
                          <p className="font-medium">Clinic Address</p>
                          <p className="text-muted-foreground">{doctor.clinic_address}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg md:col-span-2">
                      <Clock className="h-6 w-6 text-orange-500 mr-4" />
                      <div>
                        <p className="font-medium">Availability</p>
                        <p className="text-muted-foreground">{doctor.availability_hours}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default DoctorProfile;