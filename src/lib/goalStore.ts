type Goal = {
    id: string;
    text: string;
    progress: number;
    status: 'active' | 'completed' | 'archived';
    createdAt: string;
    updatedAt: string;
    notes?: string[];
  };
  
  export class GoalStore {
    private goals: Goal[];
  
    constructor() {
      // Initialize with some example goals if localStorage is empty
      const storedGoals = typeof window !== 'undefined' ? 
        localStorage.getItem('coachingGoals') : null;
      
      this.goals = storedGoals ? JSON.parse(storedGoals) : [
        {
          id: '1',
          text: 'Improve team communication',
          progress: 60,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          notes: []
        },
        {
          id: '2',
          text: 'Develop strategic thinking',
          progress: 40,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          notes: []
        }
      ];
      this.saveGoals();
    }
  
    private saveGoals() {
      if (typeof window !== 'undefined') {
        localStorage.setItem('coachingGoals', JSON.stringify(this.goals));
      }
    }
  
    getGoals(): Goal[] {
      return this.goals;
    }
  
    addGoal(text: string): Goal {
      const newGoal: Goal = {
        id: Date.now().toString(),
        text,
        progress: 0,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        notes: []
      };
      this.goals.push(newGoal);
      this.saveGoals();
      return newGoal;
    }
  
    updateGoal(id: string, updates: Partial<Goal>): Goal {
      const index = this.goals.findIndex(g => g.id === id);
      if (index !== -1) {
        this.goals[index] = {
          ...this.goals[index],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        this.saveGoals();
        return this.goals[index];
      }
      throw new Error('Goal not found');
    }
  
    addNoteToGoal(id: string, note: string) {
      const goal = this.goals.find(g => g.id === id);
      if (goal) {
        if (!goal.notes) goal.notes = [];
        goal.notes.push(note);
        goal.updatedAt = new Date().toISOString();
        this.saveGoals();
      }
    }
  
    deleteGoal(id: string) {
      this.goals = this.goals.filter(g => g.id !== id);
      this.saveGoals();
    }
  }