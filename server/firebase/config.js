const { initializeApp } = require("firebase/app");

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_ApiKey,
    authDomain: process.env.FIREBASE_AuthDomain,
    projectId: process.env.FIREBASE_ProjectId,
    storageBucket: process.env.FIREBASE_StorageBucket,
    messagingSenderId: process.env.FIREBASE_MessagingSenderId,
    appId: process.env.FIREBASE_AppId,
    databaseURL: process.env.FIREBASE_DatabaseURL
};


// Initialize Firebase
module.exports = initializeApp(firebaseConfig);