
import React from 'react';
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NeuroDynamic = () => {
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
                title="Neuro Dynamic Solution"
                subtitle="Advanced treatment for nerve-related pain and mobility issues"
              />
              <p className="mt-6 text-gray-600 dark:text-gray-300">
                Neuro Dynamic Solution (NDS) is a specialized approach to assessing and treating nerve-related 
                disorders. This technique focuses on the movement and tension of the nervous system within the body, 
                helping to restore proper nerve function, reduce pain, and improve mobility in patients suffering 
                from nerve entrapments, tension or irritation.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Relief from radiating pain and nerve symptoms</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Improved nerve mobility and function</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Treatment for chronic nerve entrapments</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">Enhanced recovery from nerve injuries</p>
                </div>
              </div>

              <div className="mt-10">
                <Button asChild size="lg" className="bg-vitality-600 hover:bg-vitality-700 text-white">
                  <Link to="/booking" className="flex items-center">
                    Book NDS Consultation
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
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1740&auto=format&fit=crop" 
              alt="Physiotherapist performing neuro dynamic treatment" 
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
        </div>

        <div className="mt-20">
          <SectionTitle
            title="How Neuro Dynamic Solution Works"
            subtitle="Evidence-based approach to neural mobilization and treatment"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Neural Assessment</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We conduct specialized tests to evaluate how your nerves move and respond to tension, identifying restrictions or irritations.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Neural Mobilization</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Gentle, precise techniques help restore normal sliding and gliding of nerves through surrounding tissues.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-vitality-600 dark:text-vitality-400">Interface Management</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We address issues where nerves interact with surrounding tissues like muscles, tendons, and bones to reduce friction and compression.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mt-20">
          <SectionTitle
            title="Conditions Treated"
            subtitle="Neuro Dynamic Solution can help with various nerve-related issues"
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-4xl mx-auto">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Sciatica and lumbar radiculopathy</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Carpal tunnel syndrome</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Cubital tunnel syndrome (ulnar nerve entrapment)</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Thoracic outlet syndrome</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Cervical radiculopathy (pinched nerve in neck)</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-vitality-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">Double crush syndrome</p>
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

export default NeuroDynamic;
