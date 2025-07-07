
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Video, Phone, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const QuickBookingSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-vitality-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-vitality-700">
            Book Your Appointment in 3 Easy Steps
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get professional physiotherapy care with our streamlined booking process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center border-2 border-transparent hover:border-vitality-200 transition-colors">
            <CardHeader>
              <div className="w-16 h-16 bg-vitality-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-vitality-600" />
              </div>
              <CardTitle className="text-xl text-vitality-700">1. Choose Date & Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Select your preferred appointment date and time slot from our available options.</p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-transparent hover:border-vitality-200 transition-colors">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-vitality-700">2. Fill Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Provide your basic information and select the service you need for your consultation.</p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-transparent hover:border-vitality-200 transition-colors">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl text-vitality-700">3. Join Virtual Session</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Attend your secure video consultation from the comfort of your home.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg border-l-4 border-l-vitality-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Video className="h-6 w-6 text-vitality-600" />
                Virtual Consultation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Available 9 AM - 6 PM</span>
              </div>
              <p className="text-gray-700">
                Professional physiotherapy consultation from home with HD video quality and secure platform.
              </p>
              <Button asChild className="w-full bg-vitality-600 hover:bg-vitality-700">
                <Link to="/booking" className="flex items-center justify-center gap-2">
                  Book Virtual Session
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-blue-600" />
                Need Help Booking?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Call us Mon-Sat 8 AM - 6 PM</span>
              </div>
              <p className="text-gray-700">
                Our friendly staff is ready to help you schedule your appointment and answer any questions.
              </p>
              <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50" asChild>
                <a href="tel:+1234567890" className="flex items-center justify-center gap-2">
                  Call (123) 456-7890
                  <Phone className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuickBookingSection;
