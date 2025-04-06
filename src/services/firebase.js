// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWGSkjX6LaxS7HQlTJ4axjr8QaHwLevtE",
  authDomain: "mydemo-3170f.firebaseapp.com",
  projectId: "mydemo-3170f",
  storageBucket: "mydemo-3170f.appspot.com",
  messagingSenderId: "999777030316",
  appId: "1:999777030316:web:b2e37ae40c4fb04d278f09",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
