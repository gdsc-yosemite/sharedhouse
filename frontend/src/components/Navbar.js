import React, { useState, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

import logo from '../assets/sharedHouseLogo.svg';
import '../css_pages/Navbar.css';

function Navbar() {
  const auth = getAuth();
  const [currentUser, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
        console.log("uid", currentUser)
      } else {
        setUser(null);
        console.log("user is logged out")
      }
    });
  })

  return (
  <header className='content'>
    <img class="logo "src={logo} alt="" />
      <nav class="nav_elements">
        <ul class="nav-links">
          <label for="checkbox_toggle" class="hamburger">&#9776;</label>
          {
              currentUser != null && (
                <div class="menu">
                  <li><a href="/">Home</a></li>
                  <li><a href="/listings">Listings</a></li>
                  <li><a href="/post">Post</a></li>
                  <li><a href="/mylistings">My Listings</a></li>
                  <li><a href="https://github.com/gdsc-yosemite/sharedhouse">Contact</a></li>
                </div>
              )
          }

          {
              currentUser == null && (
                <div class="menu">
                  <li><a href="/">Home</a></li>
                  <li><a href="/listings">Listings</a></li>
                  <li><a href="https://github.com/gdsc-yosemite/sharedhouse">Contact</a></li>
                </div>
              )
          }
        </ul>
      </nav>
      {
        currentUser == null && (
          <a class="login" href="/login"><button>Login</button></a>
        )
      }
      {
        currentUser != null && (
          <a class="login" href="/login"><button>Logout</button></a>
        )
      }
  </header>
  )
}

export default Navbar