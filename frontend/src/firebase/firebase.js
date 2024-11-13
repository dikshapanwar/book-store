// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH22Ns5LNSNGDPTd0u3Wdce9oOvmK9IwI",
  authDomain: "book-store-9925b.firebaseapp.com",
  projectId: "book-store-9925b",
  storageBucket: "book-store-9925b.firebasestorage.app",
  messagingSenderId: "882972585672",
  appId: "1:882972585672:web:44c09819456e61b5ff7ffd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)