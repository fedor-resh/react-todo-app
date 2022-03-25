
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

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
// const analytics = getAnalytics(app);

// const auth = getAuth(firebaseConfig)
const db = getFirestore(app)
export default db