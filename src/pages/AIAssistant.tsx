
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { SectionTitle } from "@/components/ui/section-title";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Send, Bot, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AIAssistant = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<{
    sender: "user" | "bot";
    message: string;
    timestamp: Date;
  }[]>([
    {
      sender: "bot",
      message: "Hello! I'm your Vitality Physio AI Assistant. How can I help you today? You can ask me about our services, common injuries, rehabilitation exercises, or book an appointment.",
      timestamp: new Date(),
    },
  ]);
  const { toast } = useToast();

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to conversation
    const userMessage = {
      sender: "user" as const,
      message: message.trim(),
      timestamp: new Date(),
    };
    
    setConversation((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      // In a real implementation, this would be an API call to a language model
      // Simulating AI response with predefined answers based on keywords
      let botResponse = "I'm not sure how to help with that. Could you try asking something about our physiotherapy services or common injuries?";
      
      const userQuery = userMessage.message.toLowerCase();
      
      if (userQuery.includes("appointment") || userQuery.includes("book") || userQuery.includes("schedule")) {
        botResponse = "I'd be happy to help you book an appointment! You can visit our booking page at /booking, or would you like me to guide you through the process?";
      } else if (userQuery.includes("service") || userQuery.includes("treatment") || userQuery.includes("therapy")) {
        botResponse = "We offer a variety of services including Sports Rehabilitation, Manual Therapy, Post-Surgical Rehabilitation, Chronic Pain Management, Neurological Rehabilitation, and Strength & Conditioning. Would you like to know more about any specific service?";
      } else if (userQuery.includes("price") || userQuery.includes("cost") || userQuery.includes("fee")) {
        botResponse = "Our pricing varies depending on the service and treatment duration. For a detailed breakdown, please check our pricing page at /pricing. We also accept most insurance plans.";
      } else if (userQuery.includes("location") || userQuery.includes("address") || userQuery.includes("where")) {
        botResponse = "Our main clinic is located at 123 Wellness Street, Health City. We also have satellite locations throughout the metropolitan area. You can find all our locations on the contact page.";
      } else if (userQuery.includes("injury") || userQuery.includes("pain") || userQuery.includes("hurt")) {
        botResponse = "I'm sorry to hear you're experiencing pain. While I can provide general information, it's best to consult with one of our physiotherapists for a proper assessment. Would you like to schedule a consultation?";
      } else if (userQuery.includes("exercise") || userQuery.includes("stretch") || userQuery.includes("workout")) {
        botResponse = "Exercise is a crucial part of physiotherapy. Our therapists create personalized exercise programs based on your specific needs and conditions. Would you like some general tips for staying active?";
      } else if (userQuery.includes("hello") || userQuery.includes("hi") || userQuery.includes("hey")) {
        botResponse = "Hello there! How can I assist you with your physiotherapy needs today?";
      } else if (userQuery.includes("thank")) {
        botResponse = "You're welcome! Is there anything else I can help you with today?";
      }
      
      // Add bot response to conversation after a small delay to simulate thinking
      setTimeout(() => {
        setConversation((prev) => [
          ...prev,
          {
            sender: "bot",
            message: botResponse,
            timestamp: new Date(),
          },
        ]);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice Input",
      description: "Voice recognition is coming soon!",
    });
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title="AI Assistant"
          subtitle="Get instant answers to your physiotherapy questions and concerns."
          center
        />

        <div className="max-w-4xl mx-auto mt-8">
          <Card className="border-2 border-vitality-100">
            <CardContent className="p-6">
              <div className="flex flex-col h-[600px]">
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
                            item.sender === "user"
                              ? "flex-row-reverse"
                              : "flex-row"
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
                            <p className="text-sm">{item.message}</p>
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
                    {loading && (
                      <div className="flex justify-start">
                        <div className="flex items-start gap-2">
                          <div className="rounded-full p-2 bg-vitality-100">
                            <Bot className="h-5 w-5 text-vitality-600" />
                          </div>
                          <div className="py-2 px-4 rounded-2xl bg-gray-100">
                            <p className="text-sm">Typing...</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <form onSubmit={sendMessage} className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleVoiceInput}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type your message here..."
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default AIAssistant;
