
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth,GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCMt5hgfrFMdv_QWHqoN8Op3wRML9JJjXQ",
    authDomain: "react-todo-app-e278c.firebaseapp.com",
    projectId: "react-todo-app-e278c",
    storageBucket: "react-todo-app-e278c.appspot.com",
    messagingSenderId: "102478981633",
    appId: "1:102478981633:web:8dfb772d5a4e4cdb6d6e00",
    measurementId: "G-E03ZE24G2N"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();