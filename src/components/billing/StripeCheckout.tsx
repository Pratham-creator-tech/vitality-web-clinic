import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, Loader2 } from "lucide-react";

interface StripeCheckoutProps {
  amount: number;
  description: string;
  onSuccess?: () => void;
}

export const StripeCheckout = ({ amount, description, onSuccess }: StripeCheckoutProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    setLoading(true);
    
    // TODO: Integrate with Stripe when API key is available
    // This is a placeholder structure for Stripe integration
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Payment Integration Required",
        description: "Please configure Stripe API key to enable payments.",
        variant: "destructive",
      });
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total Amount:</span>
            <span>${amount.toFixed(2)}</span>
          </div>
          
          <Button 
            onClick={handleCheckout} 
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay with Stripe
              </>
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            Secure payment powered by Stripe
          </p>
        </div>
      </CardContent>
    </Card>
  );
};