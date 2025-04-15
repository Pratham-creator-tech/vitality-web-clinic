
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";

const PrivacyPolicy = () => {
  return (
    <PageLayout>
      {/* Header */}
      <section className="bg-vitality-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display text-vitality-700">
              Privacy Policy
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
                At Vitality Physiotherapy &amp; Wellness, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or communicate with us.
              </p>
              
              <h2>Information We Collect</h2>
              <p>
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul>
                <li>Schedule or modify appointments</li>
                <li>Complete intake forms and health questionnaires</li>
                <li>Register for an account</li>
                <li>Subscribe to our newsletter</li>
                <li>Request information about our services</li>
                <li>Submit feedback or contact us</li>
              </ul>
              <p>
                The personal information we collect may include:
              </p>
              <ul>
                <li>Contact information (name, address, email, phone number)</li>
                <li>Date of birth</li>
                <li>Medical history and current health conditions</li>
                <li>Insurance information</li>
                <li>Emergency contact details</li>
              </ul>
              <p>
                Additionally, we automatically collect certain information when you visit our website, including:
              </p>
              <ul>
                <li>IP address and browser type</li>
                <li>Pages viewed and time spent</li>
                <li>Referring website or source</li>
                <li>Device information</li>
              </ul>
              
              <h2>How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process and fulfill appointments and requests</li>
                <li>Communicate with you about services, promotions, and events</li>
                <li>Send appointment reminders</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Protect against fraudulent or unauthorized transactions</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <h2>Information Sharing and Disclosure</h2>
              <p>
                We may share your information with:
              </p>
              <ul>
                <li>Healthcare providers involved in your care</li>
                <li>Insurance companies for billing purposes</li>
                <li>Service providers who perform functions on our behalf</li>
                <li>Legal authorities when required by law</li>
              </ul>
              <p>
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties for marketing or advertising purposes.
              </p>
              
              <h2>Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              
              <h2>Your Rights and Choices</h2>
              <p>
                You have the right to:
              </p>
              <ul>
                <li>Access and update your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Request deletion of your data (subject to legal obligations)</li>
                <li>Restrict or object to certain processing activities</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided at the end of this policy.
              </p>
              
              <h2>Cookies and Tracking Technologies</h2>
              <p>
                Our website uses cookies and similar tracking technologies to improve user experience, analyze website traffic, and personalize content. You can control cookies through your browser settings.
              </p>
              
              <h2>Children's Privacy</h2>
              <p>
                Our website and services are not intended for individuals under the age of 18 without parental consent. We do not knowingly collect personal information from children. If we learn that we have collected personal information from a child without parental consent, we will delete that information.
              </p>
              
              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The updated version will be indicated by the "Last Updated" date at the top of the policy. We encourage you to review this Privacy Policy periodically.
              </p>
              
              <h2>Contact Us</h2>
              <p>
                If you have any questions or concerns about our Privacy Policy, please contact us at:
              </p>
              <address className="not-italic">
                Vitality Physiotherapy &amp; Wellness<br />
                123 Healing Street<br />
                Wellness City, WC 10001<br />
                Email: privacy@vitalityphysio.com<br />
                Phone: (123) 456-7890
              </address>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrivacyPolicy;
