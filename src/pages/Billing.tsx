
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import { CreditCard, CalendarClock, Clock, Shield, CreditCardIcon, CheckCircle } from "lucide-react";

const paymentMethodSchema = z.object({
  cardholderName: z.string().min(2, {
    message: "Cardholder name must be at least 2 characters.",
  }),
  cardNumber: z.string().regex(/^\d{16}$/, {
    message: "Please enter a valid 16-digit card number.",
  }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, {
    message: "Please enter a valid expiry date (MM/YY).",
  }),
  cvv: z.string().regex(/^\d{3,4}$/, {
    message: "Please enter a valid security code.",
  }),
});

type PaymentMethodFormValues = z.infer<typeof paymentMethodSchema>;

const Billing = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PaymentMethodFormValues>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit = async (data: PaymentMethodFormValues) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Payment method added",
        description: "Your payment method has been added successfully.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error adding payment method:", error);
      toast({
        title: "Failed to add payment method",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] ? matches[0] : "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  return (
    <PageLayout>
      <div className="container py-10">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
              <p className="text-muted-foreground">
                Manage your subscription, payment methods, and billing history.
              </p>
            </div>
            <Separator />
            
            <Tabs defaultValue="subscription" className="space-y-6">
              <TabsList>
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
                <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
                <TabsTrigger value="billing-history">Billing History</TabsTrigger>
              </TabsList>
              
              {/* Subscription Tab */}
              <TabsContent value="subscription" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Current Plan</CardTitle>
                    <CardDescription>
                      View and manage your current subscription plan.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <h3 className="font-medium text-lg flex items-center gap-2">
                            Free Plan
                            <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                              Active
                            </Badge>
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Basic access to physiotherapy resources
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-lg">$0</p>
                          <p className="text-sm text-muted-foreground">Forever free</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">What's included:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            Access to patient portal
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            Appointment booking
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            Basic pain tracking
                          </li>
                          <li className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-5 w-5" />
                            <span className="line-through">Exercise library access</span>
                          </li>
                          <li className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-5 w-5" />
                            <span className="line-through">Personalized treatment plans</span>
                          </li>
                          <li className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-5 w-5" />
                            <span className="line-through">Telehealth consultations</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between flex-col sm:flex-row gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Want more features? Upgrade to Premium.
                      </p>
                    </div>
                    <Button>Upgrade Plan</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Available Plans</CardTitle>
                    <CardDescription>
                      Choose a plan that fits your needs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Premium Plan */}
                      <Card>
                        <CardHeader className="bg-muted/50">
                          <CardTitle>Premium Plan</CardTitle>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold">$19.99</span>
                            <span className="text-muted-foreground">/month</span>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6">
                          <ul className="space-y-2 mb-6">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                              <span>Everything in Free plan</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                              <span>Full exercise library access</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                              <span>Personalized recovery plans</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                              <span>Advanced progress tracking</span>
                            </li>
                          </ul>
                          <Button className="w-full">Select Plan</Button>
                        </CardContent>
                      </Card>
                      
                      {/* Pro Plan */}
                      <Card>
                        <CardHeader className="bg-vitality-100/50 dark:bg-vitality-900/30">
                          <CardTitle className="text-vitality-700 dark:text-vitality-300">Pro Plan</CardTitle>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold">$39.99</span>
                            <span className="text-muted-foreground">/month</span>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6">
                          <ul className="space-y-2 mb-6">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                              <span>Everything in Premium plan</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                              <span>Monthly telehealth consultations</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                              <span>AI-powered exercise recommendations</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                              <span>Priority booking & support</span>
                            </li>
                          </ul>
                          <Button className="w-full bg-vitality-600 hover:bg-vitality-700">Select Plan</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Payment Methods Tab */}
              <TabsContent value="payment-methods" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Payment Methods</CardTitle>
                    <CardDescription>
                      Your saved payment methods for automatic billing.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center py-6 border-dashed border-2 rounded-md">
                        <CreditCardIcon className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No payment methods saved yet</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Add Payment Method</CardTitle>
                    <CardDescription>
                      Add a new credit or debit card.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="cardholderName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cardholder Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field: { onChange, ...rest } }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    placeholder="1234 5678 9012 3456" 
                                    className="pl-10" 
                                    onChange={(e) => {
                                      const formatted = formatCardNumber(e.target.value);
                                      e.target.value = formatted;
                                      onChange(e);
                                    }}
                                    maxLength={19}
                                    {...rest}
                                  />
                                  <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input 
                                      placeholder="MM/YY" 
                                      className="pl-10" 
                                      maxLength={5}
                                      {...field}
                                    />
                                    <CalendarClock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Security Code (CVV)</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input 
                                      placeholder="123" 
                                      className="pl-10" 
                                      maxLength={4}
                                      {...field}
                                    />
                                    <Shield className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="flex justify-end">
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Adding..." : "Add Payment Method"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Billing History Tab */}
              <TabsContent value="billing-history" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>
                      View your past invoices and payments.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No billing history yet</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Billing;
