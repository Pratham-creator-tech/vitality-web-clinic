
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { CTASection } from "@/components/ui/cta-section";
import { Heart, Award, Users, History, Trophy, GraduationCap } from "lucide-react";

const About = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-vitality-50 via-white to-blue-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-green-100/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6 bg-white rounded-full py-2 px-6 w-fit mx-auto shadow-sm border border-blue-100">
              <Heart className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-sm font-medium text-gray-700">Your Trusted Healthcare Partner</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700 leading-tight">
              About 
              <span className="text-blue-600 block">Vitality Physiotherapy</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We're a dedicated team of healthcare professionals committed to improving quality of life through expert physiotherapy services and cutting-edge treatment approaches.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle 
                title="Our Story" 
                subtitle="Vitality Physiotherapy was founded with a simple mission: to provide exceptional care that empowers people to live healthier, more active lives."
              />
              <p className="text-gray-600 mb-6 leading-relaxed">
                Established in 2008 by Dr. Emily Chen, our clinic began as a small practice with a big vision. Having witnessed the life-changing impact of quality physiotherapy through her work in various healthcare settings, Dr. Chen was determined to create a center where patients would receive truly personalized care.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Over the years, we've grown into a comprehensive wellness center with a team of specialized physiotherapists, each bringing unique expertise to our practice. What hasn't changed is our dedication to our founding principles: evidence-based care, patient education, and a holistic approach to treatment.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we're proud to serve our community with a wide range of physiotherapy services, helping thousands of patients overcome pain, recover from injuries, and improve their physical function.
              </p>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80" 
                  alt="Our clinic building" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Background Decorations */}
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-200 rounded-full opacity-20 z-0"></div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-green-200 rounded-full opacity-20 z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-20 bg-vitality-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Our Core Values" 
            subtitle="These principles guide everything we do at Vitality Physiotherapy."
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="group bg-white p-8 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="bg-vitality-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-vitality-200 transition-colors">
                <Heart className="h-8 w-8 text-vitality-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Patient-Centered Care</h3>
              <p className="text-gray-600 leading-relaxed">
                We put our patients at the center of everything we do, listening carefully to understand their unique needs and goals.
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="bg-vitality-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-vitality-200 transition-colors">
                <Award className="h-8 w-8 text-vitality-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Clinical Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We maintain the highest standards of clinical practice, using evidence-based approaches and continuing education.
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="bg-vitality-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-vitality-200 transition-colors">
                <Users className="h-8 w-8 text-vitality-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Collaborative Approach</h3>
              <p className="text-gray-600 leading-relaxed">
                We work together with patients and other healthcare providers to ensure comprehensive, coordinated care.
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="bg-vitality-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-vitality-200 transition-colors">
                <GraduationCap className="h-8 w-8 text-vitality-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Education & Empowerment</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in educating patients about their conditions and giving them the tools to take control of their health.
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="bg-vitality-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-vitality-200 transition-colors">
                <History className="h-8 w-8 text-vitality-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Long-term Wellness</h3>
              <p className="text-gray-600 leading-relaxed">
                We focus not just on treating immediate issues, but on promoting long-term health and preventing future problems.
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="bg-vitality-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-vitality-200 transition-colors">
                <Trophy className="h-8 w-8 text-vitality-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-vitality-700">Continuous Improvement</h3>
              <p className="text-gray-600 leading-relaxed">
                We constantly seek ways to enhance our services, facilities, and patient experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meet Our Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Meet Our Expert Team" 
            subtitle="Our highly qualified physiotherapists bring years of specialized experience to help you achieve your health goals."
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg border border-gray-100 group">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Dr. Emily Chen" 
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-vitality-700">Dr. Emily Chen</h3>
                <p className="text-blue-600 font-medium mb-3">Founder & Clinical Director</p>
                <p className="text-gray-600 leading-relaxed">
                  With over 15 years of experience in sports rehabilitation and manual therapy, Dr. Chen has helped countless patients recover from complex injuries.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg border border-gray-100 group">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" 
                  alt="Dr. Marcus Johnson" 
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-vitality-700">Dr. Marcus Johnson</h3>
                <p className="text-blue-600 font-medium mb-3">Senior Physiotherapist</p>
                <p className="text-gray-600 leading-relaxed">
                  Specializing in neurological rehabilitation, Dr. Johnson brings a wealth of knowledge in treating patients with stroke, Parkinson's, and other neurological conditions.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg border border-gray-100 group">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                  alt="Dr. Sarah Rodriguez" 
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-vitality-700">Dr. Sarah Rodriguez</h3>
                <p className="text-blue-600 font-medium mb-3">Sports Rehabilitation Specialist</p>
                <p className="text-gray-600 leading-relaxed">
                  A former athlete herself, Dr. Rodriguez focuses on sports injuries and performance enhancement. She works with athletes of all levels to optimize their recovery and function.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CTASection 
        title="Ready to Work with Our Expert Team?" 
        description="Schedule your initial consultation today and take the first step toward improved physical wellness."
      />
    </PageLayout>
  );
};

export default About;
