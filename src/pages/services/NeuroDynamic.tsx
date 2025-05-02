
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, CalendarCheck, Clock, CheckCircle, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const NeuroDynamic = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Neuro Dynamic Solutions"
            subtitle="Advanced treatment for nerve-related conditions"
            center
          />

          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
              alt="Neuro Dynamic Solutions"
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
              <h3 className="font-bold text-lg mb-2">Treatment Course</h3>
              <p>6-12 sessions typical</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CheckCircle className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Specialist Care</h3>
              <p>Advanced certified practitioners</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4 text-vitality-700 dark:text-vitality-300">About Neuro Dynamic Solutions</h2>
            <p>
              Neuro Dynamic Solutions (NDS) is an advanced physiotherapy approach that focuses on the assessment and treatment of neural tissue and its surrounding interfaces. This specialized technique addresses how nerves interact with surrounding tissues during movement, and treats dysfunctions in the nervous system that can cause pain, tingling, numbness, and weakness.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Conditions We Treat with NDS</h3>
            <ul>
              <li>Sciatica and radiculopathy</li>
              <li>Carpal tunnel syndrome</li>
              <li>Cubital tunnel syndrome</li>
              <li>Thoracic outlet syndrome</li>
              <li>Cervical radiculopathy (pinched nerve in neck)</li>
              <li>Brachial plexus injuries</li>
              <li>Nerve entrapment syndromes</li>
              <li>Post-surgical nerve irritation</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Our Approach</h3>
            <p>
              Our neurodynamic specialists begin with a detailed assessment of your neural tension, movement patterns, and symptom reproduction. We use specialized tests to determine how your nervous system is moving within your body during different activities. Treatment involves precise manual techniques and specific exercises designed to improve nerve gliding, reduce nerve compression, and restore normal function to the nervous system.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Benefits of Neurodynamic Treatment</h3>
            <ul>
              <li>Relief from nerve-related pain, tingling, and numbness</li>
              <li>Improved mobility and flexibility</li>
              <li>Reduced nerve irritation and inflammation</li>
              <li>Better nerve signal conduction</li>
              <li>Prevention of chronic nerve problems</li>
              <li>Restored function to affected areas</li>
              <li>Effective non-surgical option for nerve entrapment</li>
              <li>Personalized self-management techniques</li>
            </ul>
          </div>

          <div className="bg-vitality-100 dark:bg-vitality-900/50 p-8 rounded-xl mb-12">
            <div className="flex items-center mb-4">
              <Brain className="h-8 w-8 text-vitality-600 mr-4" />
              <h3 className="text-xl font-bold text-vitality-700 dark:text-vitality-300">Specialized Expertise</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our Neuro Dynamic Solutions practitioners have completed extensive post-graduate training in neurodynamics and nerve mobilization techniques. This advanced knowledge allows us to effectively treat complex nerve conditions that may have been resistant to other forms of therapy.
            </p>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-3">Patient Success Story</h4>
              <p className="italic">
                "After months of tingling down my arm and numbness in my fingers that several doctors couldn't resolve, I was referred to YASHA's Physiocare for neurodynamic treatment. The therapist identified exactly where my nerve was getting compressed and used specialized techniques that gave me immediate relief. After completing the full treatment program, my symptoms are completely gone."
              </p>
              <p className="mt-3 font-medium">— Rachel K., recovered from chronic nerve compression</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-vitality-700 dark:text-vitality-300">Experiencing Nerve Symptoms?</h3>
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
                  Book Assessment
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
