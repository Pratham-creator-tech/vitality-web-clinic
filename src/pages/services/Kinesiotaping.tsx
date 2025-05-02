
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bandage, CalendarCheck, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Kinesiotaping = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Kinesiotaping"
            subtitle="Advanced taping techniques for pain relief and muscle support"
            center
          />

          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1619124649874-f21dd6450d95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80"
              alt="Kinesiotaping"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <Clock className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Application Time</h3>
              <p>15-30 minutes per session</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CalendarCheck className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Tape Duration</h3>
              <p>3-5 days per application</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CheckCircle className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Relief Onset</h3>
              <p>Often immediate</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4 text-vitality-700 dark:text-vitality-300">About Kinesiotaping</h2>
            <p>
              Kinesiotaping is an advanced therapeutic technique that uses specially designed elastic tape to support muscles, reduce pain, improve circulation, and enhance movement. Unlike rigid athletic tape that restricts movement, kinesiotape allows for a full range of motion while providing therapeutic benefits through its unique elasticity and application methods.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Conditions We Treat with Kinesiotaping</h3>
            <ul>
              <li>Muscle strains and sprains</li>
              <li>Joint instability</li>
              <li>Postural correction</li>
              <li>Sports injuries</li>
              <li>Swelling and edema</li>
              <li>Tendonitis and tendinopathy</li>
              <li>Post-surgical support</li>
              <li>Pregnancy-related discomfort</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Our Approach</h3>
            <p>
              Our physiotherapists are certified in various kinesiotaping methods and have extensive experience applying taping techniques for different conditions. We begin with a thorough assessment to identify the best taping strategy for your specific needs. We also provide education on how the tape works, what to expect, and how to care for your skin while the tape is applied.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Benefits of Kinesiotaping</h3>
            <ul>
              <li>Pain relief through neurological and mechanical effects</li>
              <li>Improved muscle function and activation patterns</li>
              <li>Enhanced proprioception (body awareness)</li>
              <li>Support without restricting range of motion</li>
              <li>Reduced swelling through improved circulation</li>
              <li>24/7 therapeutic effect between sessions</li>
              <li>Waterproof and durable for active lifestyles</li>
              <li>Non-pharmacological pain management option</li>
            </ul>
          </div>

          <div className="bg-vitality-100 dark:bg-vitality-900/50 p-8 rounded-xl mb-12">
            <div className="flex items-center mb-4">
              <Bandage className="h-8 w-8 text-vitality-600 mr-4" />
              <h3 className="text-xl font-bold text-vitality-700 dark:text-vitality-300">Self-Application Training</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              For recurring conditions or long-term management, we offer training sessions where we teach you or a caregiver how to apply the tape yourself. This empowers you to continue benefiting from kinesiotaping between clinical visits.
            </p>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-3">Patient Testimonial</h4>
              <p className="italic">
                "I was skeptical about how colored tape could help my knee pain, but the relief was almost immediate after my first kinesiotaping session. I could walk longer distances with less pain, and the therapist taught me how to apply it myself for my upcoming hiking trip. It made such a difference!"
              </p>
              <p className="mt-3 font-medium">— Michael T., runner with patellofemoral pain</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-vitality-700 dark:text-vitality-300">Try Kinesiotaping</h3>
              <p className="text-gray-600 dark:text-gray-400">Experience the benefits of kinesiotaping with our experts.</p>
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

export default Kinesiotaping;
