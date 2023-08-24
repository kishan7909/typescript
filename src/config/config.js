import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app);
