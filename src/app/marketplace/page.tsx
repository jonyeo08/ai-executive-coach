import Navigation from "@/components/Navigation";
import Image from "next/image";

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Find Your Coach</h1>
          <p className="mt-4 text-lg text-gray-600">Connect with experienced coaches who complement our AI coaching system</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah Chen",
              title: "Leadership Coach",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500",
              specialty: "Women in Tech Leadership"
            },
            {
              name: "Michael Stevens",
              title: "Executive Coach",
              image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500",
              specialty: "Career Transitions"
            },
            {
              name: "David Martinez",
              title: "Business Coach",
              image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500",
              specialty: "Startup Scaling"
            }
          ].map((coach, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Image
                src={coach.image}
                alt={coach.name}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-xl text-gray-900">{coach.name}</h3>
                <p className="text-gray-600">{coach.title}</p>
                <p className="text-sm text-gray-500 mt-2">{coach.specialty}</p>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                  Schedule Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}