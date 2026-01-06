/**
 * Firebase Client SDK Configuration
 * Handles client-side Firebase initialization and authentication
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDp4QVyeSlDQxZAjFheyL8yNiLj81_URN0",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "antiscam-a6586.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "antiscam-a6586",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "antiscam-a6586.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "742221209310",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:742221209310:web:8dea8a64f0fbffeac1ac4f"
};

// Initialize Firebase (singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export { auth, db, googleProvider, app };
