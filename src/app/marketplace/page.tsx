
"use client";
import Navigation from '@/components/Navigation';
import { Star, Award, Book } from 'lucide-react';

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Coach</h1>
          <p className="text-xl text-gray-600">Connect with experienced executive coaches who complement our AI coaching system</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Sample coaches - In production, this would be dynamic */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500" alt="Coach" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold">Michael Stevens</h3>
                <div className="ml-auto flex items-center text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1">4.9</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">Former CEO with 15+ years of leadership experience in tech startups</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Award className="w-4 h-4 mr-2" />
                <span>Leadership Development Expert</span>
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Schedule Session
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500" alt="Coach" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold">Sarah Chen</h3>
                <div className="ml-auto flex items-center text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1">4.8</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">Executive coach specializing in women's leadership and career transitions</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Book className="w-4 h-4 mr-2" />
                <span>Career Development Specialist</span>
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Schedule Session
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500" alt="Coach" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-semibold">David Martinez</h3>
                <div className="ml-auto flex items-center text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1">4.9</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">Silicon Valley veteran specializing in scaling teams and organizations</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Award className="w-4 h-4 mr-2" />
                <span>Scaling & Growth Expert</span>
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Schedule Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
