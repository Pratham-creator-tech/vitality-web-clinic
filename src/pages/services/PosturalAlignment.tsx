
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, UserPlus, CalendarCheck, Clock, CheckCircle, Ruler } from "lucide-react";
import { Link } from "react-router-dom";

const PosturalAlignment = () => {
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
            title="Postural Alignment"
            subtitle="Correct posture problems and improve ergonomic wellness"
            center
          />

          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl">
            <img
              src="/lovable-uploads/0c401620-99d7-4077-92c4-8991ed051b54.png"
              alt="Postural Alignment"
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
              <p>1-2 sessions per week initially</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CheckCircle className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Expected Results</h3>
              <p>Noticeable improvement in 4-8 weeks</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4 text-vitality-700 dark:text-vitality-300">About Postural Alignment Therapy</h2>
            <p>
              Our Postural Alignment program helps correct poor posture that can lead to pain, restricted movement, and reduced quality of life. Whether your posture issues stem from workplace ergonomics, lifestyle habits, or an underlying condition, our therapists can help you achieve better alignment, reduce pain, and prevent future problems.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Common Postural Issues We Address</h3>
            <ul>
              <li>Forward head posture ("text neck")</li>
              <li>Rounded shoulders</li>
              <li>Anterior pelvic tilt</li>
              <li>Kyphosis (excessive rounding of the upper back)</li>
              <li>Lordosis (excessive inward curve of the lower back)</li>
              <li>Scoliosis management</li>
              <li>Computer/desk-related postural dysfunction</li>
              <li>Postural issues during pregnancy</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Our Approach</h3>
            <p>
              We begin with a comprehensive postural assessment using specialized tools and techniques to identify specific alignment issues. From there, we develop a personalized treatment plan that may include targeted exercises, manual therapy, ergonomic advice, movement retraining, and education about maintaining good posture throughout daily activities.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Benefits of Postural Alignment Therapy</h3>
            <ul>
              <li>Reduced neck, back, and joint pain</li>
              <li>Improved breathing efficiency</li>
              <li>Enhanced core stability</li>
              <li>Better balance and coordination</li>
              <li>Reduced risk of injury</li>
              <li>Improved athletic performance</li>
              <li>Greater confidence and body awareness</li>
              <li>Long-term spinal health</li>
            </ul>
          </div>

          <div className="bg-vitality-100 dark:bg-vitality-900/50 p-8 rounded-xl mb-12">
            <div className="flex items-center mb-4">
              <Ruler className="h-8 w-8 text-vitality-600 mr-4" />
              <h3 className="text-xl font-bold text-vitality-700 dark:text-vitality-300">Workplace Ergonomics Service</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We offer specialized workplace ergonomic assessments where our experts can visit your office or workplace to evaluate desk setups, identify postural risk factors, and provide practical recommendations to create a healthier work environment.
            </p>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-3">Client Testimonial</h4>
              <p className="italic">
                "Years of desk work left me with chronic neck and shoulder pain. The postural alignment program at YASHA's has been transformative. They didn't just treat my symptoms—they helped me understand the root causes and gave me practical tools to maintain better posture throughout my day."
              </p>
              <p className="mt-3 font-medium">— David L., IT professional</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-vitality-700 dark:text-vitality-300">Ready to Improve Your Posture?</h3>
              <p className="text-gray-600 dark:text-gray-400">Book an appointment with our postural specialists.</p>
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

export default PosturalAlignment;
