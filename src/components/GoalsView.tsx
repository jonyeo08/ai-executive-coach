"use client";

import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash, MessageCircle, Check } from 'lucide-react';
import { GoalStore } from '@/lib/goalStore';

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

  const handleUpdateGoal = (id: string, updates: any) => {
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

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Your Goals</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add new goal..."
            className="p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAddGoal}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                {editingGoal === goal.id ? (
                  <input
                    type="text"
                    value={goal.text}
                    onChange={(e) => handleUpdateGoal(goal.id, { text: e.target.value })}
                    onBlur={() => setEditingGoal(null)}
                    className="w-full p-2 border rounded"
                    autoFocus
                  />
                ) : (
                  <h3 className="font-medium text-gray-800 flex items-center gap-2">
                    {goal.text}
                    {goal.status === 'completed' && (
                      <Check className="w-4 h-4 text-green-500" />
                    )}
                  </h3>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => setShowNotes(showNotes === goal.id ? null : goal.id)}
                  className="p-1 text-gray-500 hover:text-indigo-600"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setEditingGoal(goal.id)}
                  className="p-1 text-gray-500 hover:text-indigo-600"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>{goal.progress}%</span>
              </div>
              <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={goal.progress}
                onChange={(e) => handleUpdateGoal(goal.id, { progress: parseInt(e.target.value) })}
                className="w-full"
              />
              
              <select
                value={goal.status}
                onChange={(e) => handleUpdateGoal(goal.id, { status: e.target.value })}
                className="mt-2 p-1 text-sm border rounded"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {showNotes === goal.id && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-gray-700">Notes</h4>
                <div className="space-y-1">
                  {goal.notes?.map((note, index) => (
                    <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
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
                    className="flex-1 p-2 text-sm border rounded"
                  />
                  <button
                    onClick={() => handleAddNote(goal.id)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                  >
                    Add
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