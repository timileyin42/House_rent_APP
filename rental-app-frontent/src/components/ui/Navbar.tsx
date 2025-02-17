import { useState } from "react";
import { Home, Menu, X } from "lucide-react";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto  py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <Home className="w-6 h-6" /> RentEase
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          <li>
            <a href="#" className="hover:text-blue-600">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600">
              Listings
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600">
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white shadow-md absolute w-full px-4 py-3 space-y-2 text-gray-700">
          <li>
            <a href="#" className="block py-2" onClick={() => setIsOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block py-2" onClick={() => setIsOpen(false)}>
              Listings
            </a>
          </li>
          <li>
            <a href="#" className="block py-2" onClick={() => setIsOpen(false)}>
              About
            </a>
          </li>
          <li>
            <a href="#" className="block py-2" onClick={() => setIsOpen(false)}>
              Contact
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
