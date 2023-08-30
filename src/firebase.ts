// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Replace with your own
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, // Replace with your own
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, // Replace with your own
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, // Replace with your own
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSENGER_SENDER_ID, // Replace with your own
  appId: import.meta.env.VITE_FIREBASE_APP_ID, // Replace with your own
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID // Replace with your own
};

if (!firebaseConfig.apiKey) {
  throw Error("Please provide credentials for your firebaseConfig in ./firebase.ts file")
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);