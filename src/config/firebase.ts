import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCCKYIY5PjPOkcbzR-v60_YeYp2kUJGVjs",
    authDomain: "anih-865ff.firebaseapp.com",
    projectId: "anih-865ff",
    storageBucket: "anih-865ff.firebasestorage.app",
    messagingSenderId: "342562577714",
    appId: "1:342562577714:web:14790232365bbdcc500b2b",
    measurementId: "G-BHX2FZ0RT9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);