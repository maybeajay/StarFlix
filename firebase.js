// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyA89wQymqN55JOvTSGMQO3yuzFDOorbgVQ",
  authDomain: "starflix-8ebe3.firebaseapp.com",
  databaseURL: "https://starflix-8ebe3-default-rtdb.firebaseio.com",
  projectId: "starflix-8ebe3",
  storageBucket: "starflix-8ebe3.appspot.com",
  messagingSenderId: "724562316648",
  appId: "1:724562316648:web:a9a3b54108e888d9ce1add"
};

// Initialize Firebase
export const FIREBAE_APP = initializeApp(firebaseConfig);
export const FIREBAE_AUTH = getAuth(FIREBAE_APP);