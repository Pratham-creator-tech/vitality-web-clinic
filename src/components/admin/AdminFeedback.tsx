import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const AdminFeedback = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const feedbacks = [
    { id: 1, name: "John Doe", email: "john@example.com", type: "Bug Report", message: "The booking form is not working properly", status: "unread", date: "2024-01-25" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", type: "Feature Request", message: "Please add dark mode support", status: "read", date: "2024-01-24" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", type: "General", message: "Great service! Very satisfied", status: "resolved", date: "2024-01-23" },
  ];

  const filteredFeedbacks = feedbacks.filter(feedback =>
    feedback.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feedback.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feedback.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      unread: "bg-red-100 text-red-800 border-red-300",
      read: "bg-yellow-100 text-yellow-800 border-yellow-300",
      resolved: "bg-green-100 text-green-800 border-green-300"
    };
    return variants[status as keyof typeof variants] || variants.unread;
  };

  const handleMarkAsRead = (feedbackId: number) => {
    toast({
      title: "Marked as Read",
      description: "Feedback has been marked as read.",
    });
  };

  const handleResolve = (feedbackId: number) => {
    toast({
      title: "Resolved",
      description: "Feedback has been marked as resolved.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Feedback</CardTitle>
        <CardDescription>Moderate and respond to user feedback</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search feedback..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeedbacks.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell className="font-medium">{feedback.name}</TableCell>
                  <TableCell>{feedback.email}</TableCell>
                  <TableCell>{feedback.type}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(feedback.status)}>
                      {feedback.status === "unread" && <AlertCircle className="h-3 w-3 mr-1" />}
                      {feedback.status === "resolved" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {feedback.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{feedback.date}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Feedback Details</DialogTitle>
                          <DialogDescription>
                            From {feedback.name} ({feedback.email})
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Message</label>
                            <p className="text-sm text-muted-foreground mt-1">{feedback.message}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Admin Notes</label>
                            <Textarea placeholder="Add notes..." className="mt-1" />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={() => handleMarkAsRead(feedback.id)} variant="outline">
                              Mark as Read
                            </Button>
                            <Button onClick={() => handleResolve(feedback.id)}>
                              Resolve
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};