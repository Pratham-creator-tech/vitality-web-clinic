
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Award, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Calendar, 
  Building, 
  ShieldCheck, 
  BookOpen,
  BarChart,
  MessageSquare,
  CreditCard,
  Share2
} from "lucide-react";

const DoctorUSP = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
              Join Our Professional Network
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Discover why leading physiotherapists and healthcare providers choose Vitality Physio Platform to grow their practice and provide exceptional care.
            </p>
            <Button asChild size="lg">
              <Link to="/doctor-registration">Join Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Key Benefits for Practitioners" 
            subtitle="Our platform is designed to help you grow your practice, streamline operations, and focus on what matters most - your patients."
            center
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="bg-vitality-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-vitality-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-vitality-700">Practice Growth</h3>
              <p className="text-gray-600">
                Increase your patient base through our platform's referral network and digital marketing tools designed specifically for healthcare providers.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="bg-vitality-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-vitality-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-vitality-700">Streamlined Scheduling</h3>
              <p className="text-gray-600">
                Our intuitive booking system reduces administrative burden, minimizes no-shows, and optimizes your schedule for maximum productivity.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="bg-vitality-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-vitality-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-vitality-700">Professional Credibility</h3>
              <p className="text-gray-600">
                Build your professional profile with verified credentials, patient reviews, and featured expertise to stand out in the healthcare market.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-vitality-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="What Our Practitioners Say" 
            subtitle="Join thousands of healthcare providers who have transformed their practice with Vitality Physio Platform."
            center
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-vitality-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-vitality-700 font-bold">JM</span>
                </div>
                <div>
                  <h4 className="font-bold">Dr. Jane Miller</h4>
                  <p className="text-sm text-gray-600">Sports Physiotherapist</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Since joining Vitality Physio, my patient load has increased by 40%. The platform's scheduling system saves my staff hours each week, and the professional network has been invaluable for complex cases."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-vitality-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-vitality-700 font-bold">RJ</span>
                </div>
                <div>
                  <h4 className="font-bold">Dr. Robert Johnson</h4>
                  <p className="text-sm text-gray-600">Orthopedic Specialist</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The patient management tools and integrated telehealth features have transformed how I deliver care. I can now monitor patient progress remotely and adjust treatment plans in real-time."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-vitality-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-vitality-700 font-bold">SP</span>
                </div>
                <div>
                  <h4 className="font-bold">Sarah Parker, PT</h4>
                  <p className="text-sm text-gray-600">Physical Therapist</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As a solo practitioner, Vitality Physio has given me the tools to compete with larger clinics. The marketing support and professional network have been game-changers for my practice growth."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Platform Features" 
            subtitle="Everything you need to run a successful practice in one integrated platform."
            center
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-gray-100 p-6 rounded-lg hover:border-vitality-200 transition-colors">
              <Users className="h-8 w-8 text-vitality-400 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-vitality-700">Patient Management</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive tools for managing patient records, treatment plans, and communication.
              </p>
            </div>
            
            <div className="border border-gray-100 p-6 rounded-lg hover:border-vitality-200 transition-colors">
              <Calendar className="h-8 w-8 text-vitality-400 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-vitality-700">Smart Scheduling</h3>
              <p className="text-gray-600 text-sm">
                Intelligent booking system with automated reminders and waitlist management.
              </p>
            </div>
            
            <div className="border border-gray-100 p-6 rounded-lg hover:border-vitality-200 transition-colors">
              <BarChart className="h-8 w-8 text-vitality-400 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-vitality-700">Analytics Dashboard</h3>
              <p className="text-gray-600 text-sm">
                Real-time insights into practice performance, patient outcomes, and financial metrics.
              </p>
            </div>
            
            <div className="border border-gray-100 p-6 rounded-lg hover:border-vitality-200 transition-colors">
              <MessageSquare className="h-8 w-8 text-vitality-400 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-vitality-700">Telehealth Integration</h3>
              <p className="text-gray-600 text-sm">
                Secure video consultations and remote patient monitoring capabilities.
              </p>
            </div>
            
            <div className="border border-gray-100 p-6 rounded-lg hover:border-vitality-200 transition-colors">
              <Award className="h-8 w-8 text-vitality-400 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-vitality-700">Professional Profile</h3>
              <p className="text-gray-600 text-sm">
                Showcase your expertise, credentials, and patient testimonials to attract new clients.
              </p>
            </div>
            
            <div className="border border-gray-100 p-6 rounded-lg hover:border-vitality-200 transition-colors">
              <BookOpen className="h-8 w-8 text-vitality-400 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-vitality-700">Educational Resources</h3>
              <p className="text-gray-600 text-sm">
                Access to research, treatment protocols, and professional development materials.
              </p>
            </div>
            
            <div className="border border-gray-100 p-6 rounded-lg hover:border-vitality-200 transition-colors">
              <CreditCard className="h-8 w-8 text-vitality-400 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-vitality-700">Integrated Payments</h3>
              <p className="text-gray-600 text-sm">
                Streamlined billing, insurance processing, and multiple payment options for patients.
              </p>
            </div>
            
            <div className="border border-gray-100 p-6 rounded-lg hover:border-vitality-200 transition-colors">
              <Share2 className="h-8 w-8 text-vitality-400 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-vitality-700">Referral Network</h3>
              <p className="text-gray-600 text-sm">
                Connect with other healthcare providers for patient referrals and collaborative care.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Flexible Subscription Plans" 
            subtitle="Choose the plan that best fits your practice size and needs."
            center
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-2 text-vitality-700">Basic</h3>
              <p className="text-gray-600 mb-4">Perfect for solo practitioners</p>
              <div className="text-3xl font-bold mb-6">$49<span className="text-lg text-gray-500">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-vitality-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Up to 50 patients</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-vitality-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Basic scheduling</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-vitality-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Standard profile</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-vitality-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Email support</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline">Get Started</Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border-2 border-vitality-200 relative">
              <div className="absolute top-0 right-0 bg-vitality-400 text-white px-4 py-1 text-sm font-bold rounded-bl-lg rounded-tr-lg">POPULAR</div>
              <h3 className="text-xl font-bold mb-2 text-vitality-700">Professional</h3>
              <p className="text-gray-600 mb-4">Ideal for growing practices</p>
              <div className="text-3xl font-bold mb-6">$99<span className="text-lg text-gray-500">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-vitality-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Up to 200 patients</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-vitality-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Advanced scheduling</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-vitality-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Featured profile</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-vitality-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Priority support</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-vitality-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Telehealth sessions</span>
                </li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-2 text-vitality-700">Enterprise</h3>
              <p className="text-gray-600 mb-4">For multi-provider clinics</p>
              <div className="text-3xl font-bold mb-6">$199<span className="text-lg text-gray-500">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-vitality-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Unlimited patients</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-vitality-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Complete platform access</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-vitality-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Multi-provider support</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-vitality-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-vitality-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Custom integrations</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline">Contact Sales</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-vitality-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Ready to Transform Your Practice?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of healthcare providers already growing their practice with Vitality Physio Platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="default" className="bg-white text-vitality-700 hover:bg-gray-100">
              <Link to="/doctor-registration">Join Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-vitality-600">
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DoctorUSP;
