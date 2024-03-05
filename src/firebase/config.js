
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJuEtwDEVJMZ4cB9xFdYHXzSPbQ3AMeuM",
  authDomain: "oxford-parking.firebaseapp.com",
  projectId: "oxford-parking",
  storageBucket: "oxford-parking.appspot.com",
  messagingSenderId: "1002370972977",
  appId: "1:1002370972977:web:fc11389e66651834bdc410",
  measurementId: "G-2RWSQQJN09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default db;