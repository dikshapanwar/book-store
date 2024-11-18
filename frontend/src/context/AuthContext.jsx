import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import getBaseUrl from "../utils/baseUrl";

// Auth API endpoints (adjust these to your actual backend)
// const API_URL = "http://localhost:5000/api"; // replace with your backend URL

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Register a user
  const registerUser = async (username,email, password) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/api/user/register`, {
        username,
        email,
        password,
      });
      return response.data; // Handle success response
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    }
  };

  // Login a user
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/api/user/login`, {
        email,
        password,
      });
      const { token } = response.data;

      // Store JWT token in localStorage
      localStorage.setItem("authToken", token);

      // Decode the JWT token to get user details
      const decodedToken = jwtDecode(token);
      setCurrentUser(decodedToken);

      return response.data; // Handle success response
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("authToken");
    setCurrentUser(null);
  };

  // Manage user state and auto-login from localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        // Decode token and set current user
        const decodedToken = jwt_decode(token);
        setCurrentUser(decodedToken);
      } catch (err) {
        setError("Invalid or expired token");
        logout(); // Invalidate session if token is not valid
      }
    }

    setLoading(false);
  }, []);

  const value = {
    currentUser,
    error,
    loading,
    registerUser,
    loginUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
