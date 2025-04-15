
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";

const NotFound = () => {
  return (
    <PageLayout>
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-9xl font-bold text-vitality-300 mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-vitality-700 font-display">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-vitality-400 hover:bg-vitality-500">
              <Link to="/" className="flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact" className="flex items-center">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
