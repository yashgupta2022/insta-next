import { initializeApp, getApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:process.env.FIREBASE_API_KEY ,
  authDomain: process.env.FIREBASE_APP_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_APP_PROJECT_ID,
  storageBucket: process.env.FIREBASE_APP_STORAGE_BUCKET,
  messagingSenderId:process.env.FIREBASE_APP_MESSAGING_SENDER_ID ,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export {app,db,storage}