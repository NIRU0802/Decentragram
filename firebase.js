import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCs8lHuCzycSKmyzK0r2Ccp1IzCeLW0q8",
  authDomain: "insta-2b1fe.firebaseapp.com",
  projectId: "insta-2b1fe",
  storageBucket: "insta-2b1fe.appspot.com",
  messagingSenderId: "741061588791",
  appId: "1:741061588791:web:b7a8083e0b728435eaccb2",
  measurementId: "G-64BW4YWLEL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
