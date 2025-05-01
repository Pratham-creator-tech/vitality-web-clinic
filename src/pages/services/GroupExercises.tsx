
import React from 'react';
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const GroupExercises = () => {
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
                title="Group Exercise Classes"
                subtitle="Therapeutic exercise in a motivating group setting"
              />
              <p className="mt-6 text-gray-600 dark:text-gray-300">
                Our group exercise classes combine the expertise of physiotherapy with the energy and motivation 
                of group workouts. These specialized classes provide a supportive community environment while 
                ensuring proper form and technique under the guidance of qualified physiotherapists.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Clinical Pilates and core strengthening</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Balance and mobility classes for seniors</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Post-rehab fitness and conditioning</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Therapeutic yoga for pain management</p>
                </div>
              </div>

              <div className="mt-10">
                <Button asChild size="lg" className="bg-vitality-600 hover:bg-vitality-700 text-white">
                  <Link to="/booking" className="flex items-center">
                    View Class Schedule
                    <Calendar className="ml-2 h-5 w-5" />
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
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1770&auto=format&fit=crop" 
              alt="Group physiotherapy exercise class" 
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
        </div>

        <div className="mt-20">
          <SectionTitle
            title="Our Group Exercise Approach"
            subtitle="Expert guidance in a supportive community atmosphere"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Small Class Sizes</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We limit our classes to ensure each participant receives adequate attention and guidance from our physiotherapists.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Condition-Specific Classes</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We offer specialized classes targeting specific conditions like back pain, arthritis, or post-surgery rehabilitation.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Modifications for All Levels</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our instructors provide options and modifications to accommodate different fitness levels and physical limitations.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-20">
          <SectionTitle
            title="Class Schedule"
            subtitle="Join us for our weekly group sessions"
            center
          />
          
          <div className="mt-10 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-bold text-vitality-600 dark:text-vitality-400">Clinical Pilates</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Core strengthening and spinal alignment</p>
                </div>
                <div className="mt-2 sm:mt-0 flex flex-col sm:text-right">
                  <span className="text-sm font-medium">Mondays & Wednesdays</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">6:00 PM - 7:00 PM</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-bold text-vitality-600 dark:text-vitality-400">Senior Balance & Mobility</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Fall prevention and functional movement</p>
                </div>
                <div className="mt-2 sm:mt-0 flex flex-col sm:text-right">
                  <span className="text-sm font-medium">Tuesdays & Thursdays</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">10:00 AM - 11:00 AM</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-bold text-vitality-600 dark:text-vitality-400">Therapeutic Yoga</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Gentle stretching and mind-body connection</p>
                </div>
                <div className="mt-2 sm:mt-0 flex flex-col sm:text-right">
                  <span className="text-sm font-medium">Fridays</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">5:30 PM - 6:30 PM</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h4 className="font-bold text-vitality-600 dark:text-vitality-400">Post-Rehab Fitness</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Rebuilding strength after injury or surgery</p>
                </div>
                <div className="mt-2 sm:mt-0 flex flex-col sm:text-right">
                  <span className="text-sm font-medium">Saturdays</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">9:00 AM - 10:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Button asChild size="lg" className="bg-vitality-600 hover:bg-vitality-700 text-white">
            <Link to="/booking" className="flex items-center">
              Book a Class
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default GroupExercises;
