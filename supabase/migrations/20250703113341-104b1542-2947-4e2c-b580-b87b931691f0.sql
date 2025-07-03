
-- Create a table to store meeting details
CREATE TABLE public.meeting_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  meeting_id TEXT NOT NULL UNIQUE,
  meeting_link TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  service TEXT NOT NULL,
  therapist TEXT NOT NULL,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  time_slot TEXT NOT NULL,
  is_new_patient BOOLEAN DEFAULT false,
  message TEXT,
  is_host BOOLEAN DEFAULT true,
  booking_time TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.meeting_details ENABLE ROW LEVEL SECURITY;

-- Create policies for meeting_details
CREATE POLICY "Users can view their own meeting details"
  ON public.meeting_details
  FOR SELECT
  USING (auth.uid() = patient_id);

CREATE POLICY "Users can insert their own meeting details"
  ON public.meeting_details
  FOR INSERT
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update their own meeting details"
  ON public.meeting_details
  FOR UPDATE
  USING (auth.uid() = patient_id);

-- Create an index for better performance
CREATE INDEX idx_meeting_details_patient_id ON public.meeting_details(patient_id);
CREATE INDEX idx_meeting_details_meeting_id ON public.meeting_details(meeting_id);
