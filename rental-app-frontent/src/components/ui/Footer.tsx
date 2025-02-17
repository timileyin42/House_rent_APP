// import React from "react";
import { Facebook, Twitter, Instagram, Mail, Home } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="text-2xl font-bold text-blue-500 flex items-center gap-2">
              <Home className="w-6 h-6" /> RentEase
            </div>
            <p className="mt-3 text-gray-400 text-sm text-center md:text-left">
              Find and rent luxury apartments with ease.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col text-center md:text-left">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Listings
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div className="flex flex-col text-center md:text-left">
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-3 flex items-center justify-center md:justify-start text-gray-400">
              <Mail className="w-5 h-5 mr-2" /> support@homego.com
            </p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} RentEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
