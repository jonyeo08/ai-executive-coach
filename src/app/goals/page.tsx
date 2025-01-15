
"use client";
import GoalsView from '@/components/GoalsView';
import Navigation from '@/components/Navigation';

export default function GoalsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <GoalsView />
      </div>
    </main>
  );
}
