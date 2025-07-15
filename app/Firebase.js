import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAv5rBX2UdV35qzSZejMoiJM0G3Ehamcgk",
  authDomain: "serenity-ai-50e9b.firebaseapp.com",
  projectId: "serenity-ai-50e9b",
  storageBucket: "serenity-ai-50e9b.firebasestorage.app",
  messagingSenderId: "1036055452253",
  appId: "1:1036055452253:android:d81dbab91d2258189f4bb4",
};

// ✅ Ensure Firebase is initialized only once
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, app, db };
