
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Star, Clock, Calendar, Filter, Award, Heart, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { PageLayout } from '@/components/layout/PageLayout';

interface Doctor {
  id: string;
  full_name: string;
  specialization: string;
  profile_image?: string;
  clinic_address?: string;
  phone?: string;
  email?: string;
  about?: string;
  experience_years?: number;
  rating?: number;
  reviews_count?: number;
  consultation_fee?: number;
  languages?: string[];
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
        .from('profiles')
        .select('*')
        .eq('role', 'doctor')
        .order('full_name');

      if (error) throw error;

      // Mock additional data for demonstration
      const enhancedData = data?.map(doctor => ({
        ...doctor,
        rating: 4.2 + Math.random() * 0.8,
        reviews_count: Math.floor(Math.random() * 500) + 50,
        consultation_fee: Math.floor(Math.random() * 500) + 300,
        languages: ['English', 'Hindi', ...(Math.random() > 0.5 ? ['Regional'] : [])],
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Expert Physiotherapists
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with certified physiotherapy professionals across India. Each doctor is verified and committed to providing exceptional care.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-md">
                <Shield className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm font-medium">Government Certified</span>
              </div>
              <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-md">
                <Award className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm font-medium">5+ Years Experience</span>
              </div>
              <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-md">
                <Heart className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-sm font-medium">Patient-Focused Care</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                          <AvatarImage src={doctor.profile_image} alt={doctor.full_name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                            {getInitials(doctor.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getAvailabilityColor(doctor.availability_status)} rounded-full border-2 border-white`}></div>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg text-gray-800 mb-2">{doctor.full_name}</CardTitle>
                        <p className="text-sm text-blue-600 font-medium">{doctor.specialization}</p>
                        <p className="text-xs text-muted-foreground">{getAvailabilityText(doctor.availability_status)}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Rating and Experience */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">{doctor.rating?.toFixed(1)}</span>
                      <span className="text-sm text-muted-foreground">({doctor.reviews_count} reviews)</span>
                    </div>
                    {doctor.experience_years && (
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                        {doctor.experience_years} years exp
                      </Badge>
                    )}
                  </div>

                  {/* Location */}
                  {doctor.clinic_address && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="truncate">{doctor.clinic_address}</span>
                    </div>
                  )}

                  {/* Consultation Fee */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Consultation Fee:</span>
                    <span className="font-semibold text-green-600">₹{doctor.consultation_fee}</span>
                  </div>

                  {/* Languages */}
                  <div className="flex flex-wrap gap-1">
                    {doctor.languages?.slice(0, 3).map((language, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {language}
                      </Badge>
                    ))}
                  </div>

                  {/* About */}
                  {doctor.about && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{doctor.about}</p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Button asChild variant="outline" size="sm" className="flex-1 hover:bg-blue-50">
                      <Link to={`/doctor/${doctor.id}`}>
                        View Profile
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Link to="/booking" className="flex items-center justify-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Now
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
