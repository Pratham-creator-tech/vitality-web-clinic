
import React from 'react';
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Kinesiotaping = () => {
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
                title="Kinesiotaping"
                subtitle="Therapeutic taping for support, stability, and pain reduction"
              />
              <p className="mt-6 text-gray-600 dark:text-gray-300">
                Kinesiotaping is a specialized therapeutic technique that uses flexible, cotton tape to 
                support muscles and joints while promoting natural movement and healing. Unlike traditional 
                athletic tape, kinesiotape is elastic, lightweight, and can be worn for several days, even 
                during showering or swimming.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Support for injured muscles and joints</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Reduction of pain and inflammation</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Enhancement of athletic performance</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Improved circulation and lymphatic drainage</p>
                </div>
              </div>

              <div className="mt-10">
                <Button asChild size="lg" className="bg-vitality-600 hover:bg-vitality-700 text-white">
                  <Link to="/booking" className="flex items-center">
                    Book Kinesiotaping Session
                    <ArrowRight className="ml-2 h-5 w-5" />
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
              src="https://images.unsplash.com/photo-1579762593175-20226054cad0?q=80&w=1771&auto=format&fit=crop" 
              alt="Physiotherapist applying kinesiotape to patient's shoulder" 
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
        </div>

        <div className="mt-20">
          <SectionTitle
            title="How Kinesiotaping Works"
            subtitle="Evidence-based application for optimal therapeutic benefit"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Muscle Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Kinesiotape provides gentle support to muscles while allowing full range of motion, helping to prevent overuse and fatigue.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Pain Reduction</h3>
              <p className="text-gray-600 dark:text-gray-300">
                By lifting the skin slightly, kinesiotape reduces pressure on pain receptors and helps decrease inflammation in the affected area.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Improved Circulation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                The elastic properties of the tape create a gentle lifting effect that improves blood and lymphatic flow, promoting faster healing.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-20">
          <SectionTitle
            title="Common Conditions Treated"
            subtitle="Kinesiotaping can benefit a wide range of injuries and conditions"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-4xl mx-auto">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Shoulder impingement and rotator cuff injuries</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Knee pain and patellofemoral issues</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Lower back pain and sciatica</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Ankle sprains and Achilles tendonitis</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Tennis and golfer's elbow</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Postural correction and alignment issues</p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Button asChild size="lg" className="bg-vitality-600 hover:bg-vitality-700 text-white">
            <Link to="/booking" className="flex items-center">
              Schedule an Appointment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Kinesiotaping;
