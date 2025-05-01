
import React from 'react';
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CuppingTherapy = () => {
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
                title="Cupping Therapy"
                subtitle="Ancient healing technique for modern pain relief and recovery"
              />
              <p className="mt-6 text-gray-600 dark:text-gray-300">
                Cupping therapy is a traditional practice that has evolved into an effective modern treatment 
                for various musculoskeletal conditions. Using specially designed cups that create suction on the 
                skin, this therapy helps increase blood flow, reduce pain, loosen tight muscles, and promote 
                healing by drawing stagnant fluids and toxins to the surface.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Enhanced blood circulation and tissue healing</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Release of tight muscles and fascial tissue</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Reduction of pain and inflammation</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Improved recovery after intense training</p>
                </div>
              </div>

              <div className="mt-10">
                <Button asChild size="lg" className="bg-vitality-600 hover:bg-vitality-700 text-white">
                  <Link to="/booking" className="flex items-center">
                    Book Cupping Session
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
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop" 
              alt="Cupping therapy treatment on patient's back" 
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto bg-vitality-50 dark:bg-gray-800/50 p-6 rounded-xl border border-vitality-100 dark:border-gray-700">
          <div className="flex items-start">
            <Info className="h-6 w-6 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-bold mb-2 text-vitality-600 dark:text-vitality-400">About Cupping Marks</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Cupping therapy often leaves circular marks that can appear as bruises. These marks are not painful and typically 
                fade within a few days to a week. The color and intensity of these marks can provide diagnostic information about 
                the condition of the tissues and circulation in the treated area.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <SectionTitle
            title="Our Cupping Approach"
            subtitle="Modern techniques based on traditional wisdom"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Static Cupping</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Cups are placed on specific points and left in position for several minutes to create localized therapeutic effects.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Dynamic Cupping</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Cups are moved along muscle groups while maintaining suction, combining the benefits of massage and cupping.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Flash Cupping</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quick application and removal of cups to stimulate blood flow without leaving significant marks, ideal for sensitive areas.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-20">
          <SectionTitle
            title="Conditions Benefiting from Cupping"
            subtitle="This therapy can help with a variety of musculoskeletal issues"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-4xl mx-auto">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Back and neck pain</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Shoulder tension and frozen shoulder</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Muscle fatigue and delayed onset muscle soreness</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Myofascial pain and trigger points</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Athletic performance recovery</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Respiratory conditions (when combined with other treatments)</p>
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

export default CuppingTherapy;
