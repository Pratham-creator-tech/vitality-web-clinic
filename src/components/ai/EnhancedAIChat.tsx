import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Send, Bot, User, Upload, FileText, Stethoscope, MessageCircle, X, Calendar, Phone, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

type Message = {
  sender: "user" | "bot";
  message: string;
  timestamp: Date;
  type?: "text" | "file_analysis" | "doctor_recommendation" | "appointment_booking";
  fileName?: string;
  recommendedDoctors?: any[];
  isDemoMode?: boolean;
};

type EnhancedAIChatProps = {
  inDrawer?: boolean;
};

const EnhancedAIChat = ({ inDrawer = false }: EnhancedAIChatProps) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [conversation, setConversation] = useState<Message[]>([
    {
      sender: "bot",
      message: "Hello! I'm your enhanced AI Medical Assistant for Yasha Physiocare. I can help you with:\n\n📄 **File Analysis** - Upload medical reports, lab results, or documents for comprehensive analysis\n👨‍⚕️ **Doctor Recommendations** - Get personalized suggestions for specialists based on your symptoms\n📅 **Appointment Booking** - Schedule consultations with our physiotherapy team\n💬 **General Questions** - Ask about health, treatments, exercises, and medical conditions\n\n**Available Services:**\n• Sports Rehabilitation\n• Manual Therapy\n• Post-Surgical Rehabilitation\n• Chronic Pain Management\n• Neurological Rehabilitation\n• Strength & Conditioning\n\nHow can I assist with your healthcare needs today?",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      // Check file type
      const allowedTypes = ['text/plain', 'application/pdf', 'image/jpeg', 'image/png', 'text/csv', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Unsupported file type",
          description: "Please upload a PDF, image, text file, CSV, or Word document",
          variant: "destructive",
        });
        return;
      }
      
      setUploadedFile(file);
      setActiveTab("file-analysis");
      toast({
        title: "File uploaded successfully",
        description: `${file.name} is ready for analysis`,
      });
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      
      // Handle different file types
      if (file.type.includes('image')) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    });
  };

  const detectRequestType = (message: string, currentTab: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // If we're in a specific tab, use that unless overridden
    if (currentTab === "file-analysis" && uploadedFile) {
      return "file_analysis";
    }
    if (currentTab === "doctor-recommendations") {
      return "doctor_recommendation";
    }
    
    // Auto-detect based on message content
    if (lowerMessage.includes("book") || lowerMessage.includes("appointment") || lowerMessage.includes("schedule")) {
      return "appointment_booking";
    }
    if (lowerMessage.includes("doctor") || lowerMessage.includes("specialist") || lowerMessage.includes("recommend")) {
      return "doctor_recommendation";
    }
    if (lowerMessage.includes("analyze") || lowerMessage.includes("report") || uploadedFile) {
      return "file_analysis";
    }
    
    return "general";
  };

  const sendMessage = async (e?: React.FormEvent, requestType: string = "general") => {
    if (e) e.preventDefault();
    
    if (!message.trim() && !uploadedFile) return;
    
    let fileContent = '';
    let fileName = '';
    
    if (uploadedFile) {
      try {
        fileContent = await readFileContent(uploadedFile);
        fileName = uploadedFile.name;
      } catch (error) {
        toast({
          title: "Error reading file",
          description: "Could not read the uploaded file",
          variant: "destructive",
        });
        return;
      }
    }

    // Auto-detect request type if not specified
    const detectedRequestType = requestType === "general" ? detectRequestType(message, activeTab) : requestType;

    // Add user message to conversation
    const userMessage = {
      sender: "user" as const,
      message: message.trim() || `Uploaded file: ${fileName}`,
      timestamp: new Date(),
      fileName: fileName || undefined,
      type: detectedRequestType as "text" | "file_analysis" | "doctor_recommendation" | "appointment_booking",
    };
    
    setConversation((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          message: message.trim(),
          fileContent,
          fileName,
          requestType: detectedRequestType,
        },
      });

      if (error) throw error;

      const botMessage: Message = {
        sender: "bot",
        message: data.response,
        timestamp: new Date(),
        type: detectedRequestType as "text" | "file_analysis" | "doctor_recommendation" | "appointment_booking",
        recommendedDoctors: data.recommendedDoctors || [],
        isDemoMode: data.isDemoMode || false,
      };

      setConversation((prev) => [...prev, botMessage]);
      
      // Clear uploaded file after processing
      if (uploadedFile) {
        removeFile();
      }
      
      // Show success message for specific request types
      if (detectedRequestType === 'appointment_booking') {
        toast({
          title: "Booking Assistance",
          description: "I've provided booking guidance. Ready to schedule your appointment?",
        });
      }
      
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "AI Assistant Temporarily Unavailable",
        description: "Please try again or contact us directly at (123) 456-7890",
        variant: "destructive",
      });
      
      setConversation((prev) => [...prev, {
        sender: "bot",
        message: "I apologize for the temporary inconvenience. For immediate assistance:\n\n📞 **Call:** (123) 456-7890\n📧 **Email:** appointments@yashaphysiocare.com\n🌐 **Online Booking:** Available 24/7\n\nOur team is ready to help with your healthcare needs!",
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice Input",
      description: "Voice recognition feature coming soon!",
    });
  };

  const handleBookAppointment = () => {
    window.open('/booking', '_blank');
  };

  const DoctorRecommendationCard = ({ doctor }: { doctor: any }) => (
    <Card className="mb-3 border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Stethoscope className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-base text-gray-900">{doctor.full_name}</h4>
            <p className="text-sm text-blue-600 font-medium">{doctor.specialization}</p>
            <p className="text-sm text-gray-600 mt-1">{doctor.experience_years} years experience</p>
            {doctor.clinic_address && (
              <p className="text-sm text-gray-500 mt-1 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {doctor.clinic_address}
              </p>
            )}
            <div className="flex gap-2 mt-2">
              <Button size="sm" onClick={handleBookAppointment} className="bg-vitality-600 hover:bg-vitality-700">
                <Calendar className="h-4 w-4 mr-1" />
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`flex flex-col ${inDrawer ? 'h-[70vh]' : 'h-[700px]'}`}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="file-analysis" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            File Analysis
          </TabsTrigger>
          <TabsTrigger value="doctor-recommendations" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Find Doctors
          </TabsTrigger>
          <TabsTrigger value="booking" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Book Appointment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 pr-4 mb-4">
            <div className="space-y-4">
              {conversation.map((item, index) => (
                <div
                  key={index}
                  className={`flex ${
                    item.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[85%] ${
                      item.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`rounded-full p-2 ${
                        item.sender === "user"
                          ? "bg-vitality-500 text-white"
                          : "bg-vitality-100"
                      }`}
                    >
                      {item.sender === "user" ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Bot className="h-5 w-5 text-vitality-600" />
                      )}
                    </div>
                    <div
                      className={`py-3 px-4 rounded-2xl ${
                        item.sender === "user"
                          ? "bg-vitality-500 text-white"
                          : "bg-gray-50 border"
                      }`}
                    >
                      <div className="space-y-3">
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{item.message}</p>
                        {item.fileName && (
                          <Badge variant="secondary" className="text-xs">
                            📎 {item.fileName}
                          </Badge>
                        )}
                        {item.isDemoMode && (
                          <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                            🔄 Demo Mode
                          </Badge>
                        )}
                        {item.recommendedDoctors && item.recommendedDoctors.length > 0 && (
                          <div className="mt-4 space-y-3">
                            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                              <Stethoscope className="h-4 w-4" />
                              Recommended Doctors:
                            </h4>
                            {item.recommendedDoctors.map((doctor, idx) => (
                              <DoctorRecommendationCard key={idx} doctor={doctor} />
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-xs mt-2 opacity-70">
                        {item.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full p-2 bg-vitality-100">
                      <Bot className="h-5 w-5 text-vitality-600 animate-pulse" />
                    </div>
                    <div className="py-3 px-4 rounded-2xl bg-gray-50 border">
                      <p className="text-sm text-gray-600">Analyzing your request...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={(e) => sendMessage(e, "general")} className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleVoiceInput}
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Ask about health, book appointments, analyze files, or find doctors..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              className="flex-1"
            />
            <Button type="submit" disabled={loading || !message.trim()}>
              <Send className="h-5 w-5 mr-2" />
              Send
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="file-analysis" className="flex-1 flex flex-col space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-blue-900">Medical File Analysis</h3>
            <p className="text-sm text-blue-700">
              Upload medical reports, lab results, or documents for comprehensive AI analysis
            </p>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {uploadedFile ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-sm font-medium">Upload a medical file</p>
                  <p className="text-xs text-gray-500">
                    PDF, Images, Text files, Word docs (Max 5MB)
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png,.txt,.csv,.doc,.docx"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  Choose File
                </Button>
              </div>
            )}
          </div>

          <form onSubmit={(e) => sendMessage(e, "file_analysis")} className="flex gap-2">
            <Input
              placeholder="Ask questions about your uploaded file..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={loading || (!message.trim() && !uploadedFile)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-5 w-5 mr-2" />
              Analyze
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="doctor-recommendations" className="flex-1 flex flex-col space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-green-900">Find the Right Doctor</h3>
            <p className="text-sm text-green-700">
              Describe your symptoms or condition to get personalized doctor recommendations
            </p>
          </div>

          <form onSubmit={(e) => sendMessage(e, "doctor_recommendation")} className="flex gap-2">
            <Input
              placeholder="Describe your symptoms or what type of specialist you need..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={loading || !message.trim()}
              className="bg-green-600 hover:bg-green-700"
            >
              <Stethoscope className="h-5 w-5 mr-2" />
              Find Doctors
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="booking" className="flex-1 flex flex-col space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-purple-900">Book Your Appointment</h3>
            <p className="text-sm text-purple-700">
              Schedule a consultation with our physiotherapy team or get booking assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-purple-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Direct Booking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Use our online booking system to schedule your appointment instantly
                </p>
                <Button onClick={handleBookAppointment} className="w-full bg-purple-600 hover:bg-purple-700">
                  Book Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Phone className="h-5 w-5 text-purple-600" />
                  Contact Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  (123) 456-7890
                </p>
                <p className="text-sm flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  appointments@yashaphysiocare.com
                </p>
              </CardContent>
            </Card>
          </div>

          <form onSubmit={(e) => sendMessage(e, "appointment_booking")} className="flex gap-2">
            <Input
              placeholder="Ask about booking assistance, available services, or scheduling..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={loading || !message.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Get Help
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedAIChat;
