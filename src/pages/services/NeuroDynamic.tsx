
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Zap, CalendarCheck, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const NeuroDynamic = () => {
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
            title="Neuro Dynamic Solution"
            subtitle="Advanced treatment for nerve-related conditions"
            center
          />

          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
              alt="Neuro Dynamic Solution"
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
              <h3 className="font-bold text-lg mb-2">Recommended Course</h3>
              <p>4-8 sessions typically</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CheckCircle className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Relief Timeline</h3>
              <p>Progressive improvement over weeks</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4 text-vitality-700 dark:text-vitality-300">About Neuro Dynamic Solution</h2>
            <p>
              Neurodynamics is a specialized physiotherapy approach that focuses on the movement and mechanics of the nervous system. Our Neuro Dynamic Solution addresses how nerves interact with surrounding tissues as they move and stretch during daily activities. When nerves don't move properly within their surrounding structures, they can become irritated and cause pain, tingling, numbness, and weakness.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Conditions We Treat with Neurodynamic Techniques</h3>
            <ul>
              <li>Sciatica</li>
              <li>Carpal tunnel syndrome</li>
              <li>Cubital tunnel syndrome (ulnar nerve entrapment)</li>
              <li>Thoracic outlet syndrome</li>
              <li>Cervical radiculopathy (pinched nerve in neck)</li>
              <li>Lumbar radiculopathy (pinched nerve in lower back)</li>
              <li>Double crush syndrome</li>
              <li>Nerve tension after injury or surgery</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Our Approach</h3>
            <p>
              Our therapists certified in neurodynamic techniques begin with a comprehensive assessment to identify nerve mobility issues and their relationship to your symptoms. Treatment involves a combination of gentle nerve mobilization techniques, specific exercises, and manual therapy to restore proper nerve movement, reduce sensitivity, and improve function. We focus on progressive, comfortable interventions rather than aggressive stretching.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Benefits of Neurodynamic Treatment</h3>
            <ul>
              <li>Reduction in radiating pain, tingling, and numbness</li>
              <li>Improved nerve mobility and gliding</li>
              <li>Decreased nerve sensitivity</li>
              <li>Improved range of motion</li>
              <li>Better function in daily activities</li>
              <li>Prevention of recurring nerve issues</li>
              <li>Non-invasive alternative for nerve-related pain</li>
              <li>Complementary to other physiotherapy approaches</li>
            </ul>
          </div>

          <div className="bg-vitality-100 dark:bg-vitality-900/50 p-8 rounded-xl mb-12">
            <div className="flex items-center mb-4">
              <Zap className="h-8 w-8 text-vitality-600 mr-4" />
              <h3 className="text-xl font-bold text-vitality-700 dark:text-vitality-300">The Science of Neurodynamics</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              The nervous system is designed to move and adapt during body movement. Much like a telephone wire that needs slack to prevent tension, nerves need to slide, glide, and elongate without restriction. When this normal movement is compromised—whether from injury, poor posture, repetitive strain, or tissue restrictions—symptoms can develop. Our neuro dynamic techniques restore normal nerve mobility and reduce sensitivity.
            </p>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-3">Patient Success Story</h4>
              <p className="italic">
                "After months of tingling down my arm and hand weakness that several doctors couldn't resolve, I was referred to YASHA's for neurodynamic treatment. The therapist identified exactly where my nerve was getting trapped and used gentle techniques to free it up. After six sessions, my symptoms were 90% improved, and I could work at my computer again without pain."
              </p>
              <p className="mt-3 font-medium">— Thomas K., software developer</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-vitality-700 dark:text-vitality-300">Experiencing Nerve Pain?</h3>
              <p className="text-gray-600 dark:text-gray-400">Book an assessment with our neurodynamic specialists.</p>
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

export default NeuroDynamic;
