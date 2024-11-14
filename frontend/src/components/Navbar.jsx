import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import avatarImage from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  {
    name: "DashBorad",
    href: "/dashboard",
  },
  {
    name: "orders",
    href: "/orders",
  },
  {
    name: "cart",
    href: "/cart",
  },
  {
    name: "Checkout",
    href: "/checkout",
  },
];

function Navbar() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const cartItem = useSelector((state) => state.cart.cartItem);
  const { currentUser, logout } = useAuth();
  console.log(isDropDownOpen);
  const handleLogOut = () => {
    console.log("logout");
    logout();
    setIsDropDownOpen(false)
  };
  return (
    <header className="max-w-screen-2xl mx-auto px-12 py-6">
      <nav className="flex justify-between items-center">
        {/* LEFT SIDE */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiMiniBars3BottomLeft className="w-8 h-8" />
          </Link>
          {/* Search Input */}
          <div className="relative md:w-72 w-40 sm:w-32">
            <CiSearch className="absolute left-1 inset-y-2 w-5 h-5" />
            <input
              type="text"
              placeholder="Search here"
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex items-center gap-4">
          <div className="relative">
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
                    className={`size-5 rounded-xl ${
                      currentUser ? "ring-2 ring-blue-900" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropDownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-40 z-40">
                    <ul className="space-y-2">
                      {navigation.map((item) => (
                        //  console.log(item),
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
                          className="block px-4 py-2 text-gray-700
                         hover:bg-gray-100 rounded-md"
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
          </div>

          <button className="hidden sm:block">
            <FaHeart />
          </button>

          <Link
            to="/cart"
            className=" p-1 sm:px-2 px-2 flex items-center rounded-full"
          >
            <FaShoppingCart />
            {cartItem.length > 0 && (
              <span className=" bg-primary text-yellow-50 w-4 h-4 rounded-full flex items-center justify-center absolute -top-1 -right-1">
                {cartItem.length}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
