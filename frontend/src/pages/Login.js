
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
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
  const [currentUser, setUser] = useState();

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
    document.getElementById("registration_form").style.display = "block";
    document.getElementById("login_form").style.display = "none";
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
        document.getElementById('logout').style.display = 'block';
        document.getElementById("registration_form").style.display = "none";
		    console.log(user);
		    alert("Registered successfully!");
		    // ...
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
      document.getElementById("login_form").style.display = "none";
      console.log(user);
      alert(user.email+" Login successfull!");
      document.getElementById('logout').style.display = 'block';
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });		  		  
  }

  function logout() {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('Sign-out successful.');
      alert('Sign-out successful.');
      document.getElementById('logout').style.display = 'none';
      document.getElementById("login_form").style.display = "block";
    }).catch((error) => {
      // An error happened.
      console.log('An error happened.');
    });		  		  
  }

  return (
    <div>
      <head>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" ></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
	<link rel="stylesheet" href="login.css"></link>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<title>Login Page</title>
</head>
<body style={{textAlign:'center'}}>
  <header>
	<h1>Yosemite Housing Tool</h1>
  </header>
  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse" aria-expanded="false" aria-controls="navbar">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
  </button>
<div class="navbar-collapse collapse"  >
    <ul class="nav navbar-nav navbar-right">
         <li><a href="#" id="logout" style={{display: 'none'}} onClick={logout}>Log Out</a></li>
    </ul>
</div>
<div class="container" style={{marginLeft: '360px', marginTop: '10%'}}>	
  <form style = {{display:'none'}}name="registration_form" id="registration_form" method="post" action="#" enctype="multipart/form-data" >
    <div class="row">
      <div class="col-sm-4">
        <div class="form-group">
            <label for="email" style={{fontSize: '20px'}}>Email</label>
          <input type="text" name="email" id="email" class="form-control" placeholder="Enter your email"></input>
        </div>
        
        <div class="form-group">
            <label for="password" style={{color: 'white',fontSize: '20px'}}>Password</label>
          <input type="password" name="password" id="password" class="form-control"  placeholder="Enter your password"></input>
        </div>
        <button type="button" id="register" name="register" class="btn btn-success" onClick={registerNewUser}>Register Now</button>
      </div>
    </div>
	</form>
	<form style = {{display:'block'}} name="login_form" id="login_form" method="post" action="#" enctype="multipart/form-data" >
    <div class="col-sm-4">
      <div class="form-group">
          <label for="email" style={{fontSize: '20px'}}>Email</label>
        <input type="text" name="login_email" id="login_email" class="form-control" placeholder="Enter your email"></input>
      </div>
      
      <div class="form-group">
          <label for="password" style={{color: 'white', fontSize: '20px'}}>Password</label>
        <input type="password" name="login_password" id="login_password" class="form-control"  placeholder="Enter your password"></input>
      </div>
      <button type="button" id="login" name="login" class="btn btn-success" onClick = {login}>Login</button>
      <button type="button" style={{marginLeft :'10px'}} id="registerNow" name="registerNow" class="btn btn-success" onClick={displayRegistration}>Don't Have an account</button>
    </div>
  </form>
</div>
</body>
	<script src="login.js" type="module"></script>
    </div>
  )
}

export default Login
