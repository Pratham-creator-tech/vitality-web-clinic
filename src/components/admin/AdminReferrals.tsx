import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Gift, CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

export const AdminReferrals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const referrals = [
    { id: 1, referrer: "John Doe", referee: "Jane Smith", code: "REF123", status: "completed", reward: "$50", date: "2024-01-20" },
    { id: 2, referrer: "Alice Johnson", referee: "Bob Wilson", code: "REF456", status: "pending", reward: "$50", date: "2024-01-22" },
    { id: 3, referrer: "Charlie Brown", referee: "Diana Prince", code: "REF789", status: "paid", reward: "$50", date: "2024-01-18" },
  ];

  const filteredReferrals = referrals.filter(referral =>
    referral.referrer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    referral.referee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    referral.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      completed: "bg-blue-100 text-blue-800 border-blue-300",
      paid: "bg-green-100 text-green-800 border-green-300"
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const handleApproveReward = (referralId: number) => {
    toast({
      title: "Reward Approved",
      description: "Referral reward has been approved for payment.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Referral Management</CardTitle>
        <CardDescription>Manage referrals and reward payments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search referrals..."
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
                <TableHead>Referrer</TableHead>
                <TableHead>Referee</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reward</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReferrals.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell className="font-medium">{referral.referrer}</TableCell>
                  <TableCell>{referral.referee}</TableCell>
                  <TableCell className="font-mono text-sm">{referral.code}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(referral.status)}>
                      {referral.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{referral.reward}</TableCell>
                  <TableCell>{referral.date}</TableCell>
                  <TableCell className="text-right">
                    {referral.status === "completed" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleApproveReward(referral.id)}
                      >
                        <Gift className="h-4 w-4 mr-2" />
                        Approve Payment
                      </Button>
                    )}
                    {referral.status === "paid" && (
                      <span className="text-sm text-green-600 flex items-center justify-end">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Paid
                      </span>
                    )}
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