// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,FacebookAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBmSphyBCe48brY3bYPzVJRn24sYKGBwTc",
  authDomain: "grailed-1f4b9.firebaseapp.com",
  projectId: "grailed-1f4b9",
  storageBucket: "grailed-1f4b9.appspot.com",
  messagingSenderId: "31459117843",
  appId: "1:31459117843:web:c19a7fa6e0e734b3a5e8e6",
  measurementId: "G-L00CC0GFWN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();
export {auth,provider,providerFacebook}
