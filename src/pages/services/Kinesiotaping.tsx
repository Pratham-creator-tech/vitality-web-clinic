
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Bandage, CalendarCheck, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Kinesiotaping = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <Button asChild variant="outline" className="mb-8">
          <Link to="/services" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Link>
        </Button>
        
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
              <p>15-30 minutes</p>
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
              Kinesiotaping is an advanced technique that uses specialized elastic tape to support muscles and joints while allowing full range of motion. Unlike traditional athletic taping that restricts movement, kinesiotape works with your body to provide support, reduce pain, improve circulation, and enhance performance without limiting mobility.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Conditions We Treat with Kinesiotaping</h3>
            <ul>
              <li>Sports injuries</li>
              <li>Muscle strains and sprains</li>
              <li>Joint instability</li>
              <li>Postural issues</li>
              <li>Repetitive strain injuries</li>
              <li>Tendonitis</li>
              <li>Swelling and inflammation</li>
              <li>Post-surgical rehabilitation</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Our Approach</h3>
            <p>
              Our physiotherapists are certified in multiple taping techniques and approaches. We begin with a thorough assessment to determine the most appropriate taping method for your specific condition. We then apply the tape using precise techniques tailored to your needs and teach you how to care for the tape to maximize its effectiveness between sessions.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Benefits of Kinesiotaping</h3>
            <ul>
              <li>Pain reduction through sensory feedback</li>
              <li>Improved joint alignment</li>
              <li>Enhanced muscle function</li>
              <li>Reduced swelling through improved circulation</li>
              <li>Support without restricting movement</li>
              <li>Prolonged therapeutic benefits between physiotherapy sessions</li>
              <li>Prevention of further injury</li>
              <li>Enhanced proprioception (body position awareness)</li>
            </ul>
          </div>

          <div className="bg-vitality-100 dark:bg-vitality-900/50 p-8 rounded-xl mb-12">
            <div className="flex items-center mb-4">
              <Bandage className="h-8 w-8 text-vitality-600 mr-4" />
              <h3 className="text-xl font-bold text-vitality-700 dark:text-vitality-300">How Kinesiotape Works</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Kinesiotape works through several mechanisms: it lifts the skin to create space for better circulation, provides sensory input that can change how the brain processes pain signals, supports muscles and fascia while allowing movement, and can help realign tissues for better function.
            </p>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-3">Client Testimonial</h4>
              <p className="italic">
                "I was skeptical about how simple tape could help my shoulder pain, but after my physiotherapist applied kinesiotape, I felt immediate relief. I could move more freely but still felt supported. The tape lasted through showers for nearly a week, and the pain reduction continued even after it was removed."
              </p>
              <p className="mt-3 font-medium">— Karen L., tennis player recovering from rotator cuff strain</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-vitality-700 dark:text-vitality-300">Ready to Try Kinesiotaping?</h3>
              <p className="text-gray-600 dark:text-gray-400">Book an appointment with our certified kinesiotaping specialists.</p>
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
