
"use client";

import React, { useState } from 'react';
import { PlusCircle, Edit, Trash, MessageCircle, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { GoalStore } from '@/lib/goalStore';

type GoalUpdates = {
  text?: string;
  progress?: number;
  status?: 'active' | 'completed' | 'archived';
};

export default function GoalsView() {
  const [goalStore] = useState(() => new GoalStore());
  const [goals, setGoals] = useState(goalStore.getGoals());
  const [newGoal, setNewGoal] = useState('');
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [showNotes, setShowNotes] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      goalStore.addGoal(newGoal);
      setGoals(goalStore.getGoals());
      setNewGoal('');
    }
  };

  const handleUpdateGoal = (id: string, updates: GoalUpdates) => {
    goalStore.updateGoal(id, updates);
    setGoals(goalStore.getGoals());
  };

  const handleDeleteGoal = (id: string) => {
    goalStore.deleteGoal(id);
    setGoals(goalStore.getGoals());
  };

  const handleAddNote = (goalId: string) => {
    if (newNote.trim()) {
      goalStore.addNoteToGoal(goalId, newNote);
      setGoals(goalStore.getGoals());
      setNewNote('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-white">Your Goals</h2>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Add new goal..."
              className="flex-1 md:w-80 p-3 rounded-xl bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
              onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
            />
            <button
              onClick={handleAddGoal}
              className="p-3 bg-white text-indigo-600 rounded-xl hover:bg-white/90 transition-colors duration-200"
            >
              <PlusCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div 
            key={goal.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
          >
            <div className="p-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  {editingGoal === goal.id ? (
                    <input
                      type="text"
                      value={goal.text}
                      onChange={(e) => handleUpdateGoal(goal.id, { text: e.target.value })}
                      onBlur={() => setEditingGoal(null)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      autoFocus
                    />
                  ) : (
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      {goal.text}
                      {goal.status === 'completed' && (
                        <Check className="w-5 h-5 text-green-500" />
                      )}
                    </h3>
                  )}
                  <div className="mt-2">
                    <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(goal.status)}`}>
                      {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowNotes(showNotes === goal.id ? null : goal.id)}
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                  >
                    {showNotes === goal.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => setEditingGoal(goal.id)}
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span className="font-medium">{goal.progress}%</span>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) => handleUpdateGoal(goal.id, { progress: parseInt(e.target.value) })}
                  className="w-full accent-indigo-600"
                />
                
                <select
                  value={goal.status}
                  onChange={(e) => handleUpdateGoal(goal.id, { status: e.target.value as 'active' | 'completed' | 'archived' })}
                  className="mt-2 p-2 text-sm border rounded-lg bg-white hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            {showNotes === goal.id && (
              <div className="border-t border-gray-100 bg-gray-50 p-6 space-y-4">
                <h4 className="font-semibold text-gray-700">Notes & Progress Updates</h4>
                <div className="space-y-2">
                  {goal.notes?.map((note, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg border border-gray-100 text-sm text-gray-700">
                      {note}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    className="flex-1 p-3 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddNote(goal.id)}
                  />
                  <button
                    onClick={() => handleAddNote(goal.id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
