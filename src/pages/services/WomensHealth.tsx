
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, CalendarCheck, Clock, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const WomensHealth = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Women's Health Physiotherapy"
            subtitle="Specialized physiotherapy services for women's unique health needs"
            center
          />

          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1518310952931-b1de897abd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
              alt="Women's Health Physiotherapy"
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
              <h3 className="font-bold text-lg mb-2">Recommended Frequency</h3>
              <p>Initial weekly, then as needed</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CheckCircle className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Private Setting</h3>
              <p>Confidential, women therapists available</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4 text-vitality-700 dark:text-vitality-300">About Women's Health Physiotherapy</h2>
            <p>
              Our Women's Health Physiotherapy program addresses the unique physical health concerns of women throughout all stages of life. From pregnancy and postpartum care to menopause-related issues, our specialized physiotherapists provide expert, compassionate care in a comfortable and private environment.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Conditions We Treat</h3>
            <ul>
              <li>Pregnancy-related pain (back, pelvic, hip)</li>
              <li>Postpartum recovery and rehabilitation</li>
              <li>Pelvic floor dysfunction</li>
              <li>Urinary incontinence</li>
              <li>Diastasis recti (abdominal separation)</li>
              <li>Pelvic organ prolapse</li>
              <li>Osteoporosis prevention and management</li>
              <li>Post-gynecological surgery rehabilitation</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Our Approach</h3>
            <p>
              We provide thorough assessments and personalized treatment plans in a respectful, private setting. Our women's health physiotherapists have specialized training in pelvic health, prenatal and postnatal care, and women-specific musculoskeletal conditions. We combine hands-on techniques with education and exercise prescription to help women achieve their health goals.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Benefits of Women's Health Physiotherapy</h3>
            <ul>
              <li>Relief from pregnancy and postpartum discomfort</li>
              <li>Improved pelvic floor function</li>
              <li>Better bladder control</li>
              <li>Safe return to exercise after childbirth</li>
              <li>Prevention of future complications</li>
              <li>Enhanced quality of life</li>
              <li>Improved body awareness and confidence</li>
            </ul>
          </div>

          <div className="bg-vitality-100 dark:bg-vitality-900/50 p-8 rounded-xl mb-12">
            <div className="flex items-center mb-4">
              <Sparkles className="h-8 w-8 text-vitality-600 mr-4" />
              <h3 className="text-xl font-bold text-vitality-700 dark:text-vitality-300">Specialized Care for Every Stage</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our women's health services accompany you through all stages of womanhood—from preparing your body for pregnancy, supporting you through the physical changes of pregnancy and childbirth, to addressing menopausal changes and beyond.
            </p>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-3">Patient Testimonial</h4>
              <p className="italic">
                "After the birth of my second child, I was struggling with back pain and incontinence. The women's health physiotherapist at YASHA's created a program that helped me regain my strength and confidence. I only wish I had known about this service after my first pregnancy!"
              </p>
              <p className="mt-3 font-medium">— Melissa K., mother of two</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-vitality-700 dark:text-vitality-300">Ready to Schedule?</h3>
              <p className="text-gray-600 dark:text-gray-400">Book an appointment with our women's health specialists.</p>
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

export default WomensHealth;
