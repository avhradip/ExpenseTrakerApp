import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDxiklsxFutR2a_AZhLc4EJKsHOnAUcOBA",
    authDomain: "expense-tracker-82b2c.firebaseapp.com",
    projectId: "expense-tracker-82b2c",
    storageBucket: "expense-tracker-82b2c.firebasestorage.app",
    messagingSenderId: "1069608620419",
    appId: "1:1069608620419:web:632f046af5ebb031b866b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
})

// db
export const firestore = getFirestore(app)