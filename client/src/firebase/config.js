import { initializeApp } from "firebase/app";

// access values from .env file 
const env = import.meta.env;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:env.VITE_ApiKey,
    authDomain:env.VITE_AuthDomain,
    projectId:env.VITE_ProjectId,
    storageBucket:env.VITE_StorageBucket,
    messagingSenderId:env.VITE_MessagingSenderId,
    appId:env.VITE_AppId,
    databaseURL:env.VITE_DatabaseURL
};


// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);