
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, CalendarCheck, Clock, CheckCircle, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";

const GroupExercises = () => {
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            title="Group Exercise Classes"
            subtitle="Motivating group sessions for fitness and rehabilitation"
            center
          />

          <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
              alt="Group Exercise Classes"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <Clock className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Class Duration</h3>
              <p>45-60 minutes per session</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <CalendarCheck className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Class Schedule</h3>
              <p>Multiple times weekly</p>
            </div>
            <div className="bg-vitality-50 dark:bg-vitality-900/30 p-6 rounded-lg text-center">
              <Users className="h-10 w-10 mx-auto mb-4 text-vitality-600" />
              <h3 className="font-bold text-lg mb-2">Class Size</h3>
              <p>Small groups (4-12 participants)</p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4 text-vitality-700 dark:text-vitality-300">About Our Group Exercise Classes</h2>
            <p>
              Our physiotherapist-led group exercise classes combine the benefits of expert guidance with the motivation and energy of a group setting. Each class is designed to promote fitness, function, and well-being in a supportive environment where participants can challenge themselves safely and effectively.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Types of Classes We Offer</h3>
            <ul>
              <li><strong>Clinical Pilates:</strong> Core strengthening and posture improvement</li>
              <li><strong>Balance & Fall Prevention:</strong> Stability exercises for older adults</li>
              <li><strong>Back Care:</strong> Specialized exercises for those with back pain</li>
              <li><strong>Functional Fitness:</strong> Movement patterns for everyday activities</li>
              <li><strong>Joint-Friendly Cardio:</strong> Low-impact aerobic exercise</li>
              <li><strong>Strength & Conditioning:</strong> Progressive resistance training</li>
              <li><strong>Post-Rehabilitation:</strong> For those transitioning from individual therapy</li>
              <li><strong>Prenatal & Postnatal:</strong> Safe exercise for new and expectant mothers</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Our Approach</h3>
            <p>
              Unlike general fitness classes, our physiotherapist-led sessions emphasize proper form, appropriate exercise selection, and individual modifications based on participants' needs and abilities. Each participant undergoes an initial screening to ensure the class is suitable for their condition, and our instructors can provide personalized guidance within the group setting.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3 text-vitality-700 dark:text-vitality-300">Benefits of Group Exercise Classes</h3>
            <ul>
              <li>Cost-effective way to access professional guidance</li>
              <li>Motivation and accountability from group participation</li>
              <li>Social connection and peer support</li>
              <li>Structured, progressive exercise programs</li>
              <li>Safe environment for those with health conditions</li>
              <li>Improved strength, flexibility, and cardiovascular health</li>
              <li>Better mood and reduced stress</li>
              <li>Consistent exercise routine</li>
            </ul>
          </div>

          <div className="bg-vitality-100 dark:bg-vitality-900/50 p-8 rounded-xl mb-12">
            <div className="flex items-center mb-4">
              <Dumbbell className="h-8 w-8 text-vitality-600 mr-4" />
              <h3 className="text-xl font-bold text-vitality-700 dark:text-vitality-300">Class Packages Available</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We offer flexible class packages to suit your schedule and budget. Choose from drop-in sessions, 10-class passes, or monthly unlimited options. New participants can try their first class at a reduced rate to find the right fit for their needs.
            </p>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-3">Participant Testimonial</h4>
              <p className="italic">
                "The Clinical Pilates class has been a game-changer for me. I was hesitant to exercise after my back injury, but the physiotherapist instructors make me feel safe and supported. The small class size means I get personal attention when needed, and I've made friends who keep me coming back week after week."
              </p>
              <p className="mt-3 font-medium">— Lisa M., Clinical Pilates participant</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-vitality-700 dark:text-vitality-300">Ready to Join a Class?</h3>
              <p className="text-gray-600 dark:text-gray-400">Book a screening appointment or register for an upcoming class.</p>
            </div>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link to="/contact" className="flex items-center">
                  Class Schedule
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild>
                <Link to="/booking" className="flex items-center">
                  Register Now
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

export default GroupExercises;
