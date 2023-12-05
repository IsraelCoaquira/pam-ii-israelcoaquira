import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBHfmF2W32tnw_3xA6VyJ_ZmboDPOiNE8Q",
    authDomain: "mais-saude-a9086.firebaseapp.com",
    projectId: "mais-saude-a9086",
    storageBucket: "mais-saude-a9086.appspot.com",
    messagingSenderId: "566585390966",
    appId: "1:566585390966:web:dacc2dee952564c2bd6c57"
  };

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
//export const FIREBASE_AUTH = getAuth(FIREBASE_APP)