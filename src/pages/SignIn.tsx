
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LogIn, Mail, User, UserPlus } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";

// Sign In Form Schema
const signInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

// Sign Up Form Schema
const signUpFormSchema = z.object({
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

type SignInFormValues = z.infer<typeof signInFormSchema>;
type SignUpFormValues = z.infer<typeof signUpFormSchema>;

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Sign In Form
  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Sign Up Form
  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "patient",
      termsAccepted: false,
    },
  });

  // Sign In Submit Handler
  const onSignInSubmit = async (data: SignInFormValues) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        console.error("Sign in error:", error);
        return;
      }

      toast({
        title: "Sign in successful",
        description: "Welcome back to YASHA's Physiocare!",
      });
      
      navigate("/profile");
    } catch (error) {
      console.error("Unexpected error during sign in:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sign Up Submit Handler
  const onSignUpSubmit = async (data: SignUpFormValues) => {
    try {
      setIsLoading(true);
      
      // If user selected doctor/therapist, redirect to the doctor registration page
      if (data.userType === "doctor") {
        // Store form data in session storage to use it on the registration page
        sessionStorage.setItem('doctorSignupData', JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          password: data.password
        }));
        
        toast({
          title: "Doctor Registration Required",
          description: "Please complete your registration as a doctor.",
        });
        
        // Redirect to the doctor registration page
        navigate("/doctor-registration");
        return;
      }
      
      // Continue with patient registration
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

      // Create the patient profile
      const { error: profileError } = await supabase
        .from('patients')
        .insert({
          user_id: userId,
          full_name: data.fullName,
          email: data.email
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

      toast({
        title: "Account created successfully",
        description: "Welcome to YASHA's Physiocare! Please check your email to confirm your account.",
      });
      
      // Navigate to signin page after successful registration
      setActiveTab("signin");
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
    <PageLayout className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container max-w-md mx-auto px-4">
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-2 text-center pb-2">
            <CardTitle className="text-2xl font-bold">Welcome to YASHA's Physiocare</CardTitle>
            <CardDescription>
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="signin" 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              {/* Sign In Tab Content */}
              <TabsContent value="signin">
                <Form {...signInForm}>
                  <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-6">
                    <FormField
                      control={signInForm.control}
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
                      control={signInForm.control}
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
                                className="pr-10 pl-10"
                                disabled={isLoading}
                              />
                              <LogIn className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
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
                    <div className="text-right text-sm">
                      <Link to="#" className="text-vitality-600 hover:text-vitality-700 dark:text-vitality-400 dark:hover:text-vitality-300">
                        Forgot password?
                      </Link>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-vitality-600 hover:bg-vitality-700 text-white dark:bg-vitality-500 dark:hover:bg-vitality-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                  Don't have an account?{" "}
                  <Button 
                    variant="link" 
                    className="text-vitality-600 hover:text-vitality-700 dark:text-vitality-400 dark:hover:text-vitality-300 p-0"
                    onClick={() => setActiveTab("signup")}
                  >
                    Sign Up
                  </Button>
                </div>
              </TabsContent>
              
              {/* Sign Up Tab Content */}
              <TabsContent value="signup">
                <Form {...signUpForm}>
                  <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-5">
                    <FormField
                      control={signUpForm.control}
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
                      control={signUpForm.control}
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
                      control={signUpForm.control}
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
                      control={signUpForm.control}
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
                      control={signUpForm.control}
                      name="userType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>I am a</FormLabel>
                          <div className="flex gap-4">
                            <Button
                              type="button"
                              variant={field.value === "patient" ? "default" : "outline"}
                              className={field.value === "patient" ? "bg-vitality-400 hover:bg-vitality-500 dark:bg-vitality-500 dark:hover:bg-vitality-600" : ""}
                              onClick={() => signUpForm.setValue("userType", "patient")}
                              disabled={isLoading}
                            >
                              Patient
                            </Button>
                            <Button
                              type="button"
                              variant={field.value === "doctor" ? "default" : "outline"}
                              className={field.value === "doctor" ? "bg-vitality-400 hover:bg-vitality-500 dark:bg-vitality-500 dark:hover:bg-vitality-600" : ""}
                              onClick={() => signUpForm.setValue("userType", "doctor")}
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
                      control={signUpForm.control}
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
                      className="w-full bg-vitality-400 hover:bg-vitality-500 dark:bg-vitality-500 dark:hover:bg-vitality-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Button 
                    variant="link" 
                    className="text-vitality-600 hover:text-vitality-700 dark:text-vitality-400 dark:hover:text-vitality-300 p-0"
                    onClick={() => setActiveTab("signin")}
                  >
                    Sign In
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default SignIn;
