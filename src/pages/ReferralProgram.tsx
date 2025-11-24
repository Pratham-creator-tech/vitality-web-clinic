import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Gift, Copy, Users, DollarSign, CheckCircle } from "lucide-react";
import { format } from "date-fns";

const ReferralProgram = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [patientId, setPatientId] = useState<string | null>(null);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [totalRewards, setTotalRewards] = useState(0);
  const [referralCode, setReferralCode] = useState("");
  const [formData, setFormData] = useState({
    refereeName: "",
    refereeEmail: "",
  });

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const { data: patient } = await supabase
        .from("patients")
        .select("id")
        .eq("user_id", user?.id)
        .single();

      if (!patient) return;

      setPatientId(patient.id);

      // Fetch referrals
      const { data: referralsData } = await supabase
        .from("referrals")
        .select("*")
        .eq("referrer_id", patient.id)
        .order("created_at", { ascending: false });

      setReferrals(referralsData || []);

      // Calculate total rewards
      const claimed = referralsData?.filter(r => r.reward_status === 'claimed')
        .reduce((sum, r) => sum + Number(r.reward_amount), 0) || 0;
      setTotalRewards(claimed);

      // Generate personal referral code
      setReferralCode(`REF${patient.id.slice(0, 8).toUpperCase()}`);

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReferral = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientId) return;

    try {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // 30 days expiry

      const { error } = await supabase
        .from("referrals")
        .insert({
          referrer_id: patientId,
          referee_name: formData.refereeName,
          referee_email: formData.refereeEmail,
          referral_code: `${referralCode}-${Date.now()}`,
          reward_amount: 50, // $50 reward
          expires_at: expiresAt.toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Referral sent!",
        description: "Your friend will receive an invitation email",
      });

      setFormData({ refereeName: "", refereeEmail: "" });
      fetchData();

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}/signup?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      expired: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Referral Program</h1>
          <p className="text-muted-foreground">
            Share the gift of health and earn rewards
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referrals.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Successful</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {referrals.filter(r => r.status === 'completed').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRewards}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Referral Form */}
          <Card>
            <CardHeader>
              <CardTitle>Refer a Friend</CardTitle>
              <CardDescription>
                Both you and your friend get $50 off your next treatment!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateReferral} className="space-y-4">
                <div>
                  <Label htmlFor="refereeName">Friend's Name</Label>
                  <Input
                    id="refereeName"
                    value={formData.refereeName}
                    onChange={(e) => setFormData({ ...formData, refereeName: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="refereeEmail">Friend's Email</Label>
                  <Input
                    id="refereeEmail"
                    type="email"
                    value={formData.refereeEmail}
                    onChange={(e) => setFormData({ ...formData, refereeEmail: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Gift className="mr-2 h-4 w-4" />
                  Send Referral
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm font-semibold mb-2">Your Referral Link:</p>
                <div className="flex gap-2">
                  <Input
                    value={`${window.location.origin}/signup?ref=${referralCode}`}
                    readOnly
                    className="flex-1"
                  />
                  <Button onClick={copyReferralLink} size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Share Your Link</h3>
                    <p className="text-sm text-muted-foreground">
                      Send your unique referral link to friends and family
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">They Sign Up</h3>
                    <p className="text-sm text-muted-foreground">
                      Your friend creates an account and books their first appointment
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Earn Rewards</h3>
                    <p className="text-sm text-muted-foreground">
                      Both of you receive $50 off your next treatment!
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm font-semibold mb-2">🎁 Bonus Benefits:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Unlimited referrals</li>
                    <li>• Rewards never expire</li>
                    <li>• Stack multiple rewards</li>
                    <li>• Help friends discover quality care</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Referral History */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Referral History</CardTitle>
          </CardHeader>
          <CardContent>
            {referrals.length === 0 ? (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No referrals yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {referrals.map((referral) => (
                  <div key={referral.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-semibold">{referral.referee_name}</p>
                      <p className="text-sm text-muted-foreground">{referral.referee_email}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Sent: {format(new Date(referral.created_at), "PP")}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(referral.status)}`}>
                        {referral.status}
                      </span>
                      {referral.status === 'completed' && (
                        <p className="text-sm font-semibold text-green-600 mt-1">
                          ${referral.reward_amount} earned
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ReferralProgram;