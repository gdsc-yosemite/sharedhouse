
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import '../css_pages/Login.css';
import housepic from '../assets/house-pic.png';

const firebaseConfig = {
  apiKey: "AIzaSyDT-MnGUOVt_DH6qLonDqZYTmTs8dIm6Sc",
  authDomain: "sharedhouse-yosemite.firebaseapp.com",
  projectId: "sharedhouse-yosemite",
  storageBucket: "sharedhouse-yosemite.appspot.com",
  messagingSenderId: "913316799799",
  appId: "1:913316799799:web:560e1c5ea73341a2dce6b2",
  measurementId: "G-8S2H8126XZ"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

function Login() {
  const navigate = useNavigate();

  const [currentUser, setUser] = useState();
  const [view, setView] = useState("login");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("uid", currentUser)
      } else {
        setUser(null);
        console.log("user is logged out")
      }
    });
  })

  function displayRegistration() {
    setView("registration");
  }

  function registerNewUser() {
      const auth = getAuth();
      var email =  document.getElementById("email").value;
		  var password = document.getElementById("password").value;
		  //For new registration
		  createUserWithEmailAndPassword(auth, email, password)
		  .then((userCredential) => {
		    // Signed in 
		    const user = userCredential.user;
		    console.log(user);
		    alert("Registered successfully!");
		    // ...
        navigate(`/`);
		  })
		  .catch((error) => {
		    const errorCode = error.code;
		    const errorMessage = error.message;
		    // ..
		    console.log(errorMessage);
		    alert(error);
		  });
  }

  function login() {
    var email =  document.getElementById("login_email").value;
    var password = document.getElementById("login_password").value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      // ...
      navigate(`/`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });		  		  
  }

  // function logout() {
  //   signOut(auth).then(() => {
  //     // Sign-out successful.
  //     console.log('Sign-out successful.');
  //     document.getElementById('logout').style.display = 'none';
  //     document.getElementById("login_form").style.display = "block";
  //     navigate(`/`);
  //   }).catch((error) => {
  //     // An error happened.
  //     console.log('An error happened.');
  //   });		  		  
  // }

  return (
    <div>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" ></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <title>Login Page</title>
      </head>

      <body>
        {/* <a href="#" id="logout" onClick={logout}>Log Out</a> */}
        <div class="container">	
          <div className="sub-container">
            <img className="house-img" src={housepic}/>

            {/** REGISTER */
            view=="registration" && (
            <div className="register-text text">
              <form name="registration_form" id="registration_form" method="post" action="#" enctype="multipart/form-data" >

              <div className="title">Register</div>

                <div class="row">
                  <div class="col-sm-4 fill-in">
                    <div class="form-group">
                        <label for="email">Email: </label>
                      <input type="text" name="email" id="email" class="form-control" placeholder="Enter your email"></input>
                    </div>
                    
                    <div class="form-group">
                        <label for="password"> Password: </label>
                      <input type="password" name="password" id="password" class="form-control"  placeholder="Enter your password"></input>
                    </div>

                    <button type="button" id="register" name="register" class="btn btn-success login-register" onClick={registerNewUser}>Register Now</button>
                  </div>
                </div>
              </form>
            </div>
            )}

            {/** LOGIN */
              view=="login" && (
            <div className="login-text text">
              <form name="login_form" id="login_form" method="post" action="#" enctype="multipart/form-data" >

              <div className="title">Login</div>

                <div class="col-sm-4 fill-in">
                  <div class="form-group">
                    <label for="email">Email: </label>
                    <input type="text" name="login_email" id="login_email" class="form-control" placeholder="Enter your email"></input>
                  </div>
                  
                  <div class="form-group">
                    <label for="password">Password: </label>
                    <input type="password" name="login_password" id="login_password" class="form-control"  placeholder="Enter your password"></input>
                  </div>
                  
                  <button type="button" id="login" name="login" class="btn btn-success login-register" onClick = {login}>Login</button>
                  <div id="registerNow" name="registerNow" class="btn btn-success">Don't Have an account? | <span onClick={displayRegistration} className="register-link">Create Account</span></div>
                </div>
              </form>
            </div>
              )}

          </div>
        </div>
      </body>
    </div>
  )
}

export default Login
