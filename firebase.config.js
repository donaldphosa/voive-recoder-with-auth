import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBp_xH0Sp81UUVYfeCtZWqQLuqj6Jp8wiQ",
  authDomain: "voice-recoder-b4e3b.firebaseapp.com",
  projectId: "voice-recoder-b4e3b",
  storageBucket: "voice-recoder-b4e3b.appspot.com",
  messagingSenderId: "1080774736041",
  appId: "1:1080774736041:web:6b2b2331bf7afa501411b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)