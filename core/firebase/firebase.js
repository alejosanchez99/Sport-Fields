import firebase from "firebase/app"
import "firebase/firebase-storage"

const firebaseConfig = {
    apiKey: "AIzaSyBb_gOguL75XmvqkeWyLYennGMWrFvTeyM",
    authDomain: "sport-fields-28877.firebaseapp.com",
    projectId: "sport-fields-28877",
    storageBucket: "sport-fields-28877.appspot.com",
    messagingSenderId: "794300963414",
    appId: "1:794300963414:web:31ab1c63792295e5b279f7",
    measurementId: "G-T64QBEE57Q"
  };

  const initializeApp = firebase.initializeApp(firebaseConfig)
  firebase.analytics()
  
export const firebaseApp = initializeApp