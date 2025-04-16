
import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { CTASection } from "@/components/ui/cta-section";

const pricingPlans = [
  {
    id: "basic",
    name: "Basic Membership",
    description: "Essential features for physiotherapists starting their practice",
    price: {
      monthly: 29,
      yearly: 290,
    },
    features: [
      "Limited patient listings (up to 20)",
      "Basic profile customization",
      "Email support",
      "Access to patient booking system",
      "Basic analytics dashboard",
    ],
    popular: false,
    buttonText: "Start with Basic",
    buttonLink: "/doctor-registration?plan=basic"
  },
  {
    id: "professional",
    name: "Professional",
    description: "Complete solution for established physiotherapists",
    price: {
      monthly: 79,
      yearly: 790,
    },
    features: [
      "Unlimited patient listings",
      "Enhanced profile with testimonials",
      "Priority email & phone support",
      "Advanced booking & scheduling",
      "Comprehensive analytics",
      "Patient history management",
      "Treatment plan templates",
      "Integration with health apps",
    ],
    popular: true,
    buttonText: "Go Professional",
    buttonLink: "/doctor-registration?plan=professional"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions for clinics and healthcare organizations",
    price: {
      monthly: 199,
      yearly: 1990,
    },
    features: [
      "All Professional features",
      "Dedicated account manager",
      "Custom domain & branding",
      "Multiple practitioner accounts",
      "Team management tools",
      "API access for custom integrations",
      "HIPAA compliant data storage",
      "Advanced reporting & analytics",
      "Staff scheduling & management",
      "Bulk billing features"
    ],
    popular: false,
    buttonText: "Contact Sales",
    buttonLink: "/contact?inquiry=enterprise"
  }
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
  };

  return (
    <PageLayout>
      <section className="py-16 md:py-24 bg-vitality-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <SectionTitle 
              title="Join Our Network of Physiotherapists" 
              subtitle="Choose the perfect plan to grow your practice and connect with patients"
              center
            />
            
            <div className="mt-8 mb-12 inline-flex items-center p-1 bg-gray-100 rounded-full">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`py-2 px-6 rounded-full text-sm transition-all ${
                  billingCycle === 'monthly' 
                    ? 'bg-white shadow-sm text-vitality-600 font-medium' 
                    : 'text-gray-500'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`py-2 px-6 rounded-full text-sm transition-all ${
                  billingCycle === 'yearly' 
                    ? 'bg-white shadow-sm text-vitality-600 font-medium' 
                    : 'text-gray-500'
                }`}
              >
                Yearly <span className="text-xs font-medium text-vitality-400 ml-1">(Save 20%)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`bg-white rounded-xl shadow-md overflow-hidden relative flex flex-col ${
                    plan.popular ? 'ring-2 ring-vitality-400 transform md:-translate-y-2 scale-105 md:scale-105 z-10' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-vitality-400 text-white px-4 py-1 text-xs font-medium transform translate-x-[30%] rotate-45">
                      Popular
                    </div>
                  )}
                  
                  <div className="p-6 bg-white flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-500 mb-6 min-h-[40px]">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">${plan.price[billingCycle]}</span>
                      <span className="text-gray-500 ml-2">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-6 border-t border-gray-100">
                    <Button 
                      asChild 
                      className={`w-full ${plan.popular ? 'bg-vitality-500 hover:bg-vitality-600' : 'bg-vitality-400 hover:bg-vitality-500'}`}
                    >
                      <Link to={plan.buttonLink}>
                        <span>{plan.buttonText}</span>
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="mt-8 text-sm text-gray-500">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">What's included in my subscription?</h3>
                <p className="text-gray-600">
                  Your subscription includes access to our patient network, booking tools, and profile visibility on our platform. 
                  The specific features depend on your chosen plan, but all plans allow you to connect with patients seeking physiotherapy services.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Can I upgrade or downgrade my plan?</h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes to your subscription will take effect on your next billing cycle.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept all major credit cards and debit cards. For Enterprise plans, we also offer invoice-based payments.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">How does the 14-day trial work?</h3>
                <p className="text-gray-600">
                  When you sign up, you'll get full access to your chosen plan for 14 days. If you decide to continue, you'll be charged at the end of the trial. 
                  If not, you can cancel anytime during the trial period with no charge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CTASection 
        title="Ready to grow your physiotherapy practice?" 
        description="Join our network of professionals and connect with patients today."
      />
    </PageLayout>
  );
};

export default Pricing;
