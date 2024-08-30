// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyU_8UJn7OhBPhK3xWwkydd9sXEBKVFs4",
  authDomain: "auth-email-password-fire-8413f.firebaseapp.com",
  projectId: "auth-email-password-fire-8413f",
  storageBucket: "auth-email-password-fire-8413f.appspot.com",
  messagingSenderId: "471392797130",
  appId: "1:471392797130:web:e3bd5a09feabe4d38e0f33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth