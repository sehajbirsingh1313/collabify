// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "collabify-2004984.firebaseapp.com",
  projectId: "collabify-2004984",
  storageBucket: "collabify-2004984.appspot.com",
  messagingSenderId: "577311502929",
  appId: "1:577311502929:web:c71d8f28131ec8c8643e70"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);