
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

/**
 * Utility service for sending WhatsApp messages
 */
export const sendWhatsAppMessage = async (
  phoneNumber: string,
  message: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Format phone number to ensure it has the correct format for WhatsApp
    const formattedPhone = formatPhoneForWhatsApp(phoneNumber);
    
    // For now, we'll use the window.open approach which is client-side only
    // In a production environment, you would use an edge function to call the WhatsApp Business API
    
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    return { success: true };
  } catch (error: any) {
    console.error("Error sending WhatsApp message:", error);
    return { 
      success: false, 
      error: error.message || "Failed to send WhatsApp message" 
    };
  }
};

/**
 * Format phone number for WhatsApp API
 * Removes spaces, dashes, parentheses and ensures it starts with country code
 */
export const formatPhoneForWhatsApp = (phone: string): string => {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // If it doesn't start with a plus sign, assume it's a local number and add the default country code
  if (!phone.startsWith('+')) {
    // Adding +1 as default country code (you can change this based on your target country)
    cleaned = `1${cleaned}`;
  }
  
  return cleaned;
};

/**
 * Generate welcome message for new users
 */
export const generateWelcomeMessage = (name: string): string => {
  return `Welcome to Vitality Physio, ${name}! 👋 Thank you for registering with us. If you have any questions or need to schedule an appointment, feel free to reply to this message.`;
};

/**
 * Generate appointment confirmation message
 */
export const generateAppointmentMessage = (
  appointmentDetails: {
    patientName: string;
    doctorName: string;
    date: string;
    time: string;
  }
): string => {
  const { patientName, doctorName, date, time } = appointmentDetails;
  return `Hello ${patientName}, this is a confirmation of your appointment with Dr. ${doctorName} on ${date} at ${time}. Reply "CONFIRM" to confirm your appointment or "RESCHEDULE" if you need to change it.`;
};

/**
 * Generate payment success message
 */
export const generatePaymentSuccessMessage = (
  paymentDetails: {
    patientName: string;
    amount: string;
    invoiceNumber: string;
  }
): string => {
  const { patientName, amount, invoiceNumber } = paymentDetails;
  return `Thank you, ${patientName}. Your payment of ${amount} for invoice #${invoiceNumber} has been received successfully. A receipt has been sent to your email address.`;
};

/**
 * Hook for sending WhatsApp notifications with toast feedback
 */
export const useSendWhatsAppNotification = () => {
  const { toast } = useToast();

  const sendNotification = async (
    phoneNumber: string, 
    message: string,
    options?: { 
      silent?: boolean,
      onSuccess?: () => void 
    }
  ) => {
    const result = await sendWhatsAppMessage(phoneNumber, message);
    
    if (result.success) {
      if (!options?.silent) {
        toast({
          title: "Notification Sent",
          description: "WhatsApp message has been initiated.",
        });
      }
      if (options?.onSuccess) {
        options.onSuccess();
      }
    } else {
      toast({
        title: "Notification Failed",
        description: result.error || "Failed to send WhatsApp notification.",
        variant: "destructive",
      });
    }
    
    return result;
  };
  
  return { sendNotification };
};
