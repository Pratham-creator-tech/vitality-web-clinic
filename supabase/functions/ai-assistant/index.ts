
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
    const { message, fileContent, fileName, requestType } = await req.json();
    
    console.log('AI Assistant request:', { message, fileName, requestType });

    let systemPrompt = '';
    let userPrompt = message;

    // Configure AI behavior based on request type
    switch (requestType) {
      case 'file_analysis':
        systemPrompt = `You are a medical AI assistant. Analyze the uploaded medical file/report and provide:
1. Key findings and observations
2. Potential health concerns or conditions
3. Recommended next steps
4. Suggestions for specialist consultations if needed

Be professional, accurate, and always recommend consulting with healthcare professionals for proper diagnosis.`;
        
        if (fileContent) {
          userPrompt = `Please analyze this medical file "${fileName}":\n\n${fileContent}\n\nUser's question: ${message}`;
        }
        break;

      case 'doctor_recommendation':
        systemPrompt = `You are a healthcare recommendation AI. Based on the user's symptoms, conditions, or medical needs, recommend appropriate types of specialists or healthcare providers. 

For each recommendation, provide:
1. Type of specialist (e.g., Cardiologist, Orthopedist, etc.)
2. Why this specialist is recommended
3. What to expect during consultation
4. Any preparation needed

Always remind users to seek professional medical advice.`;
        break;

      default:
        systemPrompt = `You are a knowledgeable medical AI assistant for Yasha Physiocare. You can:
1. Answer general health and physiotherapy questions
2. Provide information about treatments and exercises
3. Offer guidance on injury prevention
4. Explain medical conditions in simple terms

Always recommend consulting healthcare professionals for proper diagnosis and treatment. Be helpful, accurate, and empathetic.`;
        break;
    }

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

    // If it's a doctor recommendation request, also fetch actual doctors from database
    let recommendedDoctors = [];
    if (requestType === 'doctor_recommendation') {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      const { data: doctors, error } = await supabase
        .from('doctors')
        .select('*')
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
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to process AI request',
      response: 'I apologize, but I encountered an error processing your request. Please try again or contact support if the issue persists.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
