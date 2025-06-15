
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Grid, CalendarCheck, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CuppingTherapy = () => {
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
            title="Cupping Therapy"
            subtitle="Traditional therapy for muscle tension and circulation"
            center
          />

          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl">
            <img
              src="/lovable-uploads/2eff2a62-2c07-4abe-8845-55eaef425bf8.png"
              alt="Cupping Therapy"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <Clock className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Session Duration</h3>
              <p>20-30 minutes</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CalendarCheck className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Recommended Frequency</h3>
              <p>Once every 1-2 weeks</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CheckCircle className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Initial Results</h3>
              <p>Often felt immediately</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4 text-vitality-700 dark:text-vitality-300">About Cupping Therapy</h2>
            <p>
              Cupping therapy is an ancient technique that has been modernized and integrated into contemporary physiotherapy practice. It involves placing specialized cups on the skin to create suction, which increases blood flow, releases fascial restrictions, and promotes healing. At YASHA's Physiocare, we use both traditional and modern cupping approaches as part of a comprehensive treatment plan.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Conditions We Treat with Cupping</h3>
            <ul>
              <li>Chronic muscle tension and knots</li>
              <li>Myofascial pain syndrome</li>
              <li>Back and neck pain</li>
              <li>Shoulder stiffness</li>
              <li>Sports injuries</li>
              <li>Poor circulation</li>
              <li>Tension headaches</li>
              <li>Fibromyalgia symptoms</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Our Approach</h3>
            <p>
              We use several cupping techniques depending on your specific needs. Static cupping involves leaving cups in place for several minutes, while dynamic cupping involves moving the cups across lubricated skin. We may also use a combination approach with other therapies like massage or dry needling for maximum benefit. Our physiotherapists are fully trained in both traditional and modern cupping methods.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Benefits of Cupping Therapy</h3>
            <ul>
              <li>Increased blood flow to tight or painful areas</li>
              <li>Release of fascial restrictions</li>
              <li>Reduction in muscle tension</li>
              <li>Decreased pain and inflammation</li>
              <li>Improved tissue mobility</li>
              <li>Enhanced removal of toxins and metabolic waste</li>
              <li>Complementary effect to other physiotherapy treatments</li>
              <li>Potential to reach deeper tissues than manual therapy alone</li>
            </ul>
          </div>

          <div className="bg-vitality-100 dark:bg-vitality-900/50 p-8 rounded-xl mb-12">
            <div className="flex items-center mb-4">
              <Grid className="h-8 w-8 text-vitality-600 mr-4" />
              <h3 className="text-xl font-bold text-vitality-700 dark:text-vitality-300">What to Expect</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              During a cupping session, you may experience a tight sensation where the cups are placed, but it shouldn't be painful. After treatment, circular marks often appear where the cups were placed. These marks are not bruises but rather a result of bringing blood to the surface; they typically fade within a few days to a week. The treatment itself is relaxing for most people, with many reporting immediate relief from tension.
            </p>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-3">Client Experience</h4>
              <p className="italic">
                "I was hesitant to try cupping at first, but my persistent upper back tightness wasn't responding to regular massage. After just one cupping session, I felt a release that I hadn't experienced in months. Yes, I had the circular marks for about 5 days, but the relief I felt was absolutely worth it. Now I include cupping in my regular maintenance treatments."
              </p>
              <p className="mt-3 font-medium">— Lisa M., office worker</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-vitality-700 dark:text-vitality-300">Ready to Try Cupping?</h3>
              <p className="text-gray-600 dark:text-gray-400">Book an appointment with our cupping specialists.</p>
            </div>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link to="/contact" className="flex items-center">
                  Learn More
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

export default CuppingTherapy;
