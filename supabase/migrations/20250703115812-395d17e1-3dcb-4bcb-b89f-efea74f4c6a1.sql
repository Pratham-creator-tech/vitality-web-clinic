
-- Create a table to store user feedback
CREATE TABLE public.user_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('general', 'bug_report', 'feature_request', 'service_quality', 'website_experience')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  subject TEXT,
  message TEXT NOT NULL,
  page_url TEXT,
  user_agent TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'in_progress', 'resolved')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can submit feedback"
  ON public.user_feedback
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own feedback"
  ON public.user_feedback
  FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins can view and manage all feedback"
  ON public.user_feedback
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Create indexes for better performance
CREATE INDEX idx_user_feedback_user_id ON public.user_feedback(user_id);
CREATE INDEX idx_user_feedback_status ON public.user_feedback(status);
CREATE INDEX idx_user_feedback_type ON public.user_feedback(feedback_type);
CREATE INDEX idx_user_feedback_created_at ON public.user_feedback(created_at DESC);
