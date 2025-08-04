import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAKk4zZBMerlXwPXEzmeYLcWSqq5oRs-Fg",
    authDomain: "to-do-list-50c52.firebaseapp.com",
    projectId: "to-do-list-50c52",
    storageBucket: "to-do-list-50c52.firebasestorage.app",
    messagingSenderId: "154543643830",
    appId: "1:154543643830:web:0f2d4462271e39db895a17",
    measurementId: "G-Z127Q3PW1P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);