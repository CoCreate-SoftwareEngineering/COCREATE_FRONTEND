import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBMOHTGE0fcstfMl6p1DoWRCUwnqXdjuYQ",
    authDomain: "cocreate-417718.firebaseapp.com",
    projectId: "cocreate-417718",
    storageBucket: "cocreate-417718.appspot.com",
    messagingSenderId: "528435234567",
    appId: "1:528435234567:web:831418ba63e797813ce7a2",
    measurementId: "G-ZBEL7FDTPL"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const storage = getStorage(app); // Use getStorage() to get Firebase Storage instance


export { app, storage, auth };