import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwp5ZIuhP4udLUok7koMLzNDaFMpD-Nvk",
  authDomain: "vue-music-app-47093.firebaseapp.com",
  projectId: "vue-music-app-47093",
  storageBucket: "vue-music-app-47093.appspot.com",
  messagingSenderId: "1065917926293",
  appId: "1:1065917926293:web:329c96c9a3cae55c4b049c",
  measurementId: "G-DPNR6YD5JV",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection("users");

export { auth, db, usersCollection };
