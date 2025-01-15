"use client";

import React, { useState } from 'react';
import { MessageCircle, Send, User, Calendar, Settings, BarChart } from 'lucide-react';
import GoalsView from './GoalsView';

export default function CoachingApp() {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    {
      role: 'coach',
      content: "Hello, I'm your executive coach inspired by Bill Campbell's principles. What leadership challenge would you like to discuss today?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessages = [
      ...messages,
      { role: 'user', content: inputMessage }
    ];

    setMessages(newMessages);
    setInputMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages([...newMessages, { role: 'coach', content: data.response }]);

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, { 
        role: 'coach', 
        content: "I apologize, but I'm having trouble connecting right now. Please try again." 
      }]);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'goals':
        return <GoalsView />;
      case 'chat':
        return (
          <>
            <div className="flex flex-col gap-6 h-[calc(100vh-280px)] min-h-[400px] overflow-y-auto mb-6 p-4 bg-gray-50 rounded-xl">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' ? 'bg-indigo-600' : 'bg-white border-2 border-indigo-600'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <MessageCircle className="w-5 h-5 text-indigo-600" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 placeholder-gray-400"
              />
              <button
                onClick={handleSendMessage}
                className="p-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-md"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </>
        );
      case 'calendar':
        return (
          <div className="p-4 text-center text-gray-500">
            Calendar feature coming soon...
          </div>
        );
      case 'settings':
        return (
          <div className="p-4 text-center text-gray-500">
            Settings feature coming soon...
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="w-64 space-y-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col p-2">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'chat' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Coaching Chat</span>
              </button>
              <button
                onClick={() => setActiveTab('goals')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'goals'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <BarChart className="w-5 h-5" />
                <span className="font-medium">Goals & Progress</span>
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'calendar'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span className="font-medium">Schedule Session</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === 'settings'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
              <MessageCircle className="w-7 h-7 text-indigo-600" />
              AI Executive Coach
            </h1>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}