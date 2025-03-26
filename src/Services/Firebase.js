import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAzcLMsnoV35g9W5zsaZ1ipBx0F62kHfZc",
    authDomain: "to-do-list-86f2e.firebaseapp.com",
    databaseURL: "https://to-do-list-86f2e-default-rtdb.firebaseio.com",
    projectId: "to-do-list-86f2e",
    storageBucket: "to-do-list-86f2e.firebasestorage.app",
    messagingSenderId: "1095242890940",
    appId: "1:1095242890940:web:770ad22b0412077bd69ab9"
  };


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
