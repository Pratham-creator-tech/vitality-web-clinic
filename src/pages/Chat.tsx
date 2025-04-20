
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { MessageCircle, Send, Paperclip, Image, FileText, Calendar } from "lucide-react";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  attachment_url?: string | null;
  created_at: string;
  sender_type: "patient" | "doctor";
}

const Chat = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [assignedDoctor, setAssignedDoctor] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    
    const fetchData = async () => {
      try {
        // For demo purposes, we'll use a placeholder doctor
        // In production, this would come from appointments or assignments
        const { data: doctorData, error: doctorError } = await supabase
          .from("doctors")
          .select("*")
          .limit(1)
          .single();
        
        if (doctorError && doctorError.code !== 'PGRST116') {
          throw doctorError;
        }
        
        if (doctorData) {
          setAssignedDoctor(doctorData);
          
          // Fetch messages between patient and this doctor
          const { data: messagesData, error: messagesError } = await supabase
            .from("chat_messages")
            .select("*")
            .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
            .order("created_at", { ascending: true });
          
          if (messagesError && messagesError.code !== 'PGRST116') {
            throw messagesError;
          }
          
          if (messagesData) {
            setMessages(messagesData);
          }
        } else {
          // No doctor assigned, we could show a message to book first
          setAssignedDoctor(null);
        }
      } catch (error: any) {
        console.error("Error fetching chat data:", error);
        toast.error("Error loading chat data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // For demo purposes, let's add some mock messages if none exist
    setTimeout(() => {
      if (messages.length === 0) {
        const mockMessages: Message[] = [
          {
            id: "1",
            sender_id: "doctor123",
            receiver_id: user.id,
            content: "Hello! How can I help you today?",
            created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            sender_type: "doctor"
          },
          {
            id: "2",
            sender_id: "doctor123",
            receiver_id: user.id,
            content: "I saw that you recently booked an appointment. Is there anything specific you'd like to discuss before we meet?",
            created_at: new Date(Date.now() - 82800000).toISOString(), // 23 hours ago
            sender_type: "doctor"
          }
        ];
        setMessages(mockMessages);
      }
    }, 1000);
  }, [user, navigate]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user || !assignedDoctor) return;
    
    setSending(true);
    
    try {
      // For demo purposes
      const mockMessage: Message = {
        id: Date.now().toString(),
        sender_id: user.id,
        receiver_id: assignedDoctor.id || "doctor123",
        content: newMessage,
        created_at: new Date().toISOString(),
        sender_type: "patient"
      };
      
      setMessages((prev) => [...prev, mockMessage]);
      setNewMessage("");
      
      // In a real app, we would save to Supabase
      // const { error } = await supabase.from("chat_messages").insert({
      //   sender_id: user.id,
      //   receiver_id: assignedDoctor.id,
      //   content: newMessage,
      //   sender_type: "patient"
      // });
      
      // if (error) throw error;
      
      // Simulate doctor response after 1-2 seconds
      setTimeout(() => {
        const responses = [
          "Thank you for your message. I'll review this and get back to you shortly.",
          "Thanks for sharing that. How has your pain been since our last session?",
          "I understand your concern. Let's discuss this more in our next session.",
          "Have you been doing the exercises I recommended?",
          "That's great progress! Keep up with the exercises."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const doctorReply: Message = {
          id: (Date.now() + 1).toString(),
          sender_id: assignedDoctor.id || "doctor123",
          receiver_id: user.id,
          content: randomResponse,
          created_at: new Date().toISOString(),
          sender_type: "doctor"
        };
        
        setMessages((prev) => [...prev, doctorReply]);
      }, Math.random() * 1000 + 1000);
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error("Error sending message. Please try again.");
    } finally {
      setSending(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-[500px] bg-gray-100 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-vitality-700">Chat with Your Physiotherapist</h1>
          
          <Tabs defaultValue="chat">
            <TabsList className="mb-6">
              <TabsTrigger value="chat">
                <MessageCircle className="mr-2 h-4 w-4" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="appointments">
                <Calendar className="mr-2 h-4 w-4" />
                Appointments
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat">
              <Card className="mb-6">
                <CardHeader className="border-b bg-muted/50">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-2">
                      <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                      <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {assignedDoctor ? assignedDoctor.full_name : "Dr. Sarah Rodriguez"}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {assignedDoctor ? assignedDoctor.specialization : "Sports Rehabilitation Specialist"}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[400px] overflow-y-auto p-4">
                    {messages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center">
                        <MessageCircle className="h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-gray-500 mb-2">No messages yet</p>
                        <p className="text-sm text-gray-400 mb-4">Start the conversation with your physiotherapist</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div 
                            key={message.id}
                            className={`flex ${message.sender_type === "patient" ? "justify-end" : "justify-start"}`}
                          >
                            {message.sender_type === "doctor" && (
                              <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                                <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                                <AvatarFallback>DR</AvatarFallback>
                              </Avatar>
                            )}
                            
                            <div 
                              className={`rounded-lg px-4 py-2 max-w-[75%] ${
                                message.sender_type === "patient" 
                                  ? "bg-vitality-600 text-white" 
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              <p>{message.content}</p>
                              {message.attachment_url && (
                                <a 
                                  href={message.attachment_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block mt-2 text-sm underline"
                                >
                                  View attachment
                                </a>
                              )}
                              <p className="text-xs opacity-70 mt-1">
                                {new Date(message.created_at).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                            
                            {message.sender_type === "patient" && (
                              <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                                <AvatarFallback>ME</AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t p-4">
                    <div className="flex items-end gap-2">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="min-h-[80px]"
                      />
                      <div className="flex flex-col gap-2">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="rounded-full" 
                          type="button"
                          disabled={sending}
                        >
                          <Paperclip className="h-4 w-4" />
                          <span className="sr-only">Attach file</span>
                        </Button>
                        <Button 
                          size="icon" 
                          className="rounded-full" 
                          type="button"
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim() || sending}
                        >
                          <Send className="h-4 w-4" />
                          <span className="sr-only">Send message</span>
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Image className="h-3 w-3 mr-1" />
                        Photo
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        Document
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <p className="text-sm text-gray-500 text-center">
                Messages are encrypted and secure. Your physiotherapist usually responds within 24 hours during business days.
              </p>
            </TabsContent>
            
            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Your Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No upcoming appointments</p>
                    <Button 
                      onClick={() => navigate("/booking")}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default Chat;
