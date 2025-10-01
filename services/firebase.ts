import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import * as firebaseAuth from 'firebase/auth';
import { initializeAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA5Ye16imLfwwBk78-G15ngKMKeniJ37Xw",
  authDomain: "mottu-fma-app.firebaseapp.com",
  projectId: "mottu-fma-app",
  storageBucket: "mottu-fma-app.firebasestorage.app",
  messagingSenderId: "107072226761",
  appId: "1:107072226761:web:6ef22cadcd30e0d3339418"
};
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: reactNativePersistence(AsyncStorage)
});
