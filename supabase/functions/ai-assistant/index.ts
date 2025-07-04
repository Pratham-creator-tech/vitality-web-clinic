
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY') || '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';
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, fileContent, fileName, requestType, userId } = await req.json();
    
    console.log('AI Assistant request:', { message, fileName, requestType, userId });

    let systemPrompt = '';
    let userPrompt = message;

    // Configure AI behavior based on request type
    switch (requestType) {
      case 'file_analysis':
        systemPrompt = `You are a medical AI assistant specialized in analyzing medical documents. Analyze the uploaded medical file/report and provide:

1. **Key Findings**: Summarize the main medical findings and observations
2. **Health Insights**: Explain what the results mean in simple terms
3. **Potential Concerns**: Highlight any areas that may need attention
4. **Recommendations**: Suggest next steps, lifestyle changes, or follow-up actions
5. **Specialist Consultation**: Recommend specific types of doctors if needed

Always remind users that this analysis is for informational purposes only and they should consult healthcare professionals for proper diagnosis and treatment.

Be professional, accurate, and empathetic in your response.`;
        
        if (fileContent) {
          userPrompt = `Please analyze this medical file "${fileName}":\n\n${fileContent}\n\nUser's question: ${message}`;
        }
        break;

      case 'doctor_recommendation':
        systemPrompt = `You are a healthcare recommendation AI assistant. Based on the user's symptoms, conditions, or medical needs, provide comprehensive doctor recommendations.

For each recommendation, include:
1. **Specialist Type**: The specific type of doctor (e.g., Cardiologist, Dermatologist, Orthopedist)
2. **Why This Specialist**: Explain why this type of doctor is recommended for their condition
3. **What to Expect**: Describe what happens during a typical consultation
4. **Preparation Tips**: What the patient should bring or do before the appointment
5. **Urgency Level**: Indicate if this is urgent, routine, or preventive care

If the user wants to book an appointment, guide them on how to schedule one through our booking system.

Always emphasize the importance of professional medical consultation and remind users that AI recommendations should not replace professional medical advice.`;
        break;

      case 'appointment_booking':
        systemPrompt = `You are an appointment booking assistant for Yasha Physiocare. Help users schedule appointments by:

1. **Understanding Their Needs**: Ask about their condition, preferred service, and urgency
2. **Service Recommendations**: Suggest appropriate physiotherapy services based on their needs
3. **Booking Guidance**: Direct them to use our online booking system
4. **Requirements**: Explain what information they'll need (personal details, preferred dates/times)
5. **Contact Information**: Provide our clinic contact details if they need immediate assistance

Available Services:
- Sports Rehabilitation
- Manual Therapy
- Post-Surgical Rehabilitation
- Chronic Pain Management
- Neurological Rehabilitation
- Strength & Conditioning

Always be helpful and guide them step-by-step through the booking process.`;
        break;

      default:
        systemPrompt = `You are an intelligent medical AI assistant for Yasha Physiocare, a leading physiotherapy clinic. You provide comprehensive healthcare support including:

**Core Capabilities:**
1. **Medical Guidance**: Answer questions about health conditions, treatments, and physiotherapy
2. **File Analysis**: Analyze uploaded medical reports, lab results, and documents
3. **Doctor Recommendations**: Suggest appropriate specialists based on symptoms and conditions
4. **Appointment Booking**: Help users schedule appointments with our physiotherapy services
5. **General Health Advice**: Provide information about injury prevention, exercises, and wellness

**Available Services at Yasha Physiocare:**
- Sports Rehabilitation
- Manual Therapy  
- Post-Surgical Rehabilitation
- Chronic Pain Management
- Neurological Rehabilitation
- Strength & Conditioning

**Key Guidelines:**
- Always be professional, empathetic, and helpful
- Provide accurate, evidence-based information
- Recommend professional consultation when appropriate
- Never provide specific medical diagnoses
- Emphasize that AI guidance supplements but doesn't replace professional medical care
- Guide users to book appointments when they need hands-on treatment

**Contact Information:**
- Phone: (123) 456-7890
- Email: appointments@yashaphysiocare.com
- Address: 123 Healing Street, Wellness City, WC 10001

How can I assist with your healthcare needs today?`;
        break;
    }

    // Call OpenAI API with the real API key
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      throw new Error(data.error?.message || 'OpenAI API request failed');
    }

    const aiResponse = data.choices[0].message.content;

    // Get doctors from database for recommendations
    let recommendedDoctors = [];
    if (requestType === 'doctor_recommendation') {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      const { data: doctors, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('subscription_status', 'active')
        .limit(5);
      
      if (!error && doctors) {
        recommendedDoctors = doctors;
      }
    }

    return new Response(JSON.stringify({ 
      response: aiResponse,
      recommendedDoctors,
      requestType 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI assistant function:', error);
    
    // Provide helpful fallback response
    const fallbackResponse = `I apologize, but I'm experiencing technical difficulties right now. 

**For immediate assistance:**
📞 **Call us directly:** (123) 456-7890
📧 **Email:** appointments@yashaphysiocare.com
🌐 **Visit:** Our online booking system is always available

**Our Services:**
- Sports Rehabilitation
- Manual Therapy
- Post-Surgical Rehabilitation
- Chronic Pain Management
- Neurological Rehabilitation
- Strength & Conditioning

**Office Hours:**
Monday-Friday: 8:00 AM - 6:00 PM
Saturday: 9:00 AM - 2:00 PM
Sunday: Closed

Our team is standing by to help with your healthcare needs!`;

    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to process AI request',
      response: fallbackResponse,
      requestType: 'error_fallback'
    }), {
      status: 200, // Return 200 to avoid frontend errors
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
