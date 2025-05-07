
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

// Sample doctors data - in a real app, this would come from the database
export const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Sports Rehabilitation",
    image: "/lovable-uploads/7b1b7587-d1c3-4369-a8c8-edfe4a82fb4f.png",
    location: "Main Clinic, Floor 2",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@yashasphysio.com",
    bio: "Dr. Johnson specializes in sports injuries and rehabilitation with over 10 years of experience working with professional athletes."
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurological Rehabilitation",
    image: "/lovable-uploads/30bc402c-014e-46dc-9698-931870060993.png",
    location: "Downtown Clinic",
    phone: "+1 (555) 234-5678",
    email: "michael.chen@yashasphysio.com",
    bio: "Dr. Chen is an expert in neurological rehabilitation, helping patients recover from strokes, traumatic brain injuries, and other neurological conditions."
  },
  {
    id: 3,
    name: "Dr. Amina Patel",
    specialty: "Women's Health",
    image: "/lovable-uploads/62e4fe11-0dfa-4671-8581-0214b9e1926d.png",
    location: "Main Clinic, Floor 1",
    phone: "+1 (555) 345-6789",
    email: "amina.patel@yashasphysio.com",
    bio: "Dr. Patel specializes in women's health issues, including pre and post-natal care, pelvic floor rehabilitation, and osteoporosis management."
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Manual Therapy",
    image: "/lovable-uploads/3c4574d7-26ae-43ed-b0df-8f3e8e450d3a.png",
    location: "Westside Clinic",
    phone: "+1 (555) 456-7890",
    email: "james.wilson@yashasphysio.com",
    bio: "Dr. Wilson is highly trained in various manual therapy techniques, including myofascial release, joint mobilization, and soft tissue manipulation."
  },
  {
    id: 5,
    name: "Dr. Maria Rodriguez",
    specialty: "Pediatric Rehabilitation",
    image: "/lovable-uploads/c20d9a4f-0cc6-4605-8be3-9c708fd25bd9.png",
    location: "Children's Wing, Main Clinic",
    phone: "+1 (555) 567-8901",
    email: "maria.rodriguez@yashasphysio.com",
    bio: "Dr. Rodriguez has dedicated her career to helping children overcome developmental challenges and recover from injuries through specialized pediatric therapy."
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    specialty: "Geriatric Rehabilitation",
    image: "/lovable-uploads/3879b00b-f504-4970-bdf6-30214c1809e8.png",
    location: "Senior Care Center",
    phone: "+1 (555) 678-9012",
    email: "robert.kim@yashasphysio.com",
    bio: "Dr. Kim focuses on the unique needs of older adults, helping them maintain mobility, balance, and independence through specialized geriatric physical therapy."
  }
];

const DoctorsPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <SectionTitle 
          title="Our Physiotherapy Team" 
          subtitle="Meet our experienced team of physiotherapists dedicated to your health and recovery"
          center
        />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4 border-2 border-vitality-100">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold text-vitality-700 dark:text-vitality-300">{doctor.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialty}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{doctor.bio}</p>
                
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-vitality-500" />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-vitality-500" />
                    <span>{doctor.phone}</span>
                  </div>
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
      </div>
    </PageLayout>
  );
};

export default DoctorsPage;
