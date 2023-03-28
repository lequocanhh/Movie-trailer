import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyChscyv2xiY9cy8t3EY_y7rfg24p1pgHL0",
  authDomain: "react-netflix-clone-40b82.firebaseapp.com",
  projectId: "react-netflix-clone-40b82",
  storageBucket: "react-netflix-clone-40b82.appspot.com",
  messagingSenderId: "841474045023",
  appId: "1:841474045023:web:1bf21eee95d20be64117ea",
  measurementId: "G-M24VSG6BJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)