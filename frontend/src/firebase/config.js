// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };
const firebaseConfig = {
    apiKey: "AIzaSyC-Sn8RuFy4Tpq8T43s-0EwH6wmbAsuNIc",
    authDomain: "josh-b240a.firebaseapp.com",
    projectId: "josh-b240a",
    storageBucket: "josh-b240a.appspot.com",
    messagingSenderId: "1030936495421",
    appId: "1:1030936495421:web:734c0da55458cbfb463154",
};



// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;