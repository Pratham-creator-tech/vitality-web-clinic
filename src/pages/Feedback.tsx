
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { FeedbackForm } from '@/components/feedback/FeedbackForm';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Users, Lightbulb, Bug } from 'lucide-react';

const Feedback = () => {
  const feedbackTypes = [
    {
      icon: MessageSquare,
      title: 'General Feedback',
      description: 'Share your overall thoughts about our services and platform',
    },
    {
      icon: Users,
      title: 'Service Quality',
      description: 'Rate and review the quality of physiotherapy services you received',
    },
    {
      icon: Lightbulb,
      title: 'Feature Request',
      description: 'Suggest new features or improvements you\'d like to see',
    },
    {
      icon: Bug,
      title: 'Bug Report',
      description: 'Report any technical issues or problems you\'ve encountered',
    },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            We Value Your Feedback
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your feedback helps us improve our services and provide better care for all our patients. 
            Share your thoughts, suggestions, or report any issues you've encountered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {feedbackTypes.map((type, index) => {
            const IconComponent = type.icon;
            return (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <IconComponent className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {type.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {type.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <FeedbackForm />

        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need Immediate Help?
            </h3>
            <p className="text-gray-600 mb-4">
              For urgent matters or immediate assistance, please contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="tel:+1234567890"
                className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Feedback;
