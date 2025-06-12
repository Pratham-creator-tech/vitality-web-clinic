
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, MapPin, Clock, Award, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface DoctorRecommendationCardProps {
  doctor: {
    id: string;
    full_name: string;
    specialization: string;
    profile_image?: string;
    clinic_address?: string;
    experience_years?: number;
    rating: number;
    reviews_count: number;
    availability: string;
    match_percentage: number;
    languages?: string[];
    services?: string[];
  };
  reason: string;
}

const DoctorRecommendationCard = ({ doctor, reason }: DoctorRecommendationCardProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 75) return "bg-blue-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-gray-500";
  };

  return (
    <Card className="hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-vitality-100">
              <AvatarImage src={doctor.profile_image} alt={doctor.full_name} />
              <AvatarFallback>{getInitials(doctor.full_name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg text-vitality-700 dark:text-vitality-300">
                {doctor.full_name}
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialization}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`${getMatchColor(doctor.match_percentage)} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
              {doctor.match_percentage}% match
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Rating and Experience */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold">{doctor.rating}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({doctor.reviews_count} reviews)
            </span>
          </div>
          {doctor.experience_years && (
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <Award className="h-4 w-4" />
              <span>{doctor.experience_years} years exp</span>
            </div>
          )}
        </div>

        {/* Location and Availability */}
        <div className="space-y-2">
          {doctor.clinic_address && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{doctor.clinic_address}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{doctor.availability}</span>
          </div>
        </div>

        {/* Languages */}
        {doctor.languages && doctor.languages.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {doctor.languages.slice(0, 3).map((language, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {language}
              </Badge>
            ))}
            {doctor.languages.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{doctor.languages.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Recommendation Reason */}
        <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Why recommended:</strong> {reason}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to={`/doctor/${doctor.id}`}>View Profile</Link>
          </Button>
          <Button asChild size="sm" className="flex-1">
            <Link to="/booking" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Book Now
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorRecommendationCard;
