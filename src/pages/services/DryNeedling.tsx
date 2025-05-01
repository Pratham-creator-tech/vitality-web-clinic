
import React from 'react';
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DryNeedling = () => {
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
                title="Dry Needling Therapy"
                subtitle="Targeted treatment for muscular pain and dysfunction"
              />
              <p className="mt-6 text-gray-600 dark:text-gray-300">
                Dry needling is a specialized technique where thin monofilament needles are inserted into 
                myofascial trigger points (knots), tight muscles, or near nerves to stimulate a healing response. 
                This technique helps release muscle tension, improve blood flow, and reduce pain by targeting 
                specific trigger points in the muscle tissue.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Relief from chronic muscular pain</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Improved range of motion and flexibility</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Treatment of myofascial trigger points</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Enhanced recovery from sports injuries</p>
                </div>
              </div>

              <div className="mt-10">
                <Button asChild size="lg" className="bg-vitality-600 hover:bg-vitality-700 text-white">
                  <Link to="/booking" className="flex items-center">
                    Book Dry Needling Session
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
              src="https://images.unsplash.com/photo-1598885159329-9377168ac375?q=80&w=1774&auto=format&fit=crop" 
              alt="Physiotherapist performing dry needling therapy" 
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
        </div>

        <div className="mt-20">
          <SectionTitle
            title="How Dry Needling Works"
            subtitle="Scientific approach to relieving pain and muscle dysfunction"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Trigger Point Release</h3>
              <p className="text-gray-600 dark:text-gray-300">
                The needle creates a small lesion in the trigger point, disrupting the dysfunctional pattern and allowing the muscle to reset to a normal state.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Increased Blood Flow</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Needling stimulates increased blood circulation to the area, bringing oxygen and nutrients that help repair damaged tissues.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Neurological Effects</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dry needling can help normalize the chemical environment around peripheral nerves and block pain signals from reaching the brain.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto bg-orange-50 dark:bg-gray-800/50 p-6 rounded-xl border border-orange-200 dark:border-gray-700">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-orange-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-bold mb-2 text-orange-700 dark:text-orange-400">Important Note</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Dry needling is different from acupuncture. While both use similar tools, dry needling is based on Western medicine principles and 
                specifically targets muscular trigger points, while acupuncture is based on traditional Chinese medicine and works with energy 
                meridians in the body. Our practitioners are specifically trained and certified in dry needling techniques.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <SectionTitle
            title="Conditions Treated"
            subtitle="Dry needling can be effective for a range of musculoskeletal issues"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-4xl mx-auto">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Neck pain and tension headaches</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Low back pain and sciatica</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Shoulder and rotator cuff issues</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Tennis and golfer's elbow</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">IT band syndrome and runner's knee</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Plantar fasciitis and foot pain</p>
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

export default DryNeedling;
