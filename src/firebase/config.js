import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCaAyd_3avAGAxRBBMjpeNBhkgI0pR_Lhg",
  authDomain: "learning-programming-c293a.firebaseapp.com",
  projectId: "learning-programming-c293a",
  storageBucket: "learning-programming-c293a.appspot.com",
  messagingSenderId: "728992698287",
  appId: "1:728992698287:web:d2ed4f0ea8f748c37b695a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };