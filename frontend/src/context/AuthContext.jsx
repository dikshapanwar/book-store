import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
// Initialize Google Provider
const googleProvider = new GoogleAuthProvider();
// Auth Provider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Register a user
  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  // Login a user
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setCurrentUser(result.user);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  // Logout
  const logout = async () => {
    await signOut(auth);
  };
  //manage user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        const { email, displayName, photoUrl } = user;
        const userData = {
          email,
          userName: displayName,
          photo: photoUrl,
        };
      }
    });
    return()=> unsubscribe();
  }, []);

  const value = {
    currentUser,
    error,
    loading,
    registerUser,
    loginUser,
    googleSignIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
