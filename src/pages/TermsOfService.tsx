
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";

const TermsOfService = () => {
  return (
    <PageLayout>
      {/* Header */}
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-700">
              Last Updated: April 15, 2023
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p>
                Welcome to Vitality Physiotherapy &amp; Wellness. These Terms of Service ("Terms") govern your use of our website and services. By accessing our website or using our services, you agree to these Terms.
              </p>
              
              <h2>Acceptance of Terms</h2>
              <p>
                By accessing or using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our website or services.
              </p>
              
              <h2>Services</h2>
              <p>
                Vitality Physiotherapy &amp; Wellness provides physiotherapy and related healthcare services. Our services may include:
              </p>
              <ul>
                <li>Assessment and treatment of physical conditions</li>
                <li>Therapeutic exercises and recommendations</li>
                <li>Health education and wellness information</li>
                <li>Online booking and communication</li>
              </ul>
              <p>
                The information on our website is provided for general educational purposes only and is not intended as medical advice. Always consult with a qualified healthcare provider for personalized advice.
              </p>
              
              <h2>Appointments and Cancellations</h2>
              <p>
                When you book an appointment with us, you agree to:
              </p>
              <ul>
                <li>Provide accurate and complete information</li>
                <li>Arrive on time for your scheduled appointment</li>
                <li>Notify us at least 24 hours in advance if you need to cancel or reschedule</li>
              </ul>
              <p>
                Late cancellations (less than 24 hours' notice) or missed appointments may be subject to a cancellation fee.
              </p>
              
              <h2>Medical Information and Consent</h2>
              <p>
                You understand that:
              </p>
              <ul>
                <li>You are responsible for providing accurate and complete health information</li>
                <li>Treatment plans are developed based on the information you provide</li>
                <li>Physical therapy interventions carry inherent risks and benefits</li>
                <li>You have the right to ask questions and receive information about your care</li>
                <li>You have the right to refuse any aspect of treatment</li>
              </ul>
              <p>
                By receiving our services, you consent to the assessment and treatment procedures deemed necessary by our healthcare professionals.
              </p>
              
              <h2>Privacy</h2>
              <p>
                Your privacy is important to us. Our collection and use of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              
              <h2>Website Use</h2>
              <p>
                When using our website, you agree not to:
              </p>
              <ul>
                <li>Use the website in any way that could disable, overburden, damage, or impair the site</li>
                <li>Use any robot, spider, or other automatic device to access the website</li>
                <li>Introduce viruses, trojans, worms, or other harmful material</li>
                <li>Attempt to gain unauthorized access to secured portions of the website</li>
                <li>Interfere with other users' use of the website</li>
              </ul>
              
              <h2>Intellectual Property</h2>
              <p>
                All content on our website, including text, graphics, logos, images, and software, is the property of Vitality Physiotherapy &amp; Wellness or our content providers and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from our content without our express written permission.
              </p>
              
              <h2>Payment and Insurance</h2>
              <p>
                Payment for services is due at the time of treatment unless other arrangements have been made. We accept various payment methods, including credit cards, debit cards, and insurance.
              </p>
              <p>
                While we may assist you in verifying insurance coverage and submitting claims, you are ultimately responsible for understanding your insurance benefits and for any charges not covered by your insurance.
              </p>
              
              <h2>Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Vitality Physiotherapy &amp; Wellness shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services or website.
              </p>
              
              <h2>Changes to These Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our website or services after any changes indicates your acceptance of the modified Terms.
              </p>
              
              <h2>Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law principles.
              </p>
              
              <h2>Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <address className="not-italic">
                Vitality Physiotherapy &amp; Wellness<br />
                123 Healing Street<br />
                Wellness City, WC 10001<br />
                Email: info@vitalityphysio.com<br />
                Phone: (123) 456-7890
              </address>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TermsOfService;
