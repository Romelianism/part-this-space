// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { isBrowser } from "../config";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDl3qIuVqQ1Ym4kU3ZEDxw-MOR0gV_o0dk",

  authDomain: "partthisspaceid.firebaseapp.com",

  projectId: "partthisspaceid",

  storageBucket: "partthisspaceid.appspot.com",

  messagingSenderId: "106253855718",

  appId: "1:106253855718:web:e5ba8d783680fa5ef60427",

  measurementId: "G-TEN3DQHNHP",
};

// Initialize Firebase

export const app = isBrowser ? initializeApp(firebaseConfig) : undefined;

export const analytics = app ? getAnalytics(app) : undefined;

export const auth = app ? getAuth(app) : undefined;
