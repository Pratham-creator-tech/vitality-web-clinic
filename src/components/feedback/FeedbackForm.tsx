
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Star } from 'lucide-react';

const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  feedback_type: z.enum(['general', 'bug_report', 'feature_request', 'service_quality', 'website_experience']),
  rating: z.number().min(1).max(5).optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  is_anonymous: z.boolean().default(false),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

interface FeedbackFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

export const FeedbackForm = ({ onSuccess, compact = false }: FeedbackFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState<number>(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: user?.user_metadata?.full_name || '',
      email: user?.email || '',
      is_anonymous: false,
    },
  });

  const feedbackType = watch('feedback_type');
  const isAnonymous = watch('is_anonymous');

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true);
    try {
      const feedbackData = {
        ...data,
        user_id: isAnonymous ? null : user?.id || null,
        rating: rating > 0 ? rating : null,
        page_url: window.location.href,
        user_agent: navigator.userAgent,
      };

      const { error } = await supabase
        .from('user_feedback')
        .insert([feedbackData]);

      if (error) throw error;

      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your feedback. We'll review it and get back to you if needed.",
      });

      reset();
      setRating(0);
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const RatingStars = () => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className="focus:outline-none"
        >
          <Star
            className={`h-6 w-6 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } hover:text-yellow-400 transition-colors`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <Card className={compact ? '' : 'max-w-2xl mx-auto'}>
      <CardHeader>
        <CardTitle>Share Your Feedback</CardTitle>
        <CardDescription>
          Help us improve our services by sharing your thoughts and experiences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                {...register('name')}
                disabled={isAnonymous}
                className={isAnonymous ? 'bg-gray-100' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                disabled={isAnonymous}
                className={isAnonymous ? 'bg-gray-100' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="feedback_type">Feedback Type *</Label>
            <Select onValueChange={(value) => setValue('feedback_type', value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select feedback type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Feedback</SelectItem>
                <SelectItem value="service_quality">Service Quality</SelectItem>
                <SelectItem value="website_experience">Website Experience</SelectItem>
                <SelectItem value="feature_request">Feature Request</SelectItem>
                <SelectItem value="bug_report">Bug Report</SelectItem>
              </SelectContent>
            </Select>
            {errors.feedback_type && (
              <p className="text-sm text-red-600 mt-1">{errors.feedback_type.message}</p>
            )}
          </div>

          {(feedbackType === 'service_quality' || feedbackType === 'website_experience') && (
            <div>
              <Label>Rating</Label>
              <RatingStars />
              <p className="text-sm text-gray-600 mt-1">
                Rate your experience (1 = Poor, 5 = Excellent)
              </p>
            </div>
          )}

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              {...register('subject')}
              placeholder="Brief summary of your feedback"
            />
          </div>

          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              {...register('message')}
              rows={5}
              placeholder="Please share your detailed feedback here..."
            />
            {errors.message && (
              <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_anonymous"
              {...register('is_anonymous')}
              className="rounded"
            />
            <Label htmlFor="is_anonymous" className="text-sm">
              Submit anonymously (your name and email won't be stored)
            </Label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
