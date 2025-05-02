
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight, Grid, CalendarCheck, Clock, CheckCircle, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";

const CuppingTherapy = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Cupping Therapy"
            subtitle="Traditional therapy for muscle tension and circulation"
            center
          />

          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80"
              alt="Cupping Therapy"
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
              <CalendarCheck className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Recommended Frequency</h3>
              <p>Weekly or as needed</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <ThumbsUp className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Expected Results</h3>
              <p>Often immediate relief</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4 text-vitality-700 dark:text-vitality-300">About Cupping Therapy</h2>
            <p>
              Cupping therapy is an ancient healing practice that has gained modern recognition for its effectiveness in treating muscle pain and tension. The therapy involves placing specialized cups on the skin to create suction, which increases blood flow to the area, relieves muscle tension, and promotes cellular repair. At YASHA's Physiocare, we integrate cupping therapy with modern physiotherapy principles for optimal results.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Conditions We Treat with Cupping</h3>
            <ul>
              <li>Muscle tension and stiffness</li>
              <li>Myofascial pain syndrome</li>
              <li>Back and neck pain</li>
              <li>Shoulder tension and pain</li>
              <li>Athletic recovery</li>
              <li>Trigger points</li>
              <li>Fibromyalgia symptoms</li>
              <li>Poor circulation</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Our Approach</h3>
            <p>
              We use modern cupping techniques including silicone and pneumatic cups that allow precise control of suction levels. Treatment may involve static cupping, where cups remain in place, or dynamic cupping, where cups are moved along muscle groups with massage oil. We often combine cupping with other physiotherapy techniques for comprehensive treatment. Our physiotherapists are specially trained in cupping and carefully assess each patient to determine if cupping is appropriate.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Benefits of Cupping Therapy</h3>
            <ul>
              <li>Rapid pain relief</li>
              <li>Release of deep muscle tension</li>
              <li>Enhanced blood circulation</li>
              <li>Reduced muscle inflammation</li>
              <li>Fascial release</li>
              <li>Lymphatic drainage</li>
              <li>Relaxation and stress reduction</li>
              <li>Complementary to other treatments</li>
            </ul>
          </div>

          <div className="bg-vitality-100 dark:bg-vitality-900/50 p-8 rounded-xl mb-12">
            <div className="flex items-center mb-4">
              <Grid className="h-8 w-8 text-vitality-600 mr-4" />
              <h3 className="text-xl font-bold text-vitality-700 dark:text-vitality-300">What to Expect</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Cupping therapy typically leaves circular marks on the skin that may range from light pink to dark purple, depending on the level of stagnation in the tissues. These marks are not bruises and are not painful. They typically fade within 2-7 days. Our therapists will explain this process and ensure you're comfortable with it before proceeding.
            </p>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-3">Patient Testimonial</h4>
              <p className="italic">
                "I've had chronic upper back tension for years due to my desk job. After just one session of cupping therapy, I felt relief that lasted for days. Now I incorporate regular cupping sessions into my wellness routine, and the difference in my pain levels and mobility is remarkable."
              </p>
              <p className="mt-3 font-medium">— Elena S., chronic tension patient</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-vitality-700 dark:text-vitality-300">Experience Cupping Therapy</h3>
              <p className="text-gray-600 dark:text-gray-400">Book a session with our cupping specialists.</p>
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
                  Book Session
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

export default CuppingTherapy;
