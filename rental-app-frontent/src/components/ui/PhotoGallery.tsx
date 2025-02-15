import React, { useState } from "react";

type Property = {
  id: number;
  image: string;
  title: string;
  price: string;
};

const properties: Property[] = [
  {
    id: 1,
    image: "/house-1.jpg",
    title: "Modern Apartment in Lagos",
    price: "₦450,000/year",
  },
  {
    id: 2,
    image: "/house-2.jpg",
    title: "Luxury Villa in Abuja",
    price: "₦1,200,000/year",
  },
  {
    id: 3,
    image: "/house-3.jpg",
    title: "Cozy Home in Port Harcourt",
    price: "₦350,000/year",
  },
  {
    id: 4,
    image: "/house-4.jpg",
    title: "Elegant Duplex in Lekki",
    price: "₦900,000/year",
  },
  {
    id: 5,
    image: "/house-5.jpg",
    title: "Beachfront House in VI",
    price: "₦1,500,000/year",
  },
];

const PhotoGallery: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <section className="py-10 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-center mb-6">Explore Our Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="group relative cursor-pointer"
            onClick={() => setSelectedProperty(property)}
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-64 object-cover rounded-lg shadow-md transition-transform transform group-hover:scale-105"
            />
            <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-3 w-full rounded-b-lg">
              <h3 className="text-lg font-semibold">{property.title}</h3>
              <p className="text-sm">{property.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Property Details */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-600 text-2xl"
              onClick={() => setSelectedProperty(null)}
            >
              &times;
            </button>
            <img
              src={selectedProperty.image}
              alt={selectedProperty.title}
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold">{selectedProperty.title}</h3>
            <p className="text-lg text-gray-600">{selectedProperty.price}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
