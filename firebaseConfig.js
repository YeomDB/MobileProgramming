import firebase from 'firebase'
// import { initializeFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAOOpp9EFZRhCCINj-jfexjiJwbFFXw3Io",
  authDomain: "mobile-programming-19e7d.firebaseapp.com",
  projectId: "mobile-programming-19e7d",
  storageBucket: "mobile-programming-19e7d.appspot.com",
  messagingSenderId: "1031583846835",
  appId: "1:1031583846835:web:2a80ad640a3b80075bbbc6",
  measurementId: "G-MPL5R4CDSZ"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

export { db }