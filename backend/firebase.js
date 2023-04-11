// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// import { getFirestore } from "firebase/firestore";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

module.exports = function(app){
    var admin = require("firebase-admin");
    var serviceAccount = require("./sharedhouse-yosemite-firebase-adminsdk-5ln2b-5f618a51cb.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    require('./firestore')(app, admin);

    /*
    const firebase = require("firebase/app");

    require("firebase/auth");
    require("firebase/firestore");

    const firebaseConfig = {
        apiKey: "AIzaSyDT-MnGUOVt_DH6qLonDqZYTmTs8dIm6Sc",
        authDomain: "sharedhouse-yosemite.firebaseapp.com",
        projectId: "sharedhouse-yosemite",
        storageBucket: "sharedhouse-yosemite.appspot.com",
        messagingSenderId: "913316799799",
        appId: "1:913316799799:web:560e1c5ea73341a2dce6b2",
        measurementId: "G-8S2H8126XZ"
    };

    // Initialize Firebase
    const fb_app = firebase.initializeApp(firebaseConfig);
    const analytics = fb_app.analytics();
    */
}
