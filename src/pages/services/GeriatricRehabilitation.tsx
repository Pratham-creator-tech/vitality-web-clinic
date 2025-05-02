
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight, ThermometerSun, CalendarCheck, Clock, CheckCircle, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const GeriatricRehabilitation = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Geriatric Rehabilitation"
            subtitle="Specialized care for elderly patients focusing on mobility and independence"
            center
          />

          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1574279606130-09958dc756f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1776&q=80"
              alt="Geriatric Rehabilitation"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <Clock className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Treatment Duration</h3>
              <p>30-45 minutes per session</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CalendarCheck className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Recommended Frequency</h3>
              <p>1-2 sessions per week</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CheckCircle className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Expected Improvement</h3>
              <p>Progressive improvement with consistent therapy</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4 text-vitality-700 dark:text-vitality-300">About Geriatric Rehabilitation</h2>
            <p>
              Our geriatric rehabilitation program is tailored to meet the unique needs of older adults. We focus on improving mobility, reducing pain, preventing falls, and enhancing quality of life. Our experienced physiotherapists understand the complexities of aging and provide compassionate, evidence-based care to help seniors maintain their independence and active lifestyle.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Conditions We Address</h3>
            <ul>
              <li>Arthritis and joint pain</li>
              <li>Balance disorders and fall prevention</li>
              <li>Post-surgical rehabilitation</li>
              <li>Stroke and neurological conditions</li>
              <li>Osteoporosis management</li>
              <li>Mobility issues</li>
              <li>Dementia-related physical changes</li>
              <li>Cardiopulmonary conditions</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Our Approach</h3>
            <p>
              We take a holistic approach to geriatric rehabilitation, considering each patient's overall health, medications, and lifestyle factors. Our gentle, progressive therapy programs are designed to build strength, improve balance, and enhance functional abilities without causing undue stress or discomfort. We work closely with patients, their families, and other healthcare providers to create comprehensive care plans.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Benefits of Geriatric Rehabilitation</h3>
            <ul>
              <li>Improved mobility and independence</li>
              <li>Reduced risk of falls</li>
              <li>Better management of chronic pain</li>
              <li>Enhanced strength and flexibility</li>
              <li>Improved confidence in daily activities</li>
              <li>Better management of age-related conditions</li>
              <li>Maintenance of social engagement and quality of life</li>
            </ul>
          </div>

          <div className="bg-vitality-100 dark:bg-vitality-900/50 p-8 rounded-xl mb-12">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-vitality-600 mr-4" />
              <h3 className="text-xl font-bold text-vitality-700 dark:text-vitality-300">Safe, Effective Care for Seniors</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our clinic is fully accessible and equipped with specialized equipment for seniors. Our therapists are trained in geriatric care and understand how to modify treatments to accommodate age-related changes and multiple health conditions.
            </p>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-3">Patient Testimonial</h4>
              <p className="italic">
                "At 78, I never thought I'd regain my confidence walking again after my hip replacement. The geriatric team at YASHA's Physiocare has been patient, kind, and incredibly knowledgeable. I'm now able to garden again and take walks with my grandchildren."
              </p>
              <p className="mt-3 font-medium">— Robert M., 78-year-old patient</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-vitality-700 dark:text-vitality-300">Ready to Schedule?</h3>
              <p className="text-gray-600 dark:text-gray-400">Book an appointment with our geriatric specialists.</p>
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

export default GeriatricRehabilitation;
