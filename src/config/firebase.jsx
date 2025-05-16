

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// import { db } from '/src/config/firebase.jsx';
import {getAuth,GoogleAuthProvider  } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCuRSIgL2W0eJf5wntumPzvkJnhaZNpYeo",
  authDomain: "chat-app-2898a.firebaseapp.com",
  projectId: "chat-app-2898a",
  storageBucket: "chat-app-2898a.firebasestorage.app",
  messagingSenderId: "837204313164",
  appId: "1:837204313164:web:4ead407952e9d346ed60e9",
  measurementId: "G-SCHZ8TL8Y2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth=getAuth(app);
export const provider =new GoogleAuthProvider(app);