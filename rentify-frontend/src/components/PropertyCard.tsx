import React from 'react';
import { MapPin, Bed, Bath, DollarSign } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={property.imageUrl} 
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{property.title}</h3>
        <div className="flex items-center mt-2 text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location.address}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bathrooms}</span>
            </div>
          </div>
          <div className="flex items-center text-blue-600 font-semibold">
            <DollarSign className="h-4 w-4" />
            <span>{property.price}/month</span>
          </div>
        </div>
      </div>
    </div>
  );
}