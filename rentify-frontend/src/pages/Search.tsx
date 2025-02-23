import React, { useState } from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { Map } from '../components/Map';
import { SearchFilters, Property } from '../types';
import { Sliders, Search as SearchIcon } from 'lucide-react';

// Demo properties data
const demoProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Skyline Apartment',
    description: 'Modern luxury apartment with stunning city views and high-end amenities.',
    price: 3500,
    location: {
      address: '123 Downtown Ave, New York, NY',
      lat: 40.7128,
      lng: -74.0060
    },
    bedrooms: 2,
    bathrooms: 2,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    landlordId: 'user1'
  },
  {
    id: '2',
    title: 'Cozy Garden Studio',
    description: 'Charming studio apartment with private garden access.',
    price: 1800,
    location: {
      address: '456 Green St, Brooklyn, NY',
      lat: 40.6782,
      lng: -73.9442
    },
    bedrooms: 1,
    bathrooms: 1,
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    landlordId: 'user2'
  },
  {
    id: '3',
    title: 'Modern Loft Space',
    description: 'Industrial-style loft with high ceilings and exposed brick.',
    price: 2800,
    location: {
      address: '789 Artist Row, Manhattan, NY',
      lat: 40.7589,
      lng: -73.9851
    },
    bedrooms: 1,
    bathrooms: 1,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    landlordId: 'user3'
  },
  {
    id: '4',
    title: 'Waterfront Penthouse',
    description: 'Luxurious penthouse with panoramic water views and private terrace.',
    price: 5000,
    location: {
      address: '101 Harbor View, Jersey City, NJ',
      lat: 40.7178,
      lng: -74.0431
    },
    bedrooms: 3,
    bathrooms: 2.5,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
    landlordId: 'user4'
  }
];

export function Search() {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [properties] = useState<Property[]>(demoProperties);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center space-x-4 mb-6 p-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by location..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Sliders className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>

      <div className="flex flex-1 space-x-6 p-4">
        <div className="w-1/2 overflow-y-auto space-y-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="w-1/2 h-full">
          <Map properties={properties} />
        </div>
      </div>
    </div>
  );
}