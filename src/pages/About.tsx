
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { CTASection } from "@/components/ui/cta-section";
import { Heart, Award, Users, History, Trophy, GraduationCap, Stethoscope, Activity, Shield } from "lucide-react";

const About = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-vitality-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-vitality-100/30"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6 bg-white rounded-full py-2 px-6 w-fit mx-auto shadow-sm border border-blue-100">
              <Heart className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-sm font-medium text-gray-700">Your Trusted Healthcare Partner</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display text-blue-900 leading-tight">
              About 
              <span className="text-blue-600 block">Yasha Physiocare</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              We're a dedicated team of healthcare professionals committed to improving quality of life through expert physiotherapy services and cutting-edge treatment approaches.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
              <p className="text-gray-600">Patients Treated</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-gray-600">Emergency Care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-vitality-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <SectionTitle 
                title="Our Story" 
                subtitle="Yasha Physiocare was founded with a simple mission: to provide exceptional care that empowers people to live healthier, more active lives."
              />
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Established in 2008 by Dr. Yasha Patel, our clinic began as a small practice with a big vision. Having witnessed the life-changing impact of quality physiotherapy through her work in various healthcare settings, Dr. Patel was determined to create a center where patients would receive truly personalized care.
                </p>
                <p>
                  Over the years, we've grown into a comprehensive wellness center with a team of specialized physiotherapists, each bringing unique expertise to our practice. What hasn't changed is our dedication to our founding principles: evidence-based care, patient education, and a holistic approach to treatment.
                </p>
                <p>
                  Today, we're proud to serve our community with a wide range of physiotherapy services, helping thousands of patients overcome pain, recover from injuries, and improve their physical function.
                </p>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Physiotherapy treatment session" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Modern physiotherapy equipment" 
                      className="w-full h-40 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Patient rehabilitation" 
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <img 
                      src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Physiotherapy consultation" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Background Decorations */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-200 rounded-full opacity-20 z-0"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-vitality-200 rounded-full opacity-20 z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Our Core Values" 
            subtitle="These principles guide everything we do at Yasha Physiocare."
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="group bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors group-hover:scale-110 transform duration-300">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-900 font-display">Patient-Centered Care</h3>
              <p className="text-gray-600 leading-relaxed">
                We put our patients at the center of everything we do, listening carefully to understand their unique needs and goals.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-vitality-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-vitality-100 hover:border-vitality-200">
              <div className="bg-vitality-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-vitality-200 transition-colors group-hover:scale-110 transform duration-300">
                <Award className="h-8 w-8 text-vitality-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-900 font-display">Clinical Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We maintain the highest standards of clinical practice, using evidence-based approaches and continuing education.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors group-hover:scale-110 transform duration-300">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-900 font-display">Collaborative Approach</h3>
              <p className="text-gray-600 leading-relaxed">
                We work together with patients and other healthcare providers to ensure comprehensive, coordinated care.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-vitality-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-vitality-100 hover:border-vitality-200">
              <div className="bg-vitality-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-vitality-200 transition-colors group-hover:scale-110 transform duration-300">
                <GraduationCap className="h-8 w-8 text-vitality-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-900 font-display">Education & Empowerment</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in educating patients about their conditions and giving them the tools to take control of their health.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors group-hover:scale-110 transform duration-300">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-900 font-display">Long-term Wellness</h3>
              <p className="text-gray-600 leading-relaxed">
                We focus not just on treating immediate issues, but on promoting long-term health and preventing future problems.
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-vitality-50 to-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-vitality-100 hover:border-vitality-200">
              <div className="bg-vitality-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-vitality-200 transition-colors group-hover:scale-110 transform duration-300">
                <Trophy className="h-8 w-8 text-vitality-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-900 font-display">Continuous Improvement</h3>
              <p className="text-gray-600 leading-relaxed">
                We constantly seek ways to enhance our services, facilities, and patient experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Showcase */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-vitality-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Our State-of-the-Art Facility" 
            subtitle="Experience healing in a modern, comfortable environment designed with your recovery in mind."
            center
          />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Modern treatment rooms" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold font-display">Private Treatment Rooms</h3>
                <p className="text-sm opacity-90">Comfortable, fully-equipped spaces</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Exercise rehabilitation area" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold font-display">Exercise Gym</h3>
                <p className="text-sm opacity-90">Advanced rehabilitation equipment</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1584432743501-7d5c27a39189?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Hydrotherapy pool" 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold font-display">Hydrotherapy Pool</h3>
                <p className="text-sm opacity-90">Water-based rehabilitation</p>
              </div>
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
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl overflow-hidden shadow-xl border border-blue-100 group hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Dr. Yasha Patel" 
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 font-display">Dr. Yasha Patel</h3>
                <p className="text-blue-600 font-medium mb-3">Founder & Clinical Director</p>
                <p className="text-gray-600 leading-relaxed">
                  With over 15 years of experience in sports rehabilitation and manual therapy, Dr. Patel has helped countless patients recover from complex injuries.
                </p>
                <div className="flex items-center mt-4 space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-500">Board Certified</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-vitality-50 to-white rounded-2xl overflow-hidden shadow-xl border border-vitality-100 group hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Dr. Marcus Johnson" 
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 font-display">Dr. Marcus Johnson</h3>
                <p className="text-vitality-600 font-medium mb-3">Senior Physiotherapist</p>
                <p className="text-gray-600 leading-relaxed">
                  Specializing in neurological rehabilitation, Dr. Johnson brings a wealth of knowledge in treating patients with stroke, Parkinson's, and other neurological conditions.
                </p>
                <div className="flex items-center mt-4 space-x-2">
                  <Stethoscope className="h-4 w-4 text-vitality-600" />
                  <span className="text-sm text-gray-500">Neuro Specialist</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl overflow-hidden shadow-xl border border-blue-100 group hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Dr. Sarah Rodriguez" 
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 font-display">Dr. Sarah Rodriguez</h3>
                <p className="text-blue-600 font-medium mb-3">Sports Rehabilitation Specialist</p>
                <p className="text-gray-600 leading-relaxed">
                  A former athlete herself, Dr. Rodriguez focuses on sports injuries and performance enhancement. She works with athletes of all levels to optimize their recovery and function.
                </p>
                <div className="flex items-center mt-4 space-x-2">
                  <Trophy className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-500">Sports Medicine</span>
                </div>
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
