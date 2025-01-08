export type ConversationContext = {
    key_points: string[];
    discussed_topics: string[];
    action_items: string[];
    challenges: string[];
    goals: string[];
  };
  
  export class ConversationMemory {
    private context: ConversationContext = {
      key_points: [],
      discussed_topics: [],
      action_items: [],
      challenges: [],
      goals: []
    };
  
    addKeyPoint(point: string) {
      this.context.key_points.push(point);
    }
  
    addDiscussedTopic(topic: string) {
      if (!this.context.discussed_topics.includes(topic)) {
        this.context.discussed_topics.push(topic);
      }
    }
  
    addActionItem(item: string) {
      this.context.action_items.push(item);
    }
  
    addChallenge(challenge: string) {
      if (!this.context.challenges.includes(challenge)) {
        this.context.challenges.push(challenge);
      }
    }
  
    addGoal(goal: string) {
      if (!this.context.goals.includes(goal)) {
        this.context.goals.push(goal);
      }
    }
  
    getContext(): string {
      let contextPrompt = '\nConversation Context:\n';
  
      if (this.context.key_points.length > 0) {
        contextPrompt += '\nKey Points Discussed:\n- ' + 
          this.context.key_points.slice(-3).join('\n- ');
      }
  
      if (this.context.challenges.length > 0) {
        contextPrompt += '\nCurrent Challenges:\n- ' + 
          this.context.challenges.join('\n- ');
      }
  
      if (this.context.action_items.length > 0) {
        contextPrompt += '\nAction Items:\n- ' + 
          this.context.action_items.slice(-3).join('\n- ');
      }
  
      return contextPrompt;
    }
  
    analyzeResponse(message: string) {
      // Simple keyword-based analysis
      if (message.toLowerCase().includes('challenge')) {
        const challenge = message.split('.')[0];
        this.addChallenge(challenge);
      }
  
      if (message.toLowerCase().includes('action') || 
          message.toLowerCase().includes('should')) {
        const action = message.split('.')[0];
        this.addActionItem(action);
      }
  
      if (message.length > 50) {
        this.addKeyPoint(message.split('.')[0]);
      }
    }
  }