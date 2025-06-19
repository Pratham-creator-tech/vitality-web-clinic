
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Heart, Apple, Pill, Clock, AlertCircle, CheckCircle } from "lucide-react";

const DietPlan = () => {
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");

  const treatmentTypes = [
    { value: "sports-rehabilitation", label: "Sports Rehabilitation" },
    { value: "chronic-pain", label: "Chronic Pain Management" },
    { value: "post-surgical", label: "Post-Surgical Recovery" },
    { value: "neurological", label: "Neurological Rehabilitation" },
    { value: "obesity-management", label: "Obesity Management" },
    { value: "womens-health", label: "Women's Health" },
    { value: "geriatric", label: "Geriatric Care" },
    { value: "pediatric", label: "Pediatric Care" },
  ];

  const conditions = [
    { value: "inflammation", label: "Inflammation" },
    { value: "muscle-weakness", label: "Muscle Weakness" },
    { value: "bone-health", label: "Bone Health Issues" },
    { value: "joint-pain", label: "Joint Pain" },
    { value: "fatigue", label: "Chronic Fatigue" },
    { value: "wound-healing", label: "Wound Healing" },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-vitality-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-vitality-100/30"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6 bg-white rounded-full py-2 px-6 w-fit mx-auto shadow-sm border border-blue-100">
              <Heart className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-sm font-medium text-gray-700">Personalized Nutrition & Medicine Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display text-blue-900 leading-tight">
              Diet Plan &
              <span className="text-blue-600 block">Medicine Guide</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Get personalized diet plans and medicine recommendations tailored to your specific treatment and recovery needs with Yasha Physiocare's expert guidance.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <SectionTitle
          title="Personalized Treatment Plan"
          subtitle="Select your treatment type and condition to get customized diet and medicine recommendations."
          center
        />

        {/* Selection Form */}
        <div className="max-w-2xl mx-auto mt-8 mb-12">
          <Card className="border-2 border-blue-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-blue-900 font-display">
                Treatment & Condition Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Treatment Type
                </label>
                <Select value={selectedTreatment} onValueChange={setSelectedTreatment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your treatment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {treatmentTypes.map((treatment) => (
                      <SelectItem key={treatment.value} value={treatment.value}>
                        {treatment.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Condition
                </label>
                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition.value} value={condition.value}>
                        {condition.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!selectedTreatment || !selectedCondition}
              >
                Generate My Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        {selectedTreatment && selectedCondition && (
          <div className="space-y-8">
            {/* Diet Plan Section */}
            <Card className="border-2 border-green-100 shadow-lg">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center text-green-800 font-display">
                  <Apple className="mr-3 h-6 w-6" />
                  Personalized Diet Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Foods to Include</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800">Anti-inflammatory Foods</p>
                          <p className="text-sm text-gray-600">Leafy greens, berries, fatty fish, turmeric</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800">Protein Sources</p>
                          <p className="text-sm text-gray-600">Lean meats, eggs, legumes, Greek yogurt</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800">Healthy Fats</p>
                          <p className="text-sm text-gray-600">Avocados, nuts, olive oil, seeds</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Foods to Avoid</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800">Processed Foods</p>
                          <p className="text-sm text-gray-600">Fast food, packaged snacks, sugary drinks</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800">Inflammatory Foods</p>
                          <p className="text-sm text-gray-600">Refined sugars, trans fats, excessive alcohol</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800">High Sodium Foods</p>
                          <p className="text-sm text-gray-600">Canned soups, processed meats, restaurant meals</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Sample Daily Meal Plan</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-blue-700">Breakfast</p>
                      <p className="text-gray-600">Oatmeal with berries and nuts</p>
                    </div>
                    <div>
                      <p className="font-medium text-blue-700">Lunch</p>
                      <p className="text-gray-600">Grilled salmon with quinoa and vegetables</p>
                    </div>
                    <div>
                      <p className="font-medium text-blue-700">Dinner</p>
                      <p className="text-gray-600">Lean chicken with sweet potato and greens</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medicine Recommendations */}
            <Card className="border-2 border-blue-100 shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center text-blue-800 font-display">
                  <Pill className="mr-3 h-6 w-6" />
                  Medicine Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-yellow-800">Important Disclaimer</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        These are general recommendations only. Always consult with your healthcare provider before starting any new medication or supplement regimen.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Supplements</h3>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-800">Omega-3 Fatty Acids</h4>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Anti-inflammatory
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Helps reduce inflammation and support recovery</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          1000mg daily with meals
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-800">Vitamin D3</h4>
                          <Badge variant="outline" className="text-blue-600 border-blue-600">
                            Bone Health
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Supports bone health and immune function</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          2000 IU daily
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-800">Magnesium</h4>
                          <Badge variant="outline" className="text-purple-600 border-purple-600">
                            Muscle Function
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Supports muscle function and reduces cramps</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          400mg before bedtime
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Pain Management</h3>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Topical Applications</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Arnica gel for bruising and swelling</li>
                          <li>• Menthol-based creams for muscle pain</li>
                          <li>• Capsaicin cream for chronic pain</li>
                        </ul>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">Natural Alternatives</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Turmeric supplements (curcumin)</li>
                          <li>• Ginger for inflammation</li>
                          <li>• Willow bark extract</li>
                        </ul>
                      </div>

                      <div className="border rounded-lg p-4 bg-red-50">
                        <h4 className="font-medium text-red-800 mb-2">Prescription Medications</h4>
                        <p className="text-sm text-red-700">
                          Any prescription pain medications, muscle relaxants, or anti-inflammatory drugs must be prescribed and monitored by your healthcare provider.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hydration & Lifestyle */}
            <Card className="border-2 border-vitality-100 shadow-lg">
              <CardHeader className="bg-vitality-50">
                <CardTitle className="text-vitality-800 font-display">
                  Hydration & Lifestyle Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Hydration</h3>
                    <p className="text-sm text-gray-600">
                      Drink 8-10 glasses of water daily. Add electrolytes if you're active or sweating heavily.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Meal Timing</h3>
                    <p className="text-sm text-gray-600">
                      Eat smaller, frequent meals every 3-4 hours to maintain energy and support healing.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Apple className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Quality Sleep</h3>
                    <p className="text-sm text-gray-600">
                      Aim for 7-9 hours of quality sleep to support recovery and healing processes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-vitality-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 font-display">
                Need Personalized Guidance?
              </h3>
              <p className="text-blue-100 mb-6">
                Consult with our nutrition specialists and physiotherapists for a customized plan tailored specifically to your needs.
              </p>
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Schedule Consultation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default DietPlan;
