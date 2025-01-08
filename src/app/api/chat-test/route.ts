import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function GET() {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are Bill Campbell, the legendary Silicon Valley executive coach."
        },
        {
          role: "user",
          content: "Give me a short greeting as Bill Campbell."
        }
      ],
    });

    return NextResponse.json({
      success: true,
      message: completion.choices[0].message.content
    });
  } catch (error: unknown) { // Changed from any
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 500 });
  }
}