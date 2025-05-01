
import React from 'react';
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Monitor, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const VirtualPhysiotherapy = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SectionTitle
                title="Virtual Physiotherapy"
                subtitle="Professional care from the comfort of your home"
              />
              <p className="mt-6 text-gray-600 dark:text-gray-300">
                Our virtual physiotherapy services bring expert care directly to you, wherever you are. 
                Using secure video conferencing technology, our experienced physiotherapists can assess, 
                diagnose, and guide you through tailored treatment programs without you needing to leave home. 
                Virtual sessions are effective for many conditions and provide the flexibility to fit therapy 
                into your busy schedule.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Convenient access to expert care</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Personalized exercise programs with real-time feedback</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Ongoing monitoring of progress and program adjustments</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Time and cost savings with no travel required</p>
                </div>
              </div>

              <div className="mt-10">
                <Button asChild size="lg" className="bg-vitality-600 hover:bg-vitality-700 text-white">
                  <Link to="/booking" className="flex items-center">
                    Book Virtual Consultation
                    <Video className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <img 
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1974&auto=format&fit=crop" 
              alt="Woman participating in virtual physiotherapy session" 
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
        </div>

        <div className="mt-20">
          <SectionTitle
            title="How Virtual Physiotherapy Works"
            subtitle="Simple, effective, and convenient care delivery"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <div className="bg-vitality-50 dark:bg-vitality-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-vitality-600 dark:text-vitality-400 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Book Your Session</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Select a convenient time for your virtual appointment through our online booking system.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <div className="bg-vitality-50 dark:bg-vitality-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-vitality-600 dark:text-vitality-400 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Virtual Assessment</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your physiotherapist will evaluate your condition through video, guiding you through movement tests and discussing your symptoms.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <div className="bg-vitality-50 dark:bg-vitality-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-vitality-600 dark:text-vitality-400 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Treatment & Follow-up</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive a personalized treatment plan, demonstration of exercises, and schedule follow-up sessions to track your progress.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">What You'll Need</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Computer, tablet or smartphone with camera and microphone</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Stable internet connection</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">A quiet, well-lit space with room to move</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Comfortable clothing that allows visibility of the affected area</p>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Conditions Suitable for Virtual Care</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">General aches and pains</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Back and neck pain</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Post-surgical rehabilitation</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Sports injuries</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Ergonomic assessments</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Ongoing condition management</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Button asChild size="lg" className="bg-vitality-600 hover:bg-vitality-700 text-white">
            <Link to="/booking" className="flex items-center">
              Schedule Virtual Appointment
              <Monitor className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            All virtual sessions are conducted through secure, HIPAA-compliant platforms to protect your privacy
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default VirtualPhysiotherapy;
