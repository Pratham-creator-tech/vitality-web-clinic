
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Syringe, CalendarCheck, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const DryNeedling = () => {
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
            title="Dry Needling Therapy"
            subtitle="Precision treatment for muscle pain and tension"
            center
          />

          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl">
            <img
              src="/lovable-uploads/bc0dc033-b554-4c42-b097-ae2e85030924.png"
              alt="Dry Needling Therapy"
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
              <h3 className="font-bold text-lg mb-2">Recommended Course</h3>
              <p>2-6 sessions</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CheckCircle className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Relief Onset</h3>
              <p>Often within 24-48 hours</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4 text-vitality-700 dark:text-vitality-300">About Dry Needling Therapy</h2>
            <p>
              Dry needling is an advanced technique where our specially trained physiotherapists insert thin monofilament needles into myofascial trigger points (painful knots in muscles) to release tension and reduce pain. Unlike acupuncture, which is based on traditional Chinese medicine principles, dry needling is based on Western medicine principles and targets specific anatomical structures.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Conditions We Treat with Dry Needling</h3>
            <ul>
              <li>Myofascial pain syndrome</li>
              <li>Neck and back pain</li>
              <li>Headaches and migraines</li>
              <li>Shoulder impingement</li>
              <li>Tennis/golfer's elbow</li>
              <li>Hip and gluteal pain</li>
              <li>Knee pain</li>
              <li>Plantar fasciitis</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Our Approach</h3>
            <p>
              Dry needling at YASHA's Physiocare is always performed by physiotherapists with advanced certification in the technique. We begin with a comprehensive assessment to determine if dry needling is appropriate for your condition. The treatment is typically integrated with other physiotherapy techniques such as manual therapy, exercise, and education to provide a complete approach to your recovery.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Benefits of Dry Needling</h3>
            <ul>
              <li>Immediate or rapid reduction in pain</li>
              <li>Release of muscle tension and trigger points</li>
              <li>Improved range of motion and flexibility</li>
              <li>Enhanced blood flow to affected areas</li>
              <li>Accelerated healing in injured tissues</li>
              <li>Reduced muscle spasm and cramping</li>
              <li>Normalization of dysfunction in the motor endplate (where nerve meets muscle)</li>
              <li>Complementary to other physiotherapy treatments</li>
            </ul>
          </div>

          <div className="bg-vitality-100 dark:bg-vitality-900/50 p-8 rounded-xl mb-12">
            <div className="flex items-center mb-4">
              <Syringe className="h-8 w-8 text-vitality-600 mr-4" />
              <h3 className="text-xl font-bold text-vitality-700 dark:text-vitality-300">What to Expect</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              During your dry needling session, you may experience a brief moment of discomfort as the needle contacts a trigger point, often described as a small cramp or ache. This is actually a positive sign called a "local twitch response" that indicates the treatment is targeting the right spot. After treatment, some mild soreness for 24-48 hours is normal, similar to what you might feel after exercise.
            </p>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-3">Patient Testimonial</h4>
              <p className="italic">
                "I had been dealing with chronic shoulder pain for years when my physiotherapist suggested trying dry needling. I was nervous at first, but it wasn't nearly as uncomfortable as I expected. After just three sessions, I had more mobility in my shoulder than I'd had in years, and the constant pain was finally gone."
              </p>
              <p className="mt-3 font-medium">— James R., chronic shoulder pain patient</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-vitality-700 dark:text-vitality-300">Ready to Try Dry Needling?</h3>
              <p className="text-gray-600 dark:text-gray-400">Book an appointment with our certified practitioners.</p>
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

export default DryNeedling;
