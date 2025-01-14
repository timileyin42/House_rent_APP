import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">
            <a href="/">Rentify</a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </a>
            <a href="/explore" className="text-gray-700 hover:text-blue-600">
              Explore Properties
            </a>
            <a href="/post" className="text-gray-700 hover:text-blue-600">
              Post Property
            </a>
            <a href="/listings" className="text-gray-700 hover:text-blue-600">
              My Listings
            </a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600">
              Contact Us
            </a>
            <a
              href="/login"
              className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Login / Signup
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <a
              href="/"
              className="block px-4 py-2 text-gray-700 hover:text-blue-600"
            >
              Home
            </a>
            <a
              href="/explore"
              className="block px-4 py-2 text-gray-700 hover:text-blue-600"
            >
              Explore Properties
            </a>
            <a
              href="/post"
              className="block px-4 py-2 text-gray-700 hover:text-blue-600"
            >
              Post Property
            </a>
            <a
              href="/listings"
              className="block px-4 py-2 text-gray-700 hover:text-blue-600"
            >
              My Listings
            </a>
            <a
              href="/contact"
              className="block px-4 py-2 text-gray-700 hover:text-blue-600"
            >
              Contact Us
            </a>
            <a
              href="/login"
              className="block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Login / Signup
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
