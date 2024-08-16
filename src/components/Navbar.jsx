import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown menu
  const { user, logout } = useAuth(); // Get the login state and logout function

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Fixit
        </Link>
        <div className="hidden sm:flex space-x-4">
          <Link
            to="/"
            className="text-white hover:bg-blue-700 rounded-md px-3 py-2"
          >
            Home
          </Link>
          {!user ? (
            <Link
              to="/login"
              className="text-white hover:bg-blue-700 rounded-md px-3 py-2"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-white hover:bg-blue-700 rounded-md px-3 py-2"
              >
                <User className="w-6 h-6" /> {/* Profile Icon */}
                <ChevronDown className="ml-2 w-4 h-4" /> {/* Dropdown Arrow */}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg">
                  <div className="flex flex-col overflow-visible rounded-md">
                    <Link
                      to="/profile"
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/admin"
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      My Shops
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <button
          onClick={toggleMenu}
          className="text-white sm:hidden focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block text-white hover:bg-blue-700 rounded-md px-3 py-2"
            >
              Home
            </Link>
            {!user ? (
              <Link
                to="/login"
                className="block text-white hover:bg-blue-700 rounded-md px-3 py-2"
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="block text-white hover:bg-blue-700 rounded-md px-3 py-2"
                >
                  Profile
                </Link>
                <Link
                  to="/admin"
                  className="block text-white hover:bg-blue-700 rounded-md px-3 py-2"
                >
                  My Shops
                </Link>
                <button
                  onClick={logout}
                  className="block text-white hover:bg-blue-700 rounded-md px-3 py-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
