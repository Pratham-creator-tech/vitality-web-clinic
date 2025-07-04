
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Send, Bot, User, Upload, FileText, Stethoscope, MessageCircle, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

type Message = {
  sender: "user" | "bot";
  message: string;
  timestamp: Date;
  type?: "text" | "file_analysis" | "doctor_recommendation";
  fileName?: string;
  recommendedDoctors?: any[];
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
      message: "Hello! I'm your enhanced AI Medical Assistant. I can help you with:\n\n• 📄 **File Analysis** - Upload medical reports, lab results, or documents for analysis\n• 👨‍⚕️ **Doctor Recommendations** - Get suggestions for specialists based on your needs\n• 💬 **General Questions** - Ask about health, treatments, or medical conditions\n\nHow can I assist you today?",
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
      const allowedTypes = ['text/plain', 'application/pdf', 'image/jpeg', 'image/png', 'text/csv'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Unsupported file type",
          description: "Please upload a PDF, image, text file, or CSV",
          variant: "destructive",
        });
        return;
      }
      
      setUploadedFile(file);
      setActiveTab("file-analysis");
      toast({
        title: "File uploaded",
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
      reader.readAsText(file);
    });
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

    // Add user message to conversation
    const userMessage = {
      sender: "user" as const,
      message: message.trim() || `Uploaded file: ${fileName}`,
      timestamp: new Date(),
      fileName: fileName || undefined,
      type: requestType as "text" | "file_analysis" | "doctor_recommendation",
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
          requestType,
        },
      });

      if (error) throw error;

      const botMessage: Message = {
        sender: "bot",
        message: data.response,
        timestamp: new Date(),
        type: requestType as "text" | "file_analysis" | "doctor_recommendation",
        recommendedDoctors: data.recommendedDoctors || [],
      };

      setConversation((prev) => [...prev, botMessage]);
      
      // Clear uploaded file after processing
      if (uploadedFile) {
        removeFile();
      }
      
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
      
      setConversation((prev) => [...prev, {
        sender: "bot",
        message: "I apologize, but I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice Input",
      description: "Voice recognition is coming soon!",
    });
  };

  const DoctorRecommendationCard = ({ doctor }: { doctor: any }) => (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Stethoscope className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{doctor.full_name}</h4>
            <p className="text-xs text-gray-600">{doctor.specialization}</p>
            <p className="text-xs text-gray-500 mt-1">{doctor.experience_years} years experience</p>
            {doctor.clinic_address && (
              <p className="text-xs text-gray-500 mt-1">{doctor.clinic_address}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`flex flex-col ${inDrawer ? 'h-[70vh]' : 'h-[700px]'}`}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
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
                    className={`flex items-start gap-2 max-w-[80%] ${
                      item.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`rounded-full p-2 ${
                        item.sender === "user"
                          ? "bg-vitality-400 text-white"
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
                      className={`py-2 px-4 rounded-2xl ${
                        item.sender === "user"
                          ? "bg-vitality-400 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <div className="space-y-2">
                        <p className="text-sm whitespace-pre-wrap">{item.message}</p>
                        {item.fileName && (
                          <Badge variant="secondary" className="text-xs">
                            📎 {item.fileName}
                          </Badge>
                        )}
                        {item.recommendedDoctors && item.recommendedDoctors.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <h4 className="text-sm font-semibold">Recommended Doctors:</h4>
                            {item.recommendedDoctors.map((doctor, idx) => (
                              <DoctorRecommendationCard key={idx} doctor={doctor} />
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-xs mt-1 opacity-70">
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
                      <Bot className="h-5 w-5 text-vitality-600" />
                    </div>
                    <div className="py-2 px-4 rounded-2xl bg-gray-100">
                      <p className="text-sm">Analyzing...</p>
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
              placeholder="Ask me anything about health or physiotherapy..."
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

        <TabsContent value="file-analysis" className="flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Medical File Analysis</h3>
            <p className="text-sm text-gray-600 mb-4">
              Upload medical reports, lab results, or documents for AI analysis
            </p>
            
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
                      PDF, Images, Text files (Max 5MB)
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png,.txt,.csv"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
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
              >
                <Send className="h-5 w-5 mr-2" />
                Analyze
              </Button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="doctor-recommendations" className="flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Find the Right Doctor</h3>
            <p className="text-sm text-gray-600 mb-4">
              Describe your symptoms or condition to get personalized doctor recommendations
            </p>
          </div>

          <div className="flex-1">
            <form onSubmit={(e) => sendMessage(e, "doctor_recommendation")} className="flex gap-2">
              <Input
                placeholder="Describe your symptoms or what type of specialist you need..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
                className="flex-1"
              />
              <Button type="submit" disabled={loading || !message.trim()}>
                <Stethoscope className="h-5 w-5 mr-2" />
                Find Doctors
              </Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedAIChat;
