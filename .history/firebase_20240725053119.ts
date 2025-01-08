import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { get } from "http";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVlUszQTYR22dtxQZB6ziVg55rfh9hAOA",
    authDomain: "chat-with-pdf-challenge-47d60.firebaseapp.com",
    projectId: "chat-with-pdf-challenge-47d60",
    storageBucket: "chat-with-pdf-challenge-47d60.appspot.com",
    messagingSenderId: "591304209975",
    appId: "1:591304209975:web:aec12acff84ee3f4a8f1b2"
  };

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

  const db = getFirestore(app);
  cons