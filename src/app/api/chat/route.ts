import { NextResponse } from 'next/server';
import { AICoach } from '@/lib/ai-coach';

// Initialize the AI coach
const coach = new AICoach(process.env.OPENAI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { 
      message, 
      conversationHistory = [],
      goals = [],
      userRole,
      companyStage
    } = await request.json();

    // Update coach context
    coach.updateContext({
      goals,
      userRole,
      companyStage
    });

    // Get AI response
    const response = await coach.getResponse(message, conversationHistory);

    return NextResponse.json({
      response: response.content,
      success: response.success,
    });
  } catch (error) {
    console.error('Error in chat route:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}