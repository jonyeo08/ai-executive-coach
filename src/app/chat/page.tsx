
"use client";
import CoachingApp from '@/components/CoachingApp';
import Navigation from '@/components/Navigation';

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CoachingApp />
      </div>
    </main>
  );
}
