import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-0D13P153D2",
};

const app = initializeApp(firebaseConfig);

let analytics;

isSupported()
  .then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized.");
    } else {
      console.warn("Firebase Analytics is not supported in this environment.");
    }
  })
  .catch((error) => {
    console.error("Error checking Firebase Analytics support:", error);
  });

const auth = getAuth(app);

export { analytics, app, auth };
