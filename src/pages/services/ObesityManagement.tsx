
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight, Weight, CalendarCheck, Clock, CheckCircle, Flame } from "lucide-react";
import { Link } from "react-router-dom";

const ObesityManagement = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Obesity Management & Fitness"
            subtitle="Personalized weight management and fitness programs for sustainable results"
            center
          />

          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80"
              alt="Obesity Management and Fitness"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <Clock className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Session Duration</h3>
              <p>60 minutes per session</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CalendarCheck className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Program Length</h3>
              <p>12-week structured programs</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CheckCircle className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Support Level</h3>
              <p>Individual and group options</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4 text-vitality-700 dark:text-vitality-300">About Our Obesity Management & Fitness Program</h2>
            <p>
              Our Obesity Management & Fitness program combines physiotherapy expertise with evidence-based weight management strategies to help clients achieve healthy, sustainable weight loss while improving physical function and reducing pain. We understand the challenges of weight management and provide compassionate, non-judgmental support tailored to each individual's needs.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Program Components</h3>
            <ul>
              <li>Comprehensive physical assessment</li>
              <li>Individualized exercise prescription</li>
              <li>Joint-friendly movement strategies</li>
              <li>Cardiorespiratory fitness improvement</li>
              <li>Strength and flexibility training</li>
              <li>Pain management during exercise</li>
              <li>Lifestyle modification guidance</li>
              <li>Progress monitoring and program adjustment</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Our Approach</h3>
            <p>
              We take a holistic, person-centered approach to weight management, recognizing that each person's journey is unique. Our physiotherapists specialize in adapting exercise for individuals with weight-related mobility challenges, joint pain, or health conditions. We focus on building sustainable habits and improving function rather than just numbers on a scale.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Benefits of Our Program</h3>
            <ul>
              <li>Safe, effective weight loss</li>
              <li>Improved mobility and function</li>
              <li>Reduced joint pain and stress</li>
              <li>Increased cardiovascular health</li>
              <li>Enhanced strength and endurance</li>
              <li>Better balance and coordination</li>
              <li>Improved confidence and quality of life</li>
              <li>Long-term health risk reduction</li>
            </ul>
          </div>

          <div className="bg-vitality-100 dark:bg-vitality-900/50 p-8 rounded-xl mb-12">
            <div className="flex items-center mb-4">
              <Flame className="h-8 w-8 text-vitality-600 mr-4" />
              <h3 className="text-xl font-bold text-vitality-700 dark:text-vitality-300">Multidisciplinary Support</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              When appropriate, we collaborate with dietitians, psychologists, and medical professionals to provide comprehensive support for weight management. Our focus is on helping you achieve sustainable results through an approach that addresses all aspects of health and wellness.
            </p>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-3">Success Story</h4>
              <p className="italic">
                "I've tried many weight loss programs before, but this was the first one that actually addressed my knee pain and mobility issues. The physiotherapists designed exercises I could actually do without pain, and gradually built my strength and confidence. 8 months later, I've lost 45 pounds and can walk for an hour without pain."
              </p>
              <p className="mt-3 font-medium">— Jennifer H., program participant</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-vitality-700 dark:text-vitality-300">Ready to Start Your Journey?</h3>
              <p className="text-gray-600 dark:text-gray-400">Book a consultation to learn more about our obesity management program.</p>
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
                  Book Consultation
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

export default ObesityManagement;
