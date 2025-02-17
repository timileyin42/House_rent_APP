import { Button } from "../components/ui/button";

import { Search, MapPin } from "lucide-react";
import Navbar from "./ui/Navbar";
import PhotoGallery from "./ui/PhotoGallery";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      {/* Hero Section */}
      <header className="relative border bg-cover bg-center h-[500px] flex items-center justify-center text-center px-4 md:px-8 landing-page">
        <div className="bg-black bg-opacity-50 p-6 rounded-lg text-white max-w-2xl ">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Find Your Perfect Home
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover the best rental homes in your area at unbeatable prices.
          </p>
          <Button variant="default" className="px-6 py-3 text-lg">
            Get Started
          </Button>
        </div>
      </header>

      {/* Search Bar */}
      <section className="flex justify-center py-9 px-4">
        <div className="bg-white p-4 rounded-lg shadow-lg flex w-full max-w-3xl">
          <input
            type="text"
            placeholder="Search by city, area, or landmark"
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          />
          <Button className="rounded-r-lg px-4 flex items-center gap-2">
            <Search className="w-5 h-5" /> Search
          </Button>
        </div>
      </section>

      <section className="flex justify-center  py-9 px-4">
        <div className="p-4  flex flex-col w-full max-w-3xl flex-column items-center justify-center">
          <h1 className="flex items-center text-center font-bold sm:text-lx md:text-2xl lg:text-3xl py-2">
            Find Your Dream Home – Premium Rentals in Nigeria
          </h1>
          <p className="text-center text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            nesciunt consequatur exercitationem, eligendi, porro quis dolorum
            excepturi aperiam, possimus officia a dolorem repudiandae pariatur?
            Eveniet, laboriosam? Laborum omnis tenetur totam.
          </p>
        </div>
      </section>
      {/* Photo gallery */}
      <section className=" px-4 md:px-8">
        <PhotoGallery />
      </section>

      {/* Featured Listings */}
      <section className="py-10 px-4 md:px-8 ">
        <h2 className="text-3xl font-bold text-center mb-6">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={`/house-${index + 1}.jpg`}
                alt="House"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">
                Modern Apartment in Lagos
              </h3>
              <p className="text-gray-600 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Victoria Island, Lagos
              </p>
              <p className="text-lg font-bold mt-2">₦450,000/year</p>
              <Button className="mt-4 w-full">View Details</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white text-center py-12 px-4">
        <h2 className="text-3xl font-bold mb-4">List Your Property Today</h2>
        <p className="text-lg mb-6">
          Reach thousands of potential tenants easily.
        </p>
        <Button variant="outline" className="px-6 py-3 text-lg">
          Get Started
        </Button>
      </section>
    </div>
  );
};

export default HomePage;
