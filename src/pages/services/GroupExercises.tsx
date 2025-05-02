
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Users, CalendarCheck, Clock, CheckCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const GroupExercises = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <Button asChild variant="outline" className="mb-8">
          <Link to="/services" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Group Exercise"
            subtitle="Motivating group sessions for fitness and rehabilitation"
            center
          />

          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl">
            <img
              src="/lovable-uploads/24065092-317b-43fa-b198-38a431488a28.png"
              alt="Group Exercise"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <Clock className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Session Duration</h3>
              <p>45-60 minutes</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CalendarCheck className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Class Size</h3>
              <p>6-12 participants</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CheckCircle className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Frequency</h3>
              <p>Weekly classes available</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4 text-vitality-700 dark:text-vitality-300">About Group Exercise Classes</h2>
            <p>
              Our Group Exercise program offers a dynamic and supportive environment for individuals looking to improve their fitness, mobility, and overall health. Led by experienced physiotherapists and fitness professionals, our classes combine evidence-based exercises with the motivation and accountability that comes from working out in a group setting.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Types of Classes We Offer</h3>
            <ul>
              <li>Core & Stability</li>
              <li>Strength & Conditioning</li>
              <li>Flexibility & Mobility</li>
              <li>Senior Fitness</li>
              <li>Rehabilitation-focused classes</li>
              <li>Posture improvement</li>
              <li>Low-impact cardio</li>
              <li>Balance training</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Our Approach</h3>
            <p>
              Unlike generic fitness classes, our group exercises are designed and supervised by healthcare professionals who understand body mechanics, injury prevention, and proper form. We provide modifications for different fitness levels and physical limitations, ensuring that everyone can participate safely and effectively.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Benefits of Group Exercise</h3>
            <ul>
              <li>Increased motivation through peer support</li>
              <li>Cost-effective way to work with professional instructors</li>
              <li>Social interaction and community building</li>
              <li>Consistent schedule to build healthy habits</li>
              <li>Varied exercises to prevent boredom</li>
              <li>Professional guidance on proper form</li>
              <li>Suitable for multiple fitness levels</li>
              <li>Complementary to individual physiotherapy treatment</li>
            </ul>
          </div>

          <div className="bg-vitality-100 dark:bg-vitality-900/50 p-8 rounded-xl mb-12">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-vitality-600 mr-4" />
              <h3 className="text-xl font-bold text-vitality-700 dark:text-vitality-300">Community & Accountability</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Research shows that exercising in a group increases adherence to fitness routines and enhances results. Our classes foster a supportive community where members encourage each other and celebrate progress together. Many participants find that the accountability of scheduled classes helps them maintain consistency in their fitness journey.
            </p>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-3">Participant Testimonial</h4>
              <p className="italic">
                "I've tried exercising on my own for years with mixed results. Joining the core stability class at YASHA's has been a game-changer. The instructors ensure I'm doing the exercises correctly, and the group energy keeps me motivated. I've seen more improvement in three months of classes than in years of solo workouts."
              </p>
              <p className="mt-3 font-medium">— Michael R., attending weekly classes for 6 months</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-vitality-700 dark:text-vitality-300">Ready to Join a Class?</h3>
              <p className="text-gray-600 dark:text-gray-400">View our class schedule and book your spot.</p>
            </div>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link to="/contact" className="flex items-center">
                  Class Schedule
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild>
                <Link to="/booking" className="flex items-center">
                  Book a Class
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GroupExercises;
