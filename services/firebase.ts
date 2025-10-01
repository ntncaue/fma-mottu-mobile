import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

//const { getReactNativePersistence } = require("firebase/auth") as any;

const firebaseConfig = {
  apiKey: "AIzaSyA5Ye16imLfwwBk78-G15ngKMKeniJ37Xw",
  authDomain: "mottu-fma-app.firebaseapp.com",
  projectId: "mottu-fma-app",
  storageBucket: "mottu-fma-app.firebasestorage.app",
  messagingSenderId: "107072226761",
  appId: "1:107072226761:web:6ef22cadcd30e0d3339418"
};

const app = initializeApp(firebaseConfig);


export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
