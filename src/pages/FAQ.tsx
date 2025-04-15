
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { CTASection } from "@/components/ui/cta-section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqCategories = [
  {
    id: "general",
    title: "General Questions",
    questions: [
      {
        id: "what-is-physio",
        question: "What is physiotherapy and how can it help me?",
        answer: "Physiotherapy is a healthcare profession focused on assessing, diagnosing, and treating a range of physical conditions and movement disorders. It can help by reducing pain, improving mobility and function, preventing injuries, and enhancing overall physical wellness. Our therapists use various techniques including manual therapy, therapeutic exercises, and education to address your specific needs."
      },
      {
        id: "first-visit",
        question: "What should I expect during my first visit?",
        answer: "Your first visit will typically last 45-60 minutes and include a comprehensive assessment. Your physiotherapist will discuss your medical history, current concerns, and goals. They'll perform a physical examination to evaluate your movement, strength, and function. Based on this assessment, they'll explain their findings and develop a personalized treatment plan. Initial treatment may also begin during this first session."
      },
      {
        id: "how-many-sessions",
        question: "How many physiotherapy sessions will I need?",
        answer: "The number of sessions varies greatly depending on your condition, its severity, and your response to treatment. Some patients may see significant improvement after 2-3 sessions, while chronic or complex conditions might require ongoing care. Your physiotherapist will provide an estimate during your initial assessment and will continuously re-evaluate your progress to adjust the treatment plan as needed."
      },
      {
        id: "qualifications",
        question: "What qualifications do your physiotherapists have?",
        answer: "All our physiotherapists hold Doctor of Physical Therapy (DPT) degrees from accredited universities and are licensed to practice in this state. Many have additional certifications in specialized areas such as orthopedics, sports rehabilitation, manual therapy, and neurological rehabilitation. We're committed to ongoing education to ensure we provide the most current, evidence-based care."
      }
    ]
  },
  {
    id: "treatment",
    title: "Treatment & Services",
    questions: [
      {
        id: "treatment-types",
        question: "What types of treatment techniques do you use?",
        answer: "We utilize a wide range of evidence-based techniques including manual therapy (joint mobilization, soft tissue work), therapeutic exercises, neuromuscular re-education, pain modulation techniques, dry needling, and patient education. The specific techniques used will depend on your condition and treatment goals. We take an individualized approach to treatment, combining various techniques to address your unique needs."
      },
      {
        id: "pain-during",
        question: "Will physiotherapy treatment be painful?",
        answer: "While some discomfort may be experienced during certain treatments, particularly when working on injured or inflamed tissues, physiotherapy should not cause significant pain. Our therapists are trained to work within your comfort level and will communicate with you throughout the treatment. Some mild soreness after treatment is normal as tissues respond to therapy, but this typically resolves quickly. Always inform your therapist if you're experiencing pain during treatment."
      },
      {
        id: "home-exercises",
        question: "Will I receive exercises to do at home?",
        answer: "Yes, home exercises are an essential component of physiotherapy treatment. Your therapist will prescribe specific exercises tailored to your condition and goals. These exercises help reinforce the hands-on treatment you receive in the clinic and accelerate your progress. Your home program will be regularly updated as you improve. We use a digital exercise platform that provides clear instructions and videos to ensure you perform the exercises correctly."
      },
      {
        id: "specialized-services",
        question: "Do you offer specialized services for athletes/seniors/pregnant women?",
        answer: "Yes, we offer specialized programs for various populations. For athletes, we provide sports rehabilitation and performance enhancement. For seniors, we offer fall prevention, osteoarthritis management, and general mobility improvement programs. For pregnant and postpartum women, we provide specialized care for pregnancy-related discomfort and postpartum recovery. Each program is tailored to the specific needs and considerations of these populations."
      }
    ]
  },
  {
    id: "insurance",
    title: "Insurance & Payment",
    questions: [
      {
        id: "insurance-coverage",
        question: "Does insurance cover physiotherapy?",
        answer: "Most health insurance plans provide some coverage for physiotherapy services, especially when deemed medically necessary. Coverage varies significantly depending on your specific plan, including potential limitations on the number of visits or requirements for doctor referrals. We recommend contacting your insurance provider directly to understand your benefits. Our administrative team can also help verify your coverage and explain any out-of-pocket costs before treatment begins."
      },
      {
        id: "referral-needed",
        question: "Do I need a doctor's referral to see a physiotherapist?",
        answer: "In our state, patients have direct access to physiotherapy services, meaning you can seek treatment without a physician's referral. However, some insurance plans require a referral for coverage. It's best to check with your insurance provider regarding their specific requirements. Even if not required, we often collaborate with your physician to ensure coordinated care, especially for complex conditions."
      },
      {
        id: "payment-options",
        question: "What payment options do you offer?",
        answer: "We accept most major insurance plans and offer direct billing when possible. For patients without insurance or with limited coverage, we offer affordable self-pay rates. Payment can be made via credit card, debit card, HSA/FSA cards, check, or cash. We also offer payment plans for those requiring extended treatment. Our administrative team is available to discuss financial concerns and help find solutions that work for you."
      },
      {
        id: "cancellation-policy",
        question: "What is your cancellation policy?",
        answer: "We require 24 hours' notice for appointment cancellations. Late cancellations or missed appointments may be subject to a fee that isn't covered by insurance. We understand that emergencies happen, and we evaluate these situations on a case-by-case basis. Consistent attendance is important for optimal treatment outcomes, and timely cancellations allow us to offer that time to other patients who need care."
      }
    ]
  },
  {
    id: "preparation",
    title: "Preparing for Your Visit",
    questions: [
      {
        id: "what-to-wear",
        question: "What should I wear to my physiotherapy appointment?",
        answer: "Wear comfortable, loose-fitting clothing that allows access to the area being treated and permits you to move freely. For lower body issues, shorts or loose pants are recommended. For upper body concerns, tank tops or t-shirts work well. Athletic wear is generally appropriate. For certain assessments, you may be asked to change into a gown, but your therapist will inform you if this is necessary."
      },
      {
        id: "bring-to-first",
        question: "What should I bring to my first appointment?",
        answer: "Please bring your insurance card, photo ID, referral from your doctor (if applicable), any relevant medical records including imaging reports (X-rays, MRIs, etc.), a list of current medications, and any assistive devices you currently use (braces, canes, etc.). If you've completed the new patient forms online, you don't need to print them. Also, arrive 10-15 minutes early to complete any remaining paperwork."
      },
      {
        id: "appointment-length",
        question: "How long do appointments typically last?",
        answer: "Initial evaluations typically last 45-60 minutes to allow time for a comprehensive assessment and initial treatment. Follow-up sessions are usually 30-45 minutes, depending on the treatment plan. More complex conditions may require longer sessions. Please plan your schedule accordingly. Your therapist will recommend an appropriate session length based on your specific needs."
      },
      {
        id: "after-treatment",
        question: "How might I feel after treatment?",
        answer: "Most patients experience some relief after treatment, though responses vary. Some feel immediate improvement in pain or mobility, while others may experience mild soreness for 24-48 hours, similar to how muscles feel after exercise. Occasionally, symptoms might briefly intensify before improving. Stay hydrated and follow any post-treatment instructions your therapist provides. If you have concerns about your response to treatment, don't hesitate to contact your therapist."
      }
    ]
  }
];

const FAQ = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-700">
              Find answers to common questions about physiotherapy, our services, and what to expect during your treatment.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {faqCategories.map((category) => (
            <div key={category.id} className="mb-16 last:mb-0">
              <SectionTitle 
                title={category.title} 
                subtitle={`Find answers to common questions about ${category.title.toLowerCase()}.`}
              />
              
              <div className="mt-8">
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className="border-b border-gray-200">
                      <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-vitality-500 py-4">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4 pt-0">
                        <p className="pt-2">{item.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ))}
          
          {/* Still Have Questions Section */}
          <div className="mt-16 bg-gray-50 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4 text-vitality-700">Still Have Questions?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Please contact our friendly team via phone, email, or our contact form.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="tel:+1234567890" 
                className="px-6 py-3 bg-vitality-300 text-white rounded-md hover:bg-vitality-400 transition-colors font-medium"
              >
                Call Us: (123) 456-7890
              </a>
              <a 
                href="/contact" 
                className="px-6 py-3 bg-white border border-vitality-300 text-vitality-500 rounded-md hover:bg-vitality-50 transition-colors font-medium"
              >
                Contact Form
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <CTASection 
        title="Ready to Start Your Recovery Journey?" 
        description="Book an appointment with one of our expert physiotherapists today."
      />
    </PageLayout>
  );
};

export default FAQ;
