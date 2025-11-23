import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface BeforeAfterCase {
  id: number;
  title: string;
  condition: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
  improvements: string[];
}

const cases: BeforeAfterCase[] = [
  {
    id: 1,
    title: "Postural Correction",
    condition: "Forward Head Posture & Rounded Shoulders",
    duration: "12 weeks",
    beforeImage: new URL("../../assets/before-after/posture-before.jpg", import.meta.url).href,
    afterImage: new URL("../../assets/before-after/posture-after.jpg", import.meta.url).href,
    improvements: [
      "Eliminated neck pain",
      "Improved shoulder alignment",
      "Increased confidence",
      "Better breathing capacity"
    ]
  },
  {
    id: 2,
    title: "Sports Injury Recovery",
    condition: "Rotator Cuff Injury",
    duration: "8 weeks",
    beforeImage: new URL("../../assets/before-after/mobility-before.jpg", import.meta.url).href,
    afterImage: new URL("../../assets/before-after/mobility-after.jpg", import.meta.url).href,
    improvements: [
      "Full range of motion restored",
      "Pain-free movement",
      "Return to competitive sports",
      "Strengthened shoulder stability"
    ]
  },
  {
    id: 3,
    title: "Post-Surgical Rehabilitation",
    condition: "ACL Reconstruction",
    duration: "16 weeks",
    beforeImage: new URL("../../assets/before-after/recovery-before.jpg", import.meta.url).href,
    afterImage: new URL("../../assets/before-after/recovery-after.jpg", import.meta.url).href,
    improvements: [
      "Independent walking achieved",
      "Knee stability improved",
      "Muscle strength recovered",
      "Returned to normal activities"
    ]
  }
];

export const BeforeAfterGallery = () => {
  const [currentCase, setCurrentCase] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  const nextCase = () => {
    setCurrentCase((prev) => (prev + 1) % cases.length);
    setShowAfter(false);
  };

  const prevCase = () => {
    setCurrentCase((prev) => (prev - 1 + cases.length) % cases.length);
    setShowAfter(false);
  };

  const currentData = cases[currentCase];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-background/50 to-background">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">
            Real Results
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            Transformative Treatment Results
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Witness the life-changing outcomes achieved by our patients through dedicated treatment and expert care
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Image Comparison Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 shadow-elegant hover:shadow-glow transition-all duration-300">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted mb-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={showAfter ? "after" : "before"}
                    src={showAfter ? currentData.afterImage : currentData.beforeImage}
                    alt={showAfter ? "After treatment" : "Before treatment"}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                
                {/* Before/After Badge */}
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant={showAfter ? "default" : "secondary"}
                    className="text-sm font-semibold"
                  >
                    {showAfter ? "AFTER" : "BEFORE"}
                  </Badge>
                </div>
              </div>

              {/* Toggle Button */}
              <Button
                onClick={() => setShowAfter(!showAfter)}
                className="w-full mb-4"
                size="lg"
              >
                {showAfter ? "View Before" : "View After"}
              </Button>

              {/* Navigation */}
              <div className="flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevCase}
                  className="h-10 w-10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                
                <div className="flex gap-2">
                  {cases.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentCase(index);
                        setShowAfter(false);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        index === currentCase
                          ? "w-8 bg-primary"
                          : "w-2 bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextCase}
                  className="h-10 w-10"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Case Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="p-8 shadow-elegant">
              <h3 className="text-3xl font-bold mb-2">{currentData.title}</h3>
              <p className="text-lg text-muted-foreground mb-6">
                {currentData.condition}
              </p>

              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Treatment Duration</p>
                  <p className="text-2xl font-bold text-primary">{currentData.duration}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">Key Improvements</h4>
                <ul className="space-y-3">
                  {currentData.improvements.map((improvement, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{improvement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <p className="text-sm text-muted-foreground italic">
                "Results vary by individual. All images shared with patient consent. Treatment plans are personalized based on individual needs and conditions."
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
