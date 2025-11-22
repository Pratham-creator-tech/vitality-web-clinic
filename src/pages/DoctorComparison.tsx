import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Award, 
  Languages, 
  Clock,
  DollarSign,
  ArrowLeft,
  CheckCircle,
  X
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PageLayout from '@/components/layout/PageLayout';
import { Separator } from '@/components/ui/separator';

interface Doctor {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  specialization?: string;
  about?: string;
  profile_image?: string;
  languages?: string[];
  services?: string[];
  clinic_address?: string;
  awards?: string[];
  professional_memberships?: string[];
  experience_years?: number;
  created_at: string;
  updated_at: string;
  // UI enhancement fields
  rating?: number;
  reviews_count?: number;
  consultation_fee?: number;
  certifications?: string[];
  availability_status?: 'available' | 'busy' | 'offline';
}

const DoctorComparison = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctors, setSelectedDoctors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('subscription_status', 'active')
        .limit(10)
        .order('full_name');

      if (error) throw error;

      // Mock additional data for demonstration
      const enhancedData: Doctor[] = data?.map(doctor => ({
        ...doctor,
        rating: 4.2 + Math.random() * 0.8,
        reviews_count: Math.floor(Math.random() * 500) + 50,
        consultation_fee: Math.floor(Math.random() * 500) + 300,
        certifications: ['BPT', 'MPT', ...(Math.random() > 0.7 ? ['PhD'] : [])],
        availability_status: ['available', 'busy', 'offline'][Math.floor(Math.random() * 3)] as 'available' | 'busy' | 'offline'
      })) || [];

      setDoctors(enhancedData);
    } catch (error: any) {
      console.error('Error fetching doctors:', error);
      toast({
        title: "Error",
        description: "Failed to load doctors. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDoctorSelection = (doctorId: string) => {
    setSelectedDoctors(prev => {
      if (prev.includes(doctorId)) {
        return prev.filter(id => id !== doctorId);
      } else {
        if (prev.length >= 3) {
          toast({
            title: "Maximum Selection Reached",
            description: "You can compare up to 3 doctors at a time.",
            variant: "default",
          });
          return prev;
        }
        return [...prev, doctorId];
      }
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  const comparedDoctors = doctors.filter(d => selectedDoctors.includes(d.id));

  if (isLoading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-xl text-muted-foreground">Loading doctors...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4 hover:bg-primary/10">
              <Link to="/doctors" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Doctors
              </Link>
            </Button>
            
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Compare Physiotherapists
              </h1>
              <p className="text-xl text-muted-foreground">
                Select up to 3 doctors to compare their expertise, fees, and availability
              </p>
              <div className="mt-4">
                <Badge variant="outline" className="text-sm">
                  {selectedDoctors.length} of 3 doctors selected
                </Badge>
              </div>
            </div>
          </div>

          {/* Doctor Selection Grid */}
          {comparedDoctors.length === 0 && (
            <Card className="mb-8 border-dashed border-2">
              <CardContent className="p-12 text-center">
                <p className="text-lg text-muted-foreground mb-4">
                  Select doctors from the list below to start comparing
                </p>
              </CardContent>
            </Card>
          )}

          {/* Comparison Table */}
          {comparedDoctors.length > 0 && (
            <div className="mb-12 overflow-x-auto">
              <Card className="shadow-xl border">
                <CardContent className="p-6">
                  <div className="grid gap-6" style={{ gridTemplateColumns: `200px repeat(${comparedDoctors.length}, 1fr)` }}>
                    {/* Header Row */}
                    <div className="font-semibold text-lg"></div>
                    {comparedDoctors.map(doctor => (
                      <div key={doctor.id} className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => toggleDoctorSelection(doctor.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-primary/20">
                          <AvatarImage src={doctor.profile_image} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-primary-foreground text-xl font-bold">
                            {getInitials(doctor.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-foreground">{doctor.full_name}</h3>
                        <p className="text-sm text-primary">{doctor.specialization}</p>
                      </div>
                    ))}

                    <Separator className="col-span-full my-4" />

                    {/* Rating Row */}
                    <div className="font-medium text-muted-foreground flex items-center">
                      <Star className="h-4 w-4 mr-2" />
                      Rating
                    </div>
                    {comparedDoctors.map(doctor => (
                      <div key={doctor.id} className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          {renderStars(doctor.rating || 0)}
                        </div>
                        <p className="text-sm font-semibold">{doctor.rating?.toFixed(1)}</p>
                        <p className="text-xs text-muted-foreground">({doctor.reviews_count} reviews)</p>
                      </div>
                    ))}

                    <Separator className="col-span-full my-2" />

                    {/* Experience Row */}
                    <div className="font-medium text-muted-foreground flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      Experience
                    </div>
                    {comparedDoctors.map(doctor => (
                      <div key={doctor.id} className="text-center">
                        <p className="text-lg font-bold text-foreground">{doctor.experience_years}+ years</p>
                      </div>
                    ))}

                    <Separator className="col-span-full my-2" />

                    {/* Consultation Fee Row */}
                    <div className="font-medium text-muted-foreground flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Consultation Fee
                    </div>
                    {comparedDoctors.map(doctor => (
                      <div key={doctor.id} className="text-center">
                        <p className="text-xl font-bold text-green-600 dark:text-green-400">₹{doctor.consultation_fee}</p>
                      </div>
                    ))}

                    <Separator className="col-span-full my-2" />

                    {/* Languages Row */}
                    <div className="font-medium text-muted-foreground flex items-center">
                      <Languages className="h-4 w-4 mr-2" />
                      Languages
                    </div>
                    {comparedDoctors.map(doctor => (
                      <div key={doctor.id} className="flex flex-wrap gap-1 justify-center">
                        {doctor.languages?.map((lang, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    ))}

                    <Separator className="col-span-full my-2" />

                    {/* Location Row */}
                    <div className="font-medium text-muted-foreground flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Location
                    </div>
                    {comparedDoctors.map(doctor => (
                      <div key={doctor.id} className="text-center">
                        <p className="text-sm text-muted-foreground">{doctor.clinic_address || 'Not specified'}</p>
                      </div>
                    ))}

                    <Separator className="col-span-full my-2" />

                    {/* Availability Row */}
                    <div className="font-medium text-muted-foreground flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Status
                    </div>
                    {comparedDoctors.map(doctor => (
                      <div key={doctor.id} className="flex justify-center">
                        <Badge className={
                          doctor.availability_status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          doctor.availability_status === 'busy' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                        }>
                          {doctor.availability_status}
                        </Badge>
                      </div>
                    ))}

                    <Separator className="col-span-full my-4" />

                    {/* Action Buttons */}
                    <div></div>
                    {comparedDoctors.map(doctor => (
                      <div key={doctor.id} className="flex flex-col gap-2">
                        <Button asChild size="sm" className="w-full bg-gradient-to-r from-primary to-blue-600">
                          <Link to={`/doctor/${doctor.id}`}>
                            View Full Profile
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <Link to="/booking">
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Now
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Available Doctors for Selection */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-foreground">Select Doctors to Compare</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map(doctor => (
                <Card 
                  key={doctor.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    selectedDoctors.includes(doctor.id) 
                      ? 'ring-4 ring-primary shadow-xl scale-105' 
                      : 'hover:scale-102'
                  }`}
                  onClick={() => toggleDoctorSelection(doctor.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 ring-2 ring-border">
                          <AvatarImage src={doctor.profile_image} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-primary-foreground font-bold">
                            {getInitials(doctor.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-foreground">{doctor.full_name}</h3>
                          <p className="text-sm text-primary">{doctor.specialization}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="text-sm font-semibold">{doctor.rating?.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      <Checkbox 
                        checked={selectedDoctors.includes(doctor.id)}
                        onCheckedChange={() => toggleDoctorSelection(doctor.id)}
                      />
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-2" />
                        {doctor.experience_years}+ years experience
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        ₹{doctor.consultation_fee} consultation
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DoctorComparison;
