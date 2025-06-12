
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Star, TrendingUp } from "lucide-react";
import DoctorRecommendationCard from "./DoctorRecommendationCard";

interface RecommendationFilters {
  location: string;
  condition: string;
  language: string;
  availability: string;
  experience: string;
  rating: string;
}

const RecommendationEngine = () => {
  const [filters, setFilters] = useState<RecommendationFilters>({
    location: "",
    condition: "",
    language: "",
    availability: "",
    experience: "",
    rating: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock recommendation data - in real app, this would come from your backend
  const mockRecommendations = [
    {
      id: "1",
      full_name: "Dr. Rajesh Kumar",
      specialization: "Sports Physiotherapy",
      profile_image: "/placeholder.svg",
      clinic_address: "Mumbai, Maharashtra",
      experience_years: 12,
      rating: 4.8,
      reviews_count: 245,
      availability: "Available today",
      match_percentage: 95,
      languages: ["Hindi", "English", "Marathi"],
      services: ["Sports Rehabilitation", "Manual Therapy"],
      reason: "Expert in sports injuries and has treated similar cases in your area"
    },
    {
      id: "2",
      full_name: "Dr. Priya Sharma",
      specialization: "Neurological Physiotherapy",
      profile_image: "/placeholder.svg",
      clinic_address: "Delhi, Delhi",
      experience_years: 8,
      rating: 4.9,
      reviews_count: 189,
      availability: "Available tomorrow",
      match_percentage: 88,
      languages: ["Hindi", "English", "Punjabi"],
      services: ["Neurological Rehabilitation", "Stroke Recovery"],
      reason: "Highly rated specialist in neurological conditions with excellent patient outcomes"
    },
    {
      id: "3",
      full_name: "Dr. Arjun Reddy",
      specialization: "Orthopedic Physiotherapy",
      profile_image: "/placeholder.svg",
      clinic_address: "Bangalore, Karnataka",
      experience_years: 15,
      rating: 4.7,
      reviews_count: 312,
      availability: "Available in 2 days",
      match_percentage: 82,
      languages: ["English", "Telugu", "Kannada"],
      services: ["Post-Surgical Rehabilitation", "Joint Pain Management"],
      reason: "Senior specialist with extensive experience in post-surgical recovery"
    }
  ];

  const conditions = [
    "Back Pain", "Neck Pain", "Knee Pain", "Shoulder Pain", "Sports Injury",
    "Post-Surgery Recovery", "Stroke Recovery", "Arthritis", "Sciatica", "Chronic Pain"
  ];

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Pune", "Hyderabad", "Ahmedabad"
  ];

  const languages = [
    "English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi"
  ];

  useEffect(() => {
    // Simulate API call for recommendations
    setIsLoading(true);
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 1000);
  }, [filters, searchQuery]);

  const handleFilterChange = (key: keyof RecommendationFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      condition: "",
      language: "",
      availability: "",
      experience: "",
      rating: "",
    });
    setSearchQuery("");
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== "").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-vitality-700 dark:text-vitality-300 mb-2 font-display">
          Find Your Perfect Physiotherapist
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Our AI-powered recommendation system matches you with the best doctors based on your needs
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount} active</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div>
            <Label htmlFor="search">Search by name or specialization</Label>
            <Input
              id="search"
              placeholder="e.g., Dr. Smith or Sports Physiotherapy"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <Label>Location</Label>
              <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Condition</Label>
              <Select value={filters.condition} onValueChange={(value) => handleFilterChange("condition", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Your condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map(condition => (
                    <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Language</Label>
              <Select value={filters.language} onValueChange={(value) => handleFilterChange("language", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Preferred language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(language => (
                    <SelectItem key={language} value={language}>{language}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Availability</Label>
              <Select value={filters.availability} onValueChange={(value) => handleFilterChange("availability", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="When needed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="week">This week</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Experience</Label>
              <Select value={filters.experience} onValueChange={(value) => handleFilterChange("experience", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Min experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5+">5+ years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                  <SelectItem value="15+">15+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Rating</Label>
              <Select value={filters.rating} onValueChange={(value) => handleFilterChange("rating", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Min rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4.0+">4.0+ stars</SelectItem>
                  <SelectItem value="4.5+">4.5+ stars</SelectItem>
                  <SelectItem value="4.8+">4.8+ stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <Button variant="outline" onClick={clearFilters} className="w-full">
              Clear all filters
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Trending Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Trending Conditions in Your Area
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {["Back Pain", "Knee Pain", "Neck Pain", "Sports Injury", "Post-Surgery"].map((condition) => (
              <Button
                key={condition}
                variant="outline"
                size="sm"
                onClick={() => handleFilterChange("condition", condition)}
                className="hover:bg-vitality-50 hover:border-vitality-300"
              >
                {condition}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 text-vitality-500" />
          <h3 className="text-xl font-semibold text-vitality-700 dark:text-vitality-300">
            Recommended for You
          </h3>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((doctor) => (
              <DoctorRecommendationCard
                key={doctor.id}
                doctor={doctor}
                reason={doctor.reason}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationEngine;
