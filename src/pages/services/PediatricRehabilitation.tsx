
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Baby, CalendarCheck, Clock, CheckCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const PediatricRehabilitation = () => {
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
            title="Pediatric Rehabilitation"
            subtitle="Specialized care for children's development and rehabilitation needs"
            center
          />

          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl">
            <img
              src="/lovable-uploads/5fe8659c-63e7-4701-b556-50528d1f2471.png"
              alt="Pediatric Rehabilitation"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <Clock className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Treatment Duration</h3>
              <p>45-60 minutes per session</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CalendarCheck className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Recommended Frequency</h3>
              <p>1-3 sessions per week</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CheckCircle className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Expected Recovery</h3>
              <p>Varies by condition, typically 2-6 months</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4 text-vitality-700 dark:text-vitality-300">About Pediatric Rehabilitation</h2>
            <p>
              Our pediatric rehabilitation program is designed to help children overcome developmental challenges, recover from injuries, and manage chronic conditions. Our specialized pediatric physiotherapists work with children of all ages, from infants to adolescents, to improve their physical functioning and quality of life.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Conditions We Treat</h3>
            <ul>
              <li>Developmental delays and disorders</li>
              <li>Cerebral palsy and neuromuscular disorders</li>
              <li>Torticollis and plagiocephaly</li>
              <li>Sports injuries in young athletes</li>
              <li>Post-surgical rehabilitation</li>
              <li>Coordination and balance issues</li>
              <li>Gait abnormalities</li>
              <li>Orthopedic conditions</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Our Approach</h3>
            <p>
              We take a child-friendly, play-based approach to pediatric physiotherapy. Our sessions are engaging and fun, helping children stay motivated while working toward their goals. We involve parents and caregivers in the treatment process, providing education and home exercise programs to support continued progress.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Benefits of Pediatric Rehabilitation</h3>
            <ul>
              <li>Improved motor skills and coordination</li>
              <li>Enhanced strength, flexibility, and endurance</li>
              <li>Better posture and movement patterns</li>
              <li>Increased independence in daily activities</li>
              <li>Reduced pain and discomfort</li>
              <li>Prevention of secondary complications</li>
              <li>Support for developmental milestones</li>
            </ul>
          </div>

          <div className="bg-vitality-100 dark:bg-vitality-900/50 p-8 rounded-xl mb-12">
            <div className="flex items-center mb-4">
              <Baby className="h-8 w-8 text-vitality-600 mr-4" />
              <h3 className="text-xl font-bold text-vitality-700 dark:text-vitality-300">Child-Centered Care</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our pediatric specialists create a supportive, nurturing environment where children feel comfortable and engaged. We adapt our treatment methods to each child's needs, interests, and developmental stage to ensure the best possible outcomes.
            </p>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-3">Parent Testimonial</h4>
              <p className="italic">
                "The pediatric team at YASHA's Physiocare has been incredible with my daughter. They made therapy something she looks forward to, and the progress she's made in just a few months has been remarkable. I highly recommend their services to any parent whose child needs physical therapy."
              </p>
              <p className="mt-3 font-medium">— Sarah T., parent of a 6-year-old patient</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-vitality-700 dark:text-vitality-300">Ready to Schedule?</h3>
              <p className="text-gray-600 dark:text-gray-400">Book an appointment with our pediatric specialists.</p>
            </div>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link to="/contact" className="flex items-center">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild>
                <Link to="/booking" className="flex items-center">
                  Book Appointment
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

export default PediatricRehabilitation;
