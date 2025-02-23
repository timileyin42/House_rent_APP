import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home as HomeIcon, Building2, Shield, Sparkles, Globe2 } from 'lucide-react';

export function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1567496898669-ee935f5f647a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Rentify</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Experience seamless property rentals with AI-powered matching, virtual tours, and instant booking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/search"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 text-center"
              >
                Find Your Dream Home
              </Link>
              <Link
                to="/list-property"
                className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 backdrop-blur-lg transform hover:scale-105 transition-all duration-300 text-center"
              >
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Rentify</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe2 className="h-8 w-8" />,
                title: "Smart Matching",
                description: "AI-powered algorithms find your perfect match based on preferences and lifestyle."
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Secure Payments",
                description: "Bank-level security for all transactions with fraud protection guarantee."
              },
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: "Virtual Tours",
                description: "Explore properties in immersive 3D without leaving your home."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Active Listings" },
              { number: "100K+", label: "Happy Tenants" },
              { number: "98%", label: "Satisfaction Rate" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Properties</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                title: "Luxury Skyline Apartment",
                price: "$2,500/month",
                location: "Downtown"
              },
              {
                image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                title: "Modern Garden Villa",
                price: "$3,200/month",
                location: "Suburbs"
              },
              {
                image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                title: "Urban Loft Space",
                price: "$1,800/month",
                location: "Arts District"
              }
            ].map((property, index) => (
              <div key={index} className="group relative rounded-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-w-16 aspect-h-10 relative">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="object-cover w-full h-64"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{property.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-400">{property.price}</span>
                    <span className="text-gray-300">{property.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Rental Experience?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied users who have found their perfect home through Rentify.
          </p>
          <Link
            to="/search"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}