-- Add verification status to doctors table
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected'));
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS verification_documents jsonb;
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS verification_notes text;

-- Create treatment plans table
CREATE TABLE IF NOT EXISTS treatment_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id uuid NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  start_date date NOT NULL,
  end_date date,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  goals jsonb,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create exercise prescriptions table
CREATE TABLE IF NOT EXISTS exercise_prescriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id uuid NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  treatment_plan_id uuid REFERENCES treatment_plans(id) ON DELETE CASCADE,
  exercise_name text NOT NULL,
  description text,
  video_url text,
  sets integer,
  reps integer,
  duration text,
  frequency text,
  instructions text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  referee_email text NOT NULL,
  referee_name text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'expired')),
  reward_amount numeric DEFAULT 0,
  reward_status text DEFAULT 'pending' CHECK (reward_status IN ('pending', 'claimed', 'expired')),
  referral_code text UNIQUE NOT NULL,
  expires_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE treatment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for treatment_plans
CREATE POLICY "Patients can view their own treatment plans"
  ON treatment_plans FOR SELECT
  USING (patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid()));

CREATE POLICY "Doctors can view and manage their patients' treatment plans"
  ON treatment_plans FOR ALL
  USING (doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid()));

-- RLS Policies for exercise_prescriptions
CREATE POLICY "Patients can view their own exercise prescriptions"
  ON exercise_prescriptions FOR SELECT
  USING (patient_id IN (SELECT id FROM patients WHERE user_id = auth.uid()));

CREATE POLICY "Doctors can manage exercise prescriptions for their patients"
  ON exercise_prescriptions FOR ALL
  USING (doctor_id IN (SELECT id FROM doctors WHERE user_id = auth.uid()));

-- RLS Policies for referrals
CREATE POLICY "Users can view their own referrals"
  ON referrals FOR SELECT
  USING (referrer_id IN (SELECT id FROM patients WHERE user_id = auth.uid()));

CREATE POLICY "Users can create referrals"
  ON referrals FOR INSERT
  WITH CHECK (referrer_id IN (SELECT id FROM patients WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own referrals"
  ON referrals FOR UPDATE
  USING (referrer_id IN (SELECT id FROM patients WHERE user_id = auth.uid()));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_treatment_plans_patient_id ON treatment_plans(patient_id);
CREATE INDEX IF NOT EXISTS idx_treatment_plans_doctor_id ON treatment_plans(doctor_id);
CREATE INDEX IF NOT EXISTS idx_exercise_prescriptions_patient_id ON exercise_prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_exercise_prescriptions_treatment_plan_id ON exercise_prescriptions(treatment_plan_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_code ON referrals(referral_code);