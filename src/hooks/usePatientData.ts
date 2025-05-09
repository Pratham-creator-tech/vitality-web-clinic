
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Patient {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  dob: string | null;
  medical_history: string | null;
  profile_image: string | null;
}

interface Diagnosis {
  id: string;
  patient_id: string;
  doctor_id: string;
  doctor: {
    full_name: string;
  };
  diagnosis_date: string;
  condition: string;
  description: string | null;
  treatment_plan: string | null;
}

interface Prescription {
  id: string;
  patient_id: string;
  doctor_id: string;
  doctor: {
    full_name: string;
  };
  prescription_date: string;
  valid_until: string | null;
  instructions: string | null;
  medicines: any;
  treatments: any;
}

interface Invoice {
  id: string;
  invoice_number: string;
  patient_id: string;
  doctor_id: string;
  doctor: {
    full_name: string;
  };
  amount: number;
  total_amount: number;
  payment_status: string;
  invoice_date: string;
  due_date: string;
}

export const usePatientData = (patientId: string | undefined) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!patientId) return;

    const fetchPatientData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch patient details
        const { data: patientData, error: patientError } = await supabase
          .from("patients")
          .select("*")
          .eq("id", patientId)
          .single();

        if (patientError) throw patientError;
        setPatient(patientData);

        // Fetch diagnoses
        const { data: diagnosesData, error: diagnosesError } = await supabase
          .from("diagnoses")
          .select(`
            *,
            doctor:doctor_id (full_name)
          `)
          .eq("patient_id", patientId)
          .order("diagnosis_date", { ascending: false });

        if (diagnosesError) throw diagnosesError;
        setDiagnoses(diagnosesData || []);

        // Fetch prescriptions
        const { data: prescriptionsData, error: prescriptionsError } = await supabase
          .from("prescriptions")
          .select(`
            *,
            doctor:doctor_id (full_name)
          `)
          .eq("patient_id", patientId)
          .order("prescription_date", { ascending: false });

        if (prescriptionsError) throw prescriptionsError;
        setPrescriptions(prescriptionsData || []);

        // Fetch invoices
        const { data: invoicesData, error: invoicesError } = await supabase
          .from("invoices")
          .select(`
            *,
            doctor:doctor_id (full_name)
          `)
          .eq("patient_id", patientId)
          .order("invoice_date", { ascending: false });

        if (invoicesError) throw invoicesError;
        setInvoices(invoicesData || []);

      } catch (error) {
        console.error("Error fetching patient data:", error);
        toast({
          title: "Error",
          description: "Failed to load patient data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId, toast]);

  return { patient, diagnoses, prescriptions, invoices, isLoading };
};
