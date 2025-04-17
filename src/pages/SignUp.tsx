
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, User, UserPlus } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  userType: z.enum(["patient", "doctor"]),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "patient",
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      
      // Register with Supabase and set role in metadata
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            role: data.userType, // This will be used by our database trigger
          }
        }
      });

      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        console.error("Registration error:", error);
        return;
      }

      // Make sure we have a user ID before proceeding
      if (!authData.user) {
        toast({
          title: "Registration failed",
          description: "Unable to create user profile. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const userId = authData.user.id;

      // Create the profile in the appropriate table
      if (data.userType === "patient") {
        const { error: profileError } = await supabase
          .from('patients')
          .insert({
            full_name: data.fullName,
            email: data.email,
            user_id: userId  // Add the user_id here
          });
          
        if (profileError) {
          toast({
            title: "Profile creation failed",
            description: profileError.message,
            variant: "destructive",
          });
          console.error("Patient profile creation error:", profileError);
          return;
        }
      } else if (data.userType === "doctor") {
        const { error: profileError } = await supabase
          .from('doctors')
          .insert({
            full_name: data.fullName,
            email: data.email,
            user_id: userId  // Add the user_id here
          });
          
        if (profileError) {
          toast({
            title: "Profile creation failed",
            description: profileError.message,
            variant: "destructive",
          });
          console.error("Doctor profile creation error:", profileError);
          return;
        }
      }

      toast({
        title: "Account created successfully",
        description: "Welcome to Vitality Physio! Please check your email to confirm your account.",
      });
      
      // Navigate to profile page after successful registration
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      console.error("Unexpected error during registration:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout className="bg-gray-50 py-12">
      <div className="container max-w-md mx-auto px-4">
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-2 text-center pb-2">
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>
              Sign up for Vitality Physio to book appointments and access personalized care
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                            className="pl-10"
                            disabled={isLoading}
                          />
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="your.email@example.com" 
                            {...field} 
                            className="pl-10"
                            disabled={isLoading}
                          />
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className="pl-10 pr-10"
                            disabled={isLoading}
                          />
                          <UserPlus className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className="pl-10 pr-10"
                            disabled={isLoading}
                          />
                          <UserPlus className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={isLoading}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>I am a</FormLabel>
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant={field.value === "patient" ? "default" : "outline"}
                          className={field.value === "patient" ? "bg-vitality-400 hover:bg-vitality-500" : ""}
                          onClick={() => form.setValue("userType", "patient")}
                          disabled={isLoading}
                        >
                          Patient
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === "doctor" ? "default" : "outline"}
                          className={field.value === "doctor" ? "bg-vitality-400 hover:bg-vitality-500" : ""}
                          onClick={() => form.setValue("userType", "doctor")}
                          disabled={isLoading}
                        >
                          Doctor/Therapist
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal text-sm">
                          I accept the <Link to="/terms-of-service" className="text-vitality-400 hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-vitality-400 hover:underline">Privacy Policy</Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-vitality-400 hover:bg-vitality-500"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="text-sm text-center pt-0">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-vitality-400 hover:text-vitality-500">
              Sign In
            </Link>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
};

export default SignUp;
