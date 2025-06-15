
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DoctorBenefits = () => (
  <PageLayout>
    <div className="container mx-auto py-16 px-4">
      <SectionTitle
        title="Benefits for Doctors"
        subtitle="Discover how joining our platform can streamline your practice and benefit your career."
        center
      />
      <div className="mt-8 bg-vitality-50 dark:bg-vitality-900/30 p-8 md:p-12 rounded-lg shadow-sm text-center">
        <h2 className="text-2xl font-display font-bold mb-4 text-vitality-700 dark:text-vitality-200">Grow Your Practice with Us</h2>
        <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
          Vitality Physio Platform offers:
        </p>
        <ul className="text-left max-w-lg mx-auto mb-8 space-y-3">
          <li>✔️ Patient referrals from our network</li>
          <li>✔️ Advanced booking and calendar management tools</li>
          <li>✔️ Secure telehealth and digital consultations</li>
          <li>✔️ Access to clinic analytics and patient insights</li>
          <li>✔️ Professional profile and marketing support</li>
        </ul>
        <Button asChild>
          <Link to="/doctor-registration">Join Now</Link>
        </Button>
      </div>
    </div>
  </PageLayout>
);

export default DoctorBenefits;
