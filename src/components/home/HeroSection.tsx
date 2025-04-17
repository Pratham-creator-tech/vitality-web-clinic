
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarCheck, ArrowRight, Shield, Star, UserCheck } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-brand-softblue via-white to-vitality-50 overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <div className="flex items-center mb-4 bg-vitality-50 rounded-full py-1 px-4 w-fit">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-vitality-700">Trusted by 10,000+ patients</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display text-vitality-700 leading-tight">
              Professional Care for Your Body & Mind
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Our evidence-based physiotherapy services are delivered by certified specialists committed to your complete recovery and well-being.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <Link to="/booking" className="flex items-center">
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  Book Appointment
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/ai-assistant" className="flex items-center">
                  Chat with AI Assistant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-vitality-500 mr-2" />
                <span className="text-sm font-medium">Certified Specialists</span>
              </div>
              <div className="flex items-center">
                <UserCheck className="h-5 w-5 text-vitality-500 mr-2" />
                <span className="text-sm font-medium">Personalized Care</span>
              </div>
              <div className="flex items-center">
                <CalendarCheck className="h-5 w-5 text-vitality-500 mr-2" />
                <span className="text-sm font-medium">Flexible Scheduling</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full bg-vitality-300 flex items-center justify-center text-white text-xs">
                  4.9
                </div>
                <div className="flex space-x-1 items-center bg-white py-1 px-3 rounded-full shadow-sm border border-gray-100">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm font-medium text-gray-600 ml-1">
                    (400+ reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                alt="Physiotherapist treating patient" 
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-vitality-300 rounded-full opacity-30 z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-orange rounded-full opacity-10 z-0"></div>
            
            {/* Stats card */}
            <div className="absolute -bottom-5 -left-5 md:left-5 bg-white rounded-lg shadow-lg p-4 z-20 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="bg-vitality-50 rounded-full p-3">
                  <UserCheck className="h-6 w-6 text-vitality-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Since 2010</p>
                  <p className="text-lg font-bold text-vitality-700">10,000+ Patients</p>
                  <p className="text-xs text-gray-500">Successfully Treated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trusted By Section */}
      <div className="bg-white py-8 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 font-medium mb-6">Trusted By</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <img src="https://placehold.co/150x50/f3f4f6/64748b?text=Regional+Hospital" alt="Regional Hospital" className="h-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
            <img src="https://placehold.co/150x50/f3f4f6/64748b?text=Sports+Center" alt="Sports Center" className="h-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
            <img src="https://placehold.co/150x50/f3f4f6/64748b?text=Wellness+Club" alt="Wellness Club" className="h-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
            <img src="https://placehold.co/150x50/f3f4f6/64748b?text=Health+Network" alt="Health Network" className="h-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
