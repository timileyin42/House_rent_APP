import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Property } from '../types';

interface MapProps {
  properties: Property[];
  center?: { lat: number; lng: number };
}

export function Map({ properties, center }: MapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      zoom={12}
      center={center || { lat: 40.7128, lng: -74.0060 }}
      mapContainerClassName="w-full h-full rounded-lg"
    >
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={property.location}
          title={property.title}
        />
      ))}
    </GoogleMap>
  );
}