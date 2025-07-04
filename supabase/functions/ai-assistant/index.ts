
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY') || 'demo-key-sk-1234567890abcdef';
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

    // Handle demo key scenario - provide a helpful response without calling OpenAI
    if (openAIApiKey === 'demo-key-sk-1234567890abcdef' || !openAIApiKey || openAIApiKey.includes('demo')) {
      let demoResponse = '';
      
      switch (requestType) {
        case 'file_analysis':
          demoResponse = `I'd be happy to analyze your medical file "${fileName || 'uploaded document'}", but I'm currently running in demo mode.

**For a complete file analysis, I would typically provide:**

📋 **Key Findings Analysis**
- Detailed review of all medical parameters
- Identification of abnormal values or concerning patterns
- Comparison with normal reference ranges

🔍 **Health Insights**
- Plain-language explanation of medical terminology
- Context about what the results mean for your health
- Risk assessment and health implications

⚠️ **Areas of Concern**
- Highlighting values that may need attention
- Potential health risks or conditions to monitor
- Urgent findings that require immediate medical attention

💡 **Recommendations**
- Suggested follow-up actions
- Lifestyle modifications
- Additional tests that might be needed

👨‍⚕️ **Specialist Consultation**
- Specific types of doctors to consult
- Urgency level for appointments
- What to discuss with your healthcare provider

**To get started with a real analysis, please contact our clinic at (123) 456-7890 or book an appointment through our booking system.**

*Remember: This analysis would be for informational purposes only. Always consult with qualified healthcare professionals for proper diagnosis and treatment.*`;
          break;

        case 'doctor_recommendation':
          demoResponse = `I'd be happy to recommend the right specialists for your needs! Based on your query about "${message}", here are some general recommendations:

🏥 **Recommended Specialists:**

**1. Primary Care Physician**
- Why: Good starting point for most health concerns
- What to expect: Comprehensive health assessment
- Preparation: Bring medical history and current medications

**2. Physiotherapist** (Our specialty!)
- Why: For musculoskeletal issues, pain management, and rehabilitation
- What to expect: Movement assessment and treatment planning
- Preparation: Wear comfortable clothing for physical examination

**3. Specialist Consultation**
- Based on your specific symptoms, you might need specialists like:
  - Orthopedist (bone/joint issues)
  - Neurologist (nerve-related problems)
  - Rheumatologist (inflammatory conditions)

📅 **Ready to Book?**
- Visit our booking page to schedule with our physiotherapy team
- Call (123) 456-7890 for immediate assistance
- Email: appointments@yashaphysiocare.com

**Available at Yasha Physiocare:**
- Sports Rehabilitation
- Manual Therapy
- Post-Surgical Rehabilitation  
- Chronic Pain Management
- Neurological Rehabilitation
- Strength & Conditioning

*For detailed, personalized recommendations based on your specific condition, please book a consultation with our healthcare professionals.*`;
          break;

        case 'appointment_booking':
          demoResponse = `I'd be delighted to help you book an appointment with Yasha Physiocare! 

📅 **Booking Your Appointment:**

**Step 1: Choose Your Service**
Based on your needs, I recommend:
- Sports Rehabilitation (for athletic injuries)
- Manual Therapy (for pain relief)
- Post-Surgical Rehabilitation (recovery support)
- Chronic Pain Management (ongoing pain issues)
- Neurological Rehabilitation (nerve conditions)
- Strength & Conditioning (fitness improvement)

**Step 2: Visit Our Booking System**
- Go to our online booking page
- Select your preferred service
- Choose available date and time slots
- Fill in your contact information

**Step 3: What You'll Need**
- Full name and contact details
- Brief description of your condition
- Preferred appointment times
- Any relevant medical history

📞 **Need Immediate Help?**
- Phone: (123) 456-7890
- Email: appointments@yashaphysiocare.com
- Address: 123 Healing Street, Wellness City, WC 10001

**Office Hours:**
- Monday-Friday: 8:00 AM - 6:00 PM
- Saturday: 9:00 AM - 2:00 PM
- Sunday: Closed

Would you like me to guide you through selecting the most appropriate service for your condition?`;
          break;

        default:
          demoResponse = `Hello! I'm your AI Medical Assistant for Yasha Physiocare. I'm currently in demo mode, but I can still help you with:

🏥 **My Capabilities:**
- **Medical Questions**: Ask about health conditions, treatments, and physiotherapy
- **File Analysis**: Upload medical reports for analysis (when fully operational)
- **Doctor Recommendations**: Get suggestions for the right specialists
- **Appointment Booking**: Schedule visits with our physiotherapy team

📋 **About Your Question:**
"${message}"

I'd provide detailed, professional medical guidance here. In full operation mode, I would:
- Give evidence-based health information
- Suggest appropriate treatment options
- Recommend suitable physiotherapy services
- Guide you through appointment booking

🎯 **Services at Yasha Physiocare:**
- Sports Rehabilitation
- Manual Therapy
- Post-Surgical Rehabilitation
- Chronic Pain Management
- Neurological Rehabilitation
- Strength & Conditioning

📞 **Contact Us:**
- Phone: (123) 456-7890
- Email: appointments@yashaphysiocare.com
- Online booking available 24/7

How else can I assist with your healthcare needs?`;
          break;
      }

      // Get doctors from database for recommendations
      let recommendedDoctors = [];
      if (requestType === 'doctor_recommendation') {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        
        const { data: doctors, error } = await supabase
          .from('doctors')
          .select('*')
          .eq('subscription_status', 'active')
          .limit(3);
        
        if (!error && doctors) {
          recommendedDoctors = doctors;
        }
      }

      return new Response(JSON.stringify({ 
        response: demoResponse,
        recommendedDoctors,
        requestType,
        isDemoMode: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // If we have a real API key, proceed with OpenAI call
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
