import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analyzing URL:', url);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are a cybersecurity expert specializing in fraud detection and app safety analysis. 
Analyze the provided URL and determine its safety level. Consider factors like:
- Domain reputation and age
- HTTPS/SSL certificate presence
- Known phishing patterns
- Suspicious URL structures
- Common fraud indicators
- App store presence and reviews (if applicable)

Provide a comprehensive analysis with:
1. A safety score (0-100)
2. Whether it's safe (true/false)
3. A detailed analysis explanation
4. List of specific risks found (if any)
5. Recommendations for the user

Be thorough but concise. If you cannot determine safety with certainty, err on the side of caution.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this URL for safety and fraud indicators: ${url}` }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "provide_safety_analysis",
              description: "Provide a comprehensive safety analysis of the URL",
              parameters: {
                type: "object",
                properties: {
                  safetyScore: {
                    type: "number",
                    description: "Safety score from 0 to 100"
                  },
                  isSafe: {
                    type: "boolean",
                    description: "Whether the app/URL is considered safe"
                  },
                  analysis: {
                    type: "string",
                    description: "Detailed analysis of the URL safety"
                  },
                  risks: {
                    type: "array",
                    items: { type: "string" },
                    description: "List of identified risks"
                  },
                  recommendations: {
                    type: "array",
                    items: { type: "string" },
                    description: "Safety recommendations for the user"
                  }
                },
                required: ["safetyScore", "isSafe", "analysis", "risks", "recommendations"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "provide_safety_analysis" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your Lovable AI workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI Response:', JSON.stringify(data, null, 2));

    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error('No tool call in AI response');
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-app function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred during analysis';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
