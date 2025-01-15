import Image from 'next/image';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Executive Coaching
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Combine the wisdom of experienced coaches with AI technology to accelerate your professional growth and achieve your leadership goals.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Get immediate guidance and support whenever you need it through our AI coach.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">Set goals and monitor your development with our integrated tracking system.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Human + AI</h3>
            <p className="text-gray-600">Benefit from both human expertise and AI-powered insights for comprehensive coaching.</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <Image src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150" alt="Sarah Chen" width={48} height={48} className="w-12 h-12 object-cover rounded-full mr-4" />
              <div>
                <h4 className="font-semibold">Sarah Chen</h4>
                <p className="text-gray-600">CEO, TechVision Inc.</p>
              </div>
            </div>
            <p className="text-gray-700 italic">&ldquo;The combination of AI coaching and human expertise has been transformative for my leadership journey. I've achieved more in 6 months than I did in years of traditional coaching.&rdquo;</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <Image src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150" alt="Marcus Johnson" width={48} height={48} className="w-12 h-12 object-cover rounded-full mr-4" />
              <div>
                <h4 className="font-semibold">Marcus Johnson</h4>
                <p className="text-gray-600">Founder, InnovateLab</p>
              </div>
            </div>
            <p className="text-gray-700 italic">&ldquo;Having 24/7 access to AI-powered coaching while maintaining the human element has helped me navigate challenging leadership decisions with confidence.&rdquo;</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href="/chat" className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors inline-block">
            Start Your Coaching Journey
          </a>
        </div>
      </div>
    </main>
  );
}