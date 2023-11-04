import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDbGq-bwrgf2O1zRfwT7KM8Mi_saCvkdu8",
  authDomain: "icar-backend-7eb6f.firebaseapp.com",
  projectId: "icar-backend-7eb6f",
  storageBucket: "icar-backend-7eb6f.appspot.com",
  messagingSenderId: "1033200359265",
  appId: "1:1033200359265:web:699eb1213872e5f996d720",
  measurementId: "G-S5CWYNND7Y",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
// const analytics = getAnalytics(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
