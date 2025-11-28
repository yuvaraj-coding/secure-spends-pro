import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
const urlSchema = z.object({
  url: z.string().url().max(2048, "URL must be less than 2048 characters")
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authentication check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('Missing Authorization header');
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse and validate input
    const body = await req.json();
    const validationResult = urlSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0]?.message || 'Invalid URL format';
      console.error('Validation error:', validationResult.error);
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { url } = validationResult.data;
    
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

    const systemPrompt = `You are a financial app security expert specializing in Indian regulatory compliance and fraud detection. 
Analyze the provided financial app/website URL comprehensively based on these critical factors:

🔍 ANALYSIS CHECKLIST:
1. RBI/SEBI Verification - Check if regulated for financial services
2. Fraud & Scam Reports - Search for verified complaints, news articles, govt warnings
3. App Store Rating & Downloads - Verify ratings, number of downloads, review authenticity
4. Developer & Company Authenticity - Verify company registration, contact details, transparency
5. App Permissions - Analyze if permissions requested are excessive or suspicious
6. Website Trust - Check HTTPS, privacy policy, terms, ISO certifications, contact info
7. Recent User Complaints - Check social media, forums, consumer complaint portals
8. Govt-Flagged Database - Cross-reference with CERT-IN, RBI warnings, cyber cell reports

📊 SCORING SYSTEM:
- 75-100%: 🟢 Safe - "Trusted — You can use this app"
- 50-74%: 🟡 Moderate Risk - "Use With Caution"
- 0-49%: 🔴 Dangerous - "Avoid — High Scam Risk"

Provide a detailed security report with:
1. Overall safety score (0-100)
2. Safety status (safe/moderate/dangerous)
3. Status message based on score range
4. Comprehensive analysis explaining the score
5. Category-wise breakdown with pass/warning/fail for each of 8 checks
6. Specific risks identified
7. Actionable recommendations

Be extremely thorough. For financial apps, prioritize regulatory compliance and user protection.`;

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
                  },
                  statusMessage: {
                    type: "string",
                    description: "Status message based on score: 'Trusted — You can use this app', 'Use With Caution', or 'Avoid — High Scam Risk'"
                  },
                  categoryChecks: {
                    type: "object",
                    properties: {
                      rbiVerification: {
                        type: "object",
                        properties: {
                          status: { type: "string", enum: ["pass", "warning", "fail"] },
                          message: { type: "string" }
                        }
                      },
                      fraudReports: {
                        type: "object",
                        properties: {
                          status: { type: "string", enum: ["pass", "warning", "fail"] },
                          message: { type: "string" }
                        }
                      },
                      appStoreRating: {
                        type: "object",
                        properties: {
                          status: { type: "string", enum: ["pass", "warning", "fail"] },
                          message: { type: "string" }
                        }
                      },
                      developerAuth: {
                        type: "object",
                        properties: {
                          status: { type: "string", enum: ["pass", "warning", "fail"] },
                          message: { type: "string" }
                        }
                      },
                      permissions: {
                        type: "object",
                        properties: {
                          status: { type: "string", enum: ["pass", "warning", "fail"] },
                          message: { type: "string" }
                        }
                      },
                      websiteTrust: {
                        type: "object",
                        properties: {
                          status: { type: "string", enum: ["pass", "warning", "fail"] },
                          message: { type: "string" }
                        }
                      },
                      userComplaints: {
                        type: "object",
                        properties: {
                          status: { type: "string", enum: ["pass", "warning", "fail"] },
                          message: { type: "string" }
                        }
                      },
                      govtDatabase: {
                        type: "object",
                        properties: {
                          status: { type: "string", enum: ["pass", "warning", "fail"] },
                          message: { type: "string" }
                        }
                      }
                    }
                  }
                },
                required: ["safetyScore", "isSafe", "analysis", "risks", "recommendations", "statusMessage", "categoryChecks"]
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
