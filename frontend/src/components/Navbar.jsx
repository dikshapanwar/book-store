import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { CiSearch, CiUser } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import avatarImage from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import getBaseUrl from "../utils/baseUrl";
import axios from "axios";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart", href: "/cart" },
  { name: "Checkout", href: "/checkout" },
];

function Navbar() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search Query State
  const cartItem = useSelector((state) => state.cart.cartItem);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

 // Inside Navbar component (React)

const handleSearch = async (e) => {
  e.preventDefault(); // Prevent form submission
  if (searchQuery.trim()) {
    try {
      const response = await axios.get(`${getBaseUrl}/search?query=${searchQuery}`);
      const data = await response.json();
      if (response.ok) {
        navigate(`/search?query=${searchQuery}`, { state: { books: data } });
      } else {
        alert('No books found');
      }
    } catch (error) {
      console.error('Error during search:', error);
      alert('Error fetching search results');
    }
  }
};

  const handleLogOut = () => {
    logout();
    setIsDropDownOpen(false);
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-6 py-6">
      <nav className="flex justify-between items-center">
        {/* LEFT SIDE */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiMiniBars3BottomLeft className="w-8 h-8" />
          </Link>

          {/* Search Input */}
          <form className="relative md:w-72 w-40 sm:w-32" onSubmit={handleSearch}>
            <CiSearch className="absolute left-1 inset-y-2 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query as user types
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex items-center gap-6">
          {currentUser ? (
            <>
              {/* Avatar Button */}
              <button
                onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                className="focus:outline-none"
              >
                <img
                  src={avatarImage}
                  alt="User Avatar"
                  className={`w-5 h-5 rounded-full ${
                    currentUser ? "ring-2 ring-blue-900" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropDownOpen && (
                <div className="absolute right-0 mt-80 bg-white shadow-lg rounded-md p-2 w-40 z-40 ">
                  <ul className="space-y-2">
                    {navigation.map((item) => (
                      <li
                        key={item.name}
                        onClick={() => setIsDropDownOpen(false)}
                      >
                        <Link
                          to={item.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                          onClick={() => setIsDropDownOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={() => handleLogOut()}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <CiUser className="w-6 h-6" />
            </Link>
          )}

          {/* Wishlist Link */}
          <Link to="/wishlist">
            <button className="hidden sm:block">
              <FaHeart className="w-5 h-5 text-red-500 hover:text-red-700" />
            </button>
          </Link>

          {/* Cart Link */}
          <Link to="/cart" className="p-1 sm:px-2 flex items-center rounded-full relative">
            <FaShoppingCart />
            {cartItem.length > 0 ? (
              <span className="bg-primary text-yellow-50 w-4 h-4 rounded-full flex items-center justify-center absolute -top-1 -right-1">
                {cartItem.length}
              </span>
            ) : (
              <span className="bg-primary text-yellow-50 w-4 h-4 rounded-full flex items-center justify-center absolute -top-1 -right-1">
                0
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
