// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

module.exports = function(app){
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
    const fb_app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(fb_app);

    const auth = getAuth();

    let db = getFirestore(fb_app);

        app.post('/api', (req, res) => {
            const text = req.body.name
            res.send({ message: text })
            db.collection("names").add({
                name: text
            }).then((docRef) => {
                console.log("Docment written with ID: ", docRef.id);
            }).catch((error) => {
                console.error("error adding document: ", error);
            })
        })

}
