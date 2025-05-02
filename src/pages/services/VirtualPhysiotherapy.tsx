
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight, Video, CalendarCheck, Clock, CheckCircle, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const VirtualPhysiotherapy = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Virtual Physiotherapy"
            subtitle="Expert care from the comfort of your home"
            center
          />

          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
              alt="Virtual Physiotherapy"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <Clock className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Session Duration</h3>
              <p>30-45 minutes</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <Globe className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Accessibility</h3>
              <p>Available anywhere with internet</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <Video className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Platform</h3>
              <p>User-friendly secure video system</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4 text-vitality-700 dark:text-vitality-300">About Virtual Physiotherapy</h2>
            <p>
              Our Virtual Physiotherapy service brings expert physiotherapy care directly to you, wherever you are. Using secure video technology, our experienced physiotherapists can assess, diagnose, and treat a wide range of conditions remotely. This convenient option is ideal for those who prefer to receive care from home, have mobility limitations, live in remote areas, or have busy schedules that make in-person visits challenging.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Conditions Suitable for Virtual Care</h3>
            <ul>
              <li>General aches and pains</li>
              <li>Posture-related issues</li>
              <li>Repetitive strain injuries</li>
              <li>Post-surgical rehabilitation</li>
              <li>Return to activity guidance</li>
              <li>Chronic pain management</li>
              <li>Exercise program supervision</li>
              <li>Preventative care and education</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Our Approach</h3>
            <p>
              Our virtual sessions are tailored to be as effective as in-person care. Before your appointment, we'll send detailed instructions to help you prepare your space and technology. During the session, your physiotherapist will guide you through assessments, demonstrate exercises, provide education, and answer your questions. Following the appointment, you'll receive personalized exercise programs and resources through our patient portal.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Benefits of Virtual Physiotherapy</h3>
            <ul>
              <li>No travel time or transportation costs</li>
              <li>Comfortable, familiar environment</li>
              <li>Reduced exposure to illness (particularly beneficial during cold/flu season)</li>
              <li>Flexible scheduling options</li>
              <li>Access to care regardless of location</li>
              <li>Ability to receive follow-ups even when traveling</li>
              <li>Real-time assessment of your home/work environment</li>
              <li>Easy inclusion of family members in the treatment process</li>
            </ul>
          </div>

          <div className="bg-vitality-100 dark:bg-vitality-900/50 p-8 rounded-xl mb-12">
            <div className="flex items-center mb-4">
              <CalendarCheck className="h-8 w-8 text-vitality-600 mr-4" />
              <h3 className="text-xl font-bold text-vitality-700 dark:text-vitality-300">How It Works</h3>
            </div>
            <ol className="list-decimal pl-5 text-gray-700 dark:text-gray-300 mb-6 space-y-2">
              <li>Book your virtual appointment through our online system or by phone.</li>
              <li>Receive preparation instructions and a secure link to your video session.</li>
              <li>Join your appointment from any device with a camera and internet connection.</li>
              <li>Participate in your assessment and treatment guided by your physiotherapist.</li>
              <li>Access your personalized exercise program through our patient portal after your session.</li>
              <li>Schedule follow-up sessions as recommended by your therapist.</li>
            </ol>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-3">Patient Testimonial</h4>
              <p className="italic">
                "As someone with a hectic work schedule and two young kids, getting to in-person physiotherapy appointments was always a struggle. Virtual physiotherapy has been a game-changer for me. I've been able to consistently follow my treatment plan for my shoulder injury, and my therapist has even helped me set up my home workspace more ergonomically."
              </p>
              <p className="mt-3 font-medium">— Alex P., busy parent and professional</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-vitality-700 dark:text-vitality-300">Ready for Virtual Care?</h3>
              <p className="text-gray-600 dark:text-gray-400">Book your online session with our expert physiotherapists.</p>
            </div>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link to="/contact" className="flex items-center">
                  Technical Requirements
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild>
                <Link to="/booking" className="flex items-center">
                  Book Virtual Session
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

export default VirtualPhysiotherapy;
