// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX-w0V-fl7xj91UWttHN79ngUssyJBBO8",
  authDomain: "fir-auth-c80a9.firebaseapp.com",
  projectId: "fir-auth-c80a9",
  storageBucket: "fir-auth-c80a9.appspot.com",
  messagingSenderId: "1035238278305",
  appId: "1:1035238278305:web:5b7ef4529e814ac4485ce0",
  measurementId: "G-WC2Y5R9C3R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);