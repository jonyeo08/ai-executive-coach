import Link from 'next/link';
import { Home, MessageCircle, Target } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-indigo-600">AI Executive Coach</Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105">
              <Home className="w-5 h-5 mr-2" />
              Home
            </Link>
            <Link href="/chat" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat
            </Link>
            <Link href="/goals" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105">
              <Target className="w-5 h-5 mr-2" />
              Goals
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}