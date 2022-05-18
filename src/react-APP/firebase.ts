// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore"
//import Rebase from 're-base';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBOV5nMuaHzYwRrditXt3bpF1AV7kU4nJo',
  authDomain: 'react-training-b1dd3.firebaseapp.com',
  projectId: 'react-training-b1dd3',
  storageBucket: 'react-training-b1dd3.appspot.com',
  messagingSenderId: '590529802910',
  appId: '1:590529802910:web:6063e05c9f7d7cde8e418f'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const base = getDatabase(firebaseApp);// создали БД
const db = getFirestore();// создали Firestore

export { firebaseApp };
export default db;