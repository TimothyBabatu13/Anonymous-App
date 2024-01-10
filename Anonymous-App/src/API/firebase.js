// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCF3XLtzgD8wRoveI0Byf78oAhVt1cfWUg",
  authDomain: "anonymous-app-backend.firebaseapp.com",
  projectId: "anonymous-app-backend",
  storageBucket: "anonymous-app-backend.appspot.com",
  messagingSenderId: "275458668783",
  appId: "1:275458668783:web:e5faccf6a08c8b814dc31a",
  measurementId: "G-4L529544DM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app
const analytics = getAnalytics(app);