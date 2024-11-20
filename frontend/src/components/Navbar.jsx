import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { CiSearch, CiUser } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import avatarImage from "../assets/avatar.png";
import { useSearchBooksQuery } from "../redux/books/bookApi";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart", href: "/cart" },
  { name: "Checkout", href: "/checkout" },
];

function Navbar() {
  const [searchQuery, setSearchQuery] = useState(""); // Searching state
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const { currentUser, logout } = useAuth();
  const cartItem = useSelector((state) => state.cart.cartItem);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useSearchBooksQuery(searchQuery);
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    if (!searchQuery.trim()) {
      alert("Please enter a search query.");
      return;
    }
    navigate(`/search?title=${searchQuery}`);
    try {
      console.log("Searching for books with title:", searchQuery);
    } catch (error) {
      console.error("Error searching books:", error);
      alert("An error occurred while searching. Please try again.");
    }
  };

  const handleLogOut = () => {
    console.log("Logging out user");
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
          <form
            className="relative md:w-72 w-40 sm:w-32"
            onSubmit={handleSearch}
          >
            <CiSearch className="absolute left-1 inset-y-2 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for books..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value); // Update search query
              }}
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex items-center gap-6">
          {currentUser ? (
            <>
              <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                <img
                  src={avatarImage}
                  alt="User Avatar"
                  className="w-5 h-5 rounded-full"
                />
              </button>

              {/* Dropdown Menu */}
              {isDropDownOpen && (
                <div className="absolute right-0 mt-10 bg-white shadow-lg rounded-md p-2 w-40 z-40">
                  <ul className="space-y-2">
                    {navigation.map((item) => (
                      <li key={item.name}>
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
                        onClick={handleLogOut}
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
            <button>
              <FaHeart className="w-5 h-5 text-red-500 hover:text-red-700" />
            </button>
          </Link>

          {/* Cart Link */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="w-5 h-5" />
            {/* Display the cart item count, showing 0 if the cart is empty */}
            <span className="bg-primary text-yellow-50 w-4 h-4 rounded-full absolute -top-2 -right-2 flex justify-center items-center text-xs">
              {cartItem.length > 0 ? cartItem.length : 0}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
