
import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, Clock, Award, MapPin, Phone, Mail, Stethoscope, BookOpen, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Import doctor data from DoctorsPage
import { doctors } from "./DoctorsPage";

const DoctorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const doctor = doctors.find(doc => doc.id.toString() === id);

  if (!doctor) {
    return (
      <PageLayout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Doctor not found</h1>
          <p className="mb-6">The doctor you're looking for doesn't exist or may have been removed.</p>
          <Button asChild>
            <Link to="/doctors">Back to All Doctors</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  // Sample education data - in a real app, this would come from the database
  const education = [
    { degree: "Doctor of Physical Therapy", university: "University of California", year: "2012" },
    { degree: "Master's in Sports Medicine", university: "Stanford University", year: "2010" },
    { degree: "Bachelor of Science in Kinesiology", university: "University of Michigan", year: "2008" }
  ];

  // Sample certifications data
  const certifications = [
    "Board Certified Specialist in Sports Physical Therapy",
    "Manual Therapy Certification",
    "Orthopedic Clinical Specialist",
    "Certified Strength and Conditioning Specialist"
  ];

  // Sample specializations
  const specializations = [
    "Post-surgical rehabilitation",
    "Sports injury management",
    "Therapeutic exercise",
    "Manual therapy techniques",
    "Injury prevention strategies"
  ];

  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        {/* Back Button */}
        <Link 
          to="/doctors" 
          className="inline-flex items-center text-vitality-600 hover:text-vitality-700 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Doctors
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="pt-6 text-center">
                <Avatar className="h-40 w-40 mx-auto mb-4 border-4 border-vitality-100">
                  <AvatarImage src={doctor.image} alt={doctor.name} className="object-cover" />
                  <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <h1 className="text-2xl font-bold text-vitality-700 dark:text-vitality-300 mb-1">{doctor.name}</h1>
                <Badge className="mb-4 bg-vitality-100 text-vitality-700 dark:bg-vitality-900 dark:text-vitality-300">
                  {doctor.specialty}
                </Badge>
                
                <div className="space-y-3 text-left mt-6">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <MapPin className="h-5 w-5 mr-3 text-vitality-500" />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Phone className="h-5 w-5 mr-3 text-vitality-500" />
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Mail className="h-5 w-5 mr-3 text-vitality-500" />
                    <span>{doctor.email}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-3 pt-0">
                <Button asChild className="w-full">
                  <Link to="/booking" className="flex items-center justify-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Right Column - Tabs with details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="space-y-8">
              <TabsList className="grid grid-cols-3 md:grid-cols-4 w-full">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Stethoscope className="h-5 w-5 mr-2 text-vitality-500" />
                      Biography
                    </h2>
                    <div className="space-y-4 text-gray-700 dark:text-gray-300">
                      <p>{doctor.bio}</p>
                      <p>With years of experience in {doctor.specialty.toLowerCase()}, {doctor.name.split(' ')[0]} has helped countless patients recover from injuries and manage chronic conditions. {doctor.name.split(' ')[0]}'s evidence-based approach combines cutting-edge techniques with compassionate care to deliver optimal outcomes for all patients.</p>
                      <p>{doctor.name.split(' ')[0]} is committed to continuing education and staying at the forefront of advancements in physical therapy to provide the highest quality care.</p>
                    </div>
                    
                    <h2 className="text-xl font-semibold mt-8 mb-4 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-vitality-500" />
                      Specializations
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {specializations.map((specialization, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-50 dark:bg-gray-800">
                          {specialization}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="experience" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-vitality-500" />
                      Professional Experience
                    </h2>
                    
                    <div className="space-y-8">
                      <div className="relative pl-8 border-l-2 border-vitality-100 dark:border-vitality-900">
                        <div className="absolute w-4 h-4 bg-vitality-500 rounded-full -left-[9px] top-0"></div>
                        <div className="mb-1">
                          <span className="font-medium">Senior Physical Therapist</span>
                          <Badge className="ml-2 bg-vitality-50 text-vitality-700">Current</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">YASHA's Physiocare</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">2018 - Present</p>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                          Leading rehabilitation programs for patients with various conditions, specializing in {doctor.specialty.toLowerCase()}.
                        </p>
                      </div>
                      
                      <div className="relative pl-8 border-l-2 border-vitality-100 dark:border-vitality-900">
                        <div className="absolute w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full -left-[9px] top-0"></div>
                        <div className="mb-1">
                          <span className="font-medium">Physical Therapist</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">City General Hospital</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">2014 - 2018</p>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                          Provided comprehensive physical therapy services in an inpatient and outpatient setting.
                        </p>
                      </div>
                      
                      <div className="relative pl-8 border-l-2 border-vitality-100 dark:border-vitality-900">
                        <div className="absolute w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full -left-[9px] top-0"></div>
                        <div className="mb-1">
                          <span className="font-medium">Junior Physical Therapist</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Sports Medicine Center</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">2012 - 2014</p>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                          Assisted in rehabilitation of athletes and sports injury management.
                        </p>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-semibold mt-8 mb-4 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-vitality-500" />
                      Certifications
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                      {certifications.map((cert, index) => (
                        <li key={index}>{cert}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="education" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-vitality-500" />
                      Academic Background
                    </h2>
                    
                    <div className="space-y-8">
                      {education.map((edu, index) => (
                        <div key={index} className="relative pl-8 border-l-2 border-vitality-100 dark:border-vitality-900">
                          <div className="absolute w-4 h-4 bg-vitality-300 dark:bg-vitality-700 rounded-full -left-[9px] top-0"></div>
                          <div className="mb-1 font-medium">{edu.degree}</div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{edu.university}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">Class of {edu.year}</p>
                        </div>
                      ))}
                    </div>
                    
                    <h2 className="text-xl font-semibold mt-8 mb-4 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-vitality-500" />
                      Continuing Education
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {doctor.name.split(' ')[0]} regularly attends conferences and workshops to stay current with the latest advancements in physiotherapy.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800">Therapeutic Taping</Badge>
                      <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800">Vestibular Rehabilitation</Badge>
                      <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800">Advanced Manual Therapy</Badge>
                      <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800">Pain Science</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-vitality-500" />
                      Working Hours
                    </h2>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Monday</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Tuesday</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Wednesday</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Thursday</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Friday</span>
                        <span>9:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Saturday</span>
                        <span className="text-gray-500">By Appointment Only</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="font-medium">Sunday</span>
                        <span className="text-gray-500">Closed</span>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-semibold mt-8 mb-4 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-vitality-500" />
                      Book an Appointment
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Select a convenient time for your appointment with {doctor.name}. New patients are always welcome.
                    </p>
                    <Button asChild className="w-full">
                      <Link to="/booking" className="flex items-center justify-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        View Available Time Slots
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DoctorProfile;
