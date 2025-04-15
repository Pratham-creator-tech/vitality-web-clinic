
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  showIcon?: boolean;
}

export function CTASection({
  title = "Ready to Start Your Recovery Journey?",
  description = "Our expert team is here to help you move better, feel better and live better.",
  buttonText = "Book a Consultation",
  buttonLink = "/booking",
  showIcon = true,
}: CTASectionProps) {
  return (
    <section className="bg-gradient-to-r from-vitality-100 to-brand-softblue py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display text-vitality-700">
          {title}
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          {description}
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
          <Link to={buttonLink}>
            {buttonText}
            {showIcon && <ArrowRight className="ml-2 h-5 w-5" />}
          </Link>
        </Button>
      </div>
    </section>
  );
}
