import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare } from "lucide-react";

interface Contact {
  id: number;
  name: string;
  image?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  role: "doctor" | "patient";
}

const ChatPage = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      image: "/lovable-uploads/2eff2a62-2c07-4abe-8845-55eaef425bf8.png",
      lastMessage: "Your next appointment is scheduled",
      timestamp: "10:30 AM",
      unread: 2,
      role: "doctor",
    },
    {
      id: 2,
      name: "John Doe",
      lastMessage: "Thank you for the consultation",
      timestamp: "Yesterday",
      unread: 0,
      role: "patient",
    },
    {
      id: 3,
      name: "Dr. Michael Chen",
      image: "/lovable-uploads/5fe8659c-63e7-4701-b556-50528d1f2471.png",
      lastMessage: "Follow-up exercises shared",
      timestamp: "2 days ago",
      unread: 1,
      role: "doctor",
    },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Conversations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-4 cursor-pointer hover:bg-muted/50 border-b transition-colors ${
                      selectedContact?.id === contact.id ? "bg-muted" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={contact.image} />
                        <AvatarFallback>{contact.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm truncate">{contact.name}</p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {contact.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">
                            {contact.lastMessage}
                          </p>
                          {contact.unread > 0 && (
                            <Badge variant="default" className="ml-2 shrink-0">
                              {contact.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            {selectedContact ? (
              <ChatWindow
                recipientName={selectedContact.name}
                recipientImage={selectedContact.image}
              />
            ) : (
              <Card className="h-[600px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p>Select a conversation to start messaging</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatPage;