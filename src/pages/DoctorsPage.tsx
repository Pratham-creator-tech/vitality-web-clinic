
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Star, Clock, Calendar, Filter, Award, Heart, Shield, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
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
  certifications?: string[];
  availability_status?: 'available' | 'busy' | 'offline';
}

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  
  const { user, userRole } = useAuth();
  const { toast } = useToast();

  const specializations = [
    'Orthopedic Physiotherapy',
    'Neurological Rehabilitation',
    'Sports Rehabilitation',
    'Pediatric Physiotherapy',
    'Geriatric Care',
    'Women\'s Health',
    'Cardiopulmonary Rehabilitation'
  ];

  const locations = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    filterAndSortDoctors();
  }, [doctors, searchTerm, specializationFilter, locationFilter, sortBy]);

  const fetchDoctors = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('subscription_status', 'active')
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

  const filterAndSortDoctors = () => {
    let filtered = doctors.filter(doctor => {
      const matchesSearch = doctor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialization = specializationFilter === 'all' || 
                                   doctor.specialization?.toLowerCase().includes(specializationFilter.toLowerCase());
      const matchesLocation = locationFilter === 'all' || 
                             doctor.clinic_address?.toLowerCase().includes(locationFilter.toLowerCase());
      
      return matchesSearch && matchesSpecialization && matchesLocation;
    });

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'experience':
          return (b.experience_years || 0) - (a.experience_years || 0);
        case 'fee':
          return (a.consultation_fee || 0) - (b.consultation_fee || 0);
        case 'name':
          return a.full_name.localeCompare(b.full_name);
        default:
          return 0;
      }
    });

    setFilteredDoctors(filtered);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvailabilityColor = (status?: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getAvailabilityText = (status?: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-xl text-muted-foreground">Loading our expert physiotherapists...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background py-12">
        <div className="container mx-auto px-4">
          {/* Hero Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-4">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 text-sm">
                <Shield className="h-4 w-4 mr-2 inline" />
                Verified Healthcare Professionals
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
              Find Your Perfect
              <br />Physiotherapy Expert
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Connect with India's top certified physiotherapists. Expert care for sports injuries, chronic pain, rehabilitation, and wellness.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <div className="group flex items-center bg-card border border-border rounded-2xl px-6 py-4 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 mr-3 group-hover:scale-110 transition-transform">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-foreground">Certified</div>
                  <div className="text-xs text-muted-foreground">Government Licensed</div>
                </div>
              </div>
              <div className="group flex items-center bg-card border border-border rounded-2xl px-6 py-4 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 mr-3 group-hover:scale-110 transition-transform">
                  <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-foreground">Experienced</div>
                  <div className="text-xs text-muted-foreground">5+ Years Average</div>
                </div>
              </div>
              <div className="group flex items-center bg-card border border-border rounded-2xl px-6 py-4 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-2 mr-3 group-hover:scale-110 transition-transform">
                  <Heart className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-foreground">Patient First</div>
                  <div className="text-xs text-muted-foreground">98% Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <Card className="mb-8 shadow-xl border border-border bg-card/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Find Your Perfect Match</h2>
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <Link to="/doctors/compare">
                    Compare Doctors
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white"
                  />
                </div>
                
                <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specializations</SelectItem>
                    {specializations.map(spec => (
                      <SelectItem key={spec} value={spec.toLowerCase()}>{spec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location.toLowerCase()}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                    <SelectItem value="fee">Lowest Fee</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSpecializationFilter('all');
                  setLocationFilter('all');
                  setSortBy('rating');
                }} className="bg-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredDoctors.length} of {doctors.length} physiotherapists
            </p>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor, index) => (
              <Card 
                key={doctor.id} 
                className="group hover:shadow-2xl transition-all duration-500 border border-border bg-card hover:-translate-y-2 hover:border-primary/50 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Card Header with Gradient Overlay */}
                <div className="relative h-32 bg-gradient-to-br from-primary/10 via-blue-50 to-cyan-50 dark:from-primary/20 dark:via-blue-900/20 dark:to-cyan-900/20">
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent"></div>
                  <div className="absolute -bottom-12 left-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-4 border-card shadow-xl ring-4 ring-background/50 transition-transform duration-300 group-hover:scale-110">
                        <AvatarImage src={doctor.profile_image} alt={doctor.full_name} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-primary-foreground text-xl font-bold">
                          {getInitials(doctor.full_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${getAvailabilityColor(doctor.availability_status)} rounded-full border-3 border-card shadow-lg pulse`}></div>
                      <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground shadow-lg">
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </div>
                </div>

                <CardContent className="pt-16 pb-6 px-6 space-y-4">
                  {/* Doctor Info */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {doctor.full_name}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-2">{doctor.specialization}</p>
                    <div className="inline-flex items-center bg-muted rounded-full px-3 py-1 text-xs">
                      <div className={`w-2 h-2 ${getAvailabilityColor(doctor.availability_status)} rounded-full mr-2 animate-pulse`}></div>
                      <span className="font-medium">{getAvailabilityText(doctor.availability_status)}</span>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between py-3 border-y border-border">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-foreground">{doctor.rating?.toFixed(1)}</span>
                      <span className="text-xs text-muted-foreground">({doctor.reviews_count})</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    {doctor.experience_years && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {doctor.experience_years}+ yrs
                      </Badge>
                    )}
                    <Separator orientation="vertical" className="h-4" />
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Fee</div>
                      <div className="font-bold text-green-600 dark:text-green-400">₹{doctor.consultation_fee}</div>
                    </div>
                  </div>

                  {/* Location */}
                  {doctor.clinic_address && (
                    <div className="flex items-start text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-primary" />
                      <span className="line-clamp-2">{doctor.clinic_address}</span>
                    </div>
                  )}

                  {/* Languages */}
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages?.slice(0, 3).map((language, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-primary/20 hover:border-primary hover:bg-primary/10 transition-colors">
                        {language}
                      </Badge>
                    ))}
                    {doctor.languages && doctor.languages.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{doctor.languages.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* About Preview */}
                  {doctor.about && (
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed italic">
                      "{doctor.about}"
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                    >
                      <Link to={`/doctor/${doctor.id}`} className="flex items-center justify-center">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </Button>
                    <Button 
                      asChild 
                      size="sm" 
                      className="flex-[2] bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Link to="/booking" className="flex items-center justify-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Appointment
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <Search className="h-16 w-16 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No doctors found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search criteria or filters</p>
              <Button onClick={() => {
                setSearchTerm('');
                setSpecializationFilter('all');
                setLocationFilter('all');
              }}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default DoctorsPage;
