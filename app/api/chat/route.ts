
import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function POST(req: NextRequest) {
  try {
    const { message, userId, context } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: `You are FitFlow AI, a supportive fitness coach. Provide encouraging, personalized advice based on the user's context. Keep responses concise and motivational. User context: ${JSON.stringify(context)}`
        },
        {
          role: "user",
          content: message
        }
      ],
      functions: [
        {
          name: "suggest_workout_modification",
          description: "Suggest modifications to the current workout based on user feedback",
          parameters: {
            type: "object",
            properties: {
              modification_type: {
                type: "string",
                enum: ["intensity", "duration", "exercises", "rest_time"]
              },
              suggestion: {
                type: "string",
                description: "The specific modification suggestion"
              },
              reason: {
                type: "string",
                description: "Why this modification is recommended"
              }
            },
            required: ["modification_type", "suggestion", "reason"]
          }
        },
        {
          name: "provide_form_feedback",
          description: "Provide feedback on exercise form",
          parameters: {
            type: "object",
            properties: {
              exercise: {
                type: "string",
                description: "Name of the exercise"
              },
              feedback: {
                type: "string",
                description: "Specific form feedback"
              },
              correction_tips: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "List of correction tips"
              }
            },
            required: ["exercise", "feedback", "correction_tips"]
          }
        }
      ],
      function_call: "auto"
    });

    const response = completion.choices[0];
    
    if (response.message.function_call) {
      return NextResponse.json({
        type: 'function_call',
        function_call: response.message.function_call,
        message: response.message.content
      });
    }

    return NextResponse.json({
      type: 'message',
      message: response.message.content
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
