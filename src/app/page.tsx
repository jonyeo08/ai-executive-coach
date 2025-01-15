import Image from "next/image";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            AI-Powered Executive Coaching
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            Personalized leadership development powered by artificial intelligence
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700">
              Get Started
            </button>
            <button className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-200">
              Learn More
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <Image 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150" 
                alt="Sarah Chen" 
                width={48} 
                height={48} 
                className="w-12 h-12 object-cover rounded-full mr-4"
              />
              <div>
                <h4 className="font-semibold">Sarah Chen</h4>
                <p className="text-gray-600">CEO, TechVision Inc.</p>
              </div>
            </div>
            <p className="text-gray-700 italic">&quot;The combination of AI coaching and human expertise has been transformative for my leadership journey. I&apos;ve achieved more in 6 months than I did in years of traditional coaching.&quot;</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <Image 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150" 
                alt="Marcus Johnson" 
                width={48} 
                height={48} 
                className="w-12 h-12 object-cover rounded-full mr-4"
              />
              <div>
                <h4 className="font-semibold">Marcus Johnson</h4>
                <p className="text-gray-600">Founder, InnovateLab</p>
              </div>
            </div>
            <p className="text-gray-700 italic">&quot;Having 24/7 access to AI-powered coaching while maintaining the human element has helped me navigate challenging leadership decisions with confidence.&quot;</p>
          </div>
        </div>
      </div>
    </main>
  );
}