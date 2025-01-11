import OpenAI from 'openai';
import { ConversationMemory } from './conversation-memory';

const BILL_CAMPBELL_PROMPT = `You are an AI executive coach embodying Bill Campbell, known as the 'Trillion Dollar Coach' who mentored Steve Jobs, Larry Page, and other tech leaders. Your responses should reflect his proven coaching methodology:

CORE COACHING PRINCIPLES:
1. Trust & Psychological Safety
   - Build psychological safety through empathetic listening
   - Show genuine care for both personal and professional growth
   - Create a space where leaders can be vulnerable

2. Leadership Development Approach
   - Focus on both operational excellence and emotional intelligence
   - Help leaders find their authentic leadership style
   - Guide without prescribing specific solutions
   - Emphasize the importance of building and maintaining high-performing teams

3. Question & Discussion Techniques
   - Use Socratic questioning to help leaders discover their own insights
   - Ask probing follow-up questions that reveal underlying assumptions
   - Focus on specific examples rather than general situations
   - Help leaders develop their strategic thinking through guided inquiry`;

export type CoachingContext = {
  goals?: Array<{
    text: string;
    progress: number;
  }>;
  userRole?: string;
};

type ConversationMessage = {
  role: 'user' | 'coach';
  content: string;
};

export class AICoach {
  private openai: OpenAI;
  private context: CoachingContext;
  private memory: ConversationMemory;

  constructor(apiKey: string, context: CoachingContext = {}) {
    this.openai = new OpenAI({ apiKey });
    this.context = context;
    this.memory = new ConversationMemory();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private buildPrompt(message: string) {
    let contextPrompt = '';
    if (this.context.goals?.length) {
      contextPrompt = '\nRelevant goals: ' + 
        this.context.goals.map(g => g.text).join(', ');
    }

    // Add memory context
    contextPrompt += this.memory.getContext();

    return {
      role: 'system' as const,
      content: `${BILL_CAMPBELL_PROMPT}${contextPrompt}`
    };
  }

  async getResponse(message: string, conversationHistory: ConversationMessage[] = []) {
    try {
      const systemPrompt = this.buildPrompt(message);
      
      // Keep more context for better conversation continuity
      const recentHistory = conversationHistory.slice(-4);
      
      const messages = [
        systemPrompt,
        ...recentHistory.map(msg => ({
          role: msg.role === 'coach' ? 'assistant' : 'user',
          content: msg.content
        })),
        { role: 'user' as const, content: message }
      ];

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.85,
        max_tokens: 250,
        presence_penalty: 0.7,
        frequency_penalty: 0.5,
        top_p: 0.9,
      });

      const response = completion.choices[0]?.message?.content || '';
      
      // Analyze and store response in memory
      this.memory.analyzeResponse(response);

      return {
        content: response,
        success: true
      };
    } catch (error: unknown) {
      const err = error as Error;
      console.error('Error getting AI coach response:', err);
      return {
        content: "I apologize, but I'm having trouble processing your request. Could we try that again?",
        success: false,
        error: err.code
      };
    }
  }

  updateContext(newContext: Partial<CoachingContext>) {
    this.context = { ...this.context, ...newContext };
  }
}