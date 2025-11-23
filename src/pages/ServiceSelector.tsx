import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type Question = {
  id: number;
  question: string;
  options: { value: string; label: string; services: string[] }[];
};

const questions: Question[] = [
  {
    id: 1,
    question: "What is your primary concern?",
    options: [
      { value: "pain", label: "Chronic or acute pain", services: ["chronic-pain", "manual-therapy"] },
      { value: "injury", label: "Recent injury or surgery", services: ["post-surgical", "sports-rehabilitation"] },
      { value: "mobility", label: "Limited mobility or stiffness", services: ["geriatric", "postural-alignment"] },
      { value: "performance", label: "Improve athletic performance", services: ["sports-rehabilitation", "strength-conditioning"] },
    ],
  },
  {
    id: 2,
    question: "Where is the problem located?",
    options: [
      { value: "back", label: "Back or spine", services: ["manual-therapy", "postural-alignment", "chronic-pain"] },
      { value: "joints", label: "Joints (knee, shoulder, etc.)", services: ["sports-rehabilitation", "post-surgical"] },
      { value: "muscles", label: "Muscles or soft tissue", services: ["dry-needling", "cupping-therapy", "kinesiotaping"] },
      { value: "neurological", label: "Neurological symptoms", services: ["neurological", "neuro-dynamic"] },
    ],
  },
  {
    id: 3,
    question: "What is your activity level?",
    options: [
      { value: "sedentary", label: "Mostly sedentary", services: ["postural-alignment", "group-exercise"] },
      { value: "moderate", label: "Moderately active", services: ["manual-therapy", "strength-conditioning"] },
      { value: "athletic", label: "Very active/Athletic", services: ["sports-rehabilitation", "strength-conditioning"] },
      { value: "recovering", label: "Currently recovering", services: ["post-surgical", "geriatric"] },
    ],
  },
];

const serviceDetails: Record<string, { name: string; slug: string; description: string }> = {
  "chronic-pain": { name: "Chronic Pain Management", slug: "chronic-pain", description: "Evidence-based approaches for long-term pain relief" },
  "manual-therapy": { name: "Manual Therapy", slug: "manual-therapy", description: "Hands-on techniques for pain relief and improved function" },
  "post-surgical": { name: "Post-Surgical Rehabilitation", slug: "post-surgical", description: "Specialized recovery programs after surgery" },
  "sports-rehabilitation": { name: "Sports Rehabilitation", slug: "sports-rehabilitation", description: "Get back to peak performance safely" },
  "geriatric": { name: "Geriatric Rehabilitation", slug: "geriatric-rehabilitation", description: "Age-appropriate care for seniors" },
  "postural-alignment": { name: "Postural Alignment", slug: "postural-alignment", description: "Correct posture and prevent pain" },
  "strength-conditioning": { name: "Strength & Conditioning", slug: "strength-conditioning", description: "Build strength and prevent injuries" },
  "neurological": { name: "Neurological Rehabilitation", slug: "neurological", description: "Specialized care for neurological conditions" },
  "neuro-dynamic": { name: "Neuro-Dynamic Treatment", slug: "neuro-dynamic", description: "Address nerve-related symptoms" },
  "dry-needling": { name: "Dry Needling", slug: "dry-needling", description: "Targeted relief for muscle tension" },
  "cupping-therapy": { name: "Cupping Therapy", slug: "cupping-therapy", description: "Traditional technique for pain and recovery" },
  "kinesiotaping": { name: "Kinesiotaping", slug: "kinesiotaping", description: "Support muscles and enhance performance" },
  "group-exercise": { name: "Group Exercise Classes", slug: "group-exercises", description: "Fun, social fitness programs" },
};

const ServiceSelector = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const getRecommendations = () => {
    const serviceCounts: Record<string, number> = {};
    
    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const question = questions[parseInt(questionId)];
      const option = question.options.find(opt => opt.value === answerValue);
      
      option?.services.forEach(service => {
        serviceCounts[service] = (serviceCounts[service] || 0) + 1;
      });
    });

    const sorted = Object.entries(serviceCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([service]) => service);

    return sorted;
  };

  const recommendations = showResults ? getRecommendations() : [];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <SectionTitle
          title="Service Selector Quiz"
          subtitle="Answer a few questions to find the perfect physiotherapy service for your needs"
          center
        />

        <div className="mt-12 max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Question {currentQuestion + 1} of {questions.length}</span>
                        <span>{Math.round(progress)}% Complete</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{questions[currentQuestion].question}</CardTitle>
                    <CardDescription>Select the option that best describes your situation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={answers[currentQuestion]} onValueChange={handleAnswer}>
                      <div className="space-y-3">
                        {questions[currentQuestion].options.map((option) => (
                          <div
                            key={option.value}
                            className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-all hover:border-primary ${
                              answers[currentQuestion] === option.value ? "border-primary bg-primary/5" : ""
                            }`}
                            onClick={() => handleAnswer(option.value)}
                          >
                            <RadioGroupItem value={option.value} id={option.value} />
                            <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                              {option.label}
                            </Label>
                            {answers[currentQuestion] === option.value && (
                              <CheckCircle className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      disabled={currentQuestion === 0}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!answers[currentQuestion]}
                    >
                      {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <div className="text-center">
                      <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary" />
                      <CardTitle className="text-3xl">Your Recommended Services</CardTitle>
                      <CardDescription>Based on your answers, these services are best suited for you</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendations.map((serviceKey, index) => {
                        const service = serviceDetails[serviceKey];
                        return (
                          <motion.div
                            key={serviceKey}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className="border-2 border-primary/20">
                              <CardContent className="pt-6">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge variant="secondary">#{index + 1} Match</Badge>
                                      <h3 className="text-xl font-semibold">{service.name}</h3>
                                    </div>
                                    <p className="text-muted-foreground mb-4">{service.description}</p>
                                    <Link to={`/services/${service.slug}`}>
                                      <Button variant="outline">Learn More</Button>
                                    </Link>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleRestart}>
                      Take Quiz Again
                    </Button>
                    <Link to="/booking">
                      <Button>Book an Appointment</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageLayout>
  );
};

export default ServiceSelector;
