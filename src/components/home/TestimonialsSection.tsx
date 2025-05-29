
import { useState } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "The therapists at Vitality Physio are incredibly knowledgeable. After my knee surgery, they helped me recover faster than expected. I'm back to running pain-free!",
    author: "Sarah Johnson",
    role: "Marathon Runner",
    image: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    quote: "I've been dealing with chronic back pain for years. The team at Vitality designed a comprehensive treatment plan that has dramatically improved my quality of life.",
    author: "Michael Torres",
    role: "Office Worker",
    image: "https://randomuser.me/api/portraits/men/36.jpg"
  },
  {
    id: 3,
    quote: "As a former athlete, I've worked with many physiotherapists. The care and expertise at Vitality is unmatched. They don't just treat symptoms, they solve problems.",
    author: "David Chen",
    role: "Former College Athlete",
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: 4,
    quote: "After my stroke, I was worried about regaining my independence. The neurological rehabilitation program at Vitality was life-changing. I can't thank them enough.",
    author: "Linda Martinez",
    role: "Stroke Survivor",
    image: "https://randomuser.me/api/portraits/women/56.jpg"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-20 bg-vitality-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-0 right-0 w-72 h-72 bg-vitality-200 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 opacity-30"></div>
      </div>
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Patient Success Stories" 
          subtitle="Don't just take our word for it. Hear from our patients who have experienced the Vitality difference."
          center
        />
        
        <div className="mt-12 relative max-w-4xl mx-auto">
          <div className="relative bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-12 transform transition-all duration-500 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent rounded-xl"></div>
            <Quote className="absolute top-8 left-8 h-16 w-16 text-vitality-200 opacity-30 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
            
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-gray-700 italic mb-8 relative z-10">
                "{testimonials[currentIndex].quote}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].author}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-vitality-700">{testimonials[currentIndex].author}</h4>
                  <p className="text-gray-500">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-vitality-400" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={goToPrev}
            className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-x-1 hover:bg-white"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-vitality-500" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-x-1 hover:bg-white"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-vitality-500" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
