import React from 'react';
import logo from '../assets/sharedHouseLogo.svg';
import '../css_pages/Navbar.css';

function Navbar() {
  return (
  <header className='content'>
    <img class="logo "src={logo} alt="" />
      <nav class="nav_elements">
        <ul class="nav-links">
          <label for="checkbox_toggle" class="hamburger">&#9776;</label>
          <div class="menu">

            <li><a href="/">Home</a></li>
            <li><a href="/post">Post</a></li>
            <li><a href="/">Contact</a></li>
          </div>
        </ul>
      </nav>
      <a class="login" href="/login"><button>Login</button></a>
  </header>
  )
}

export default Navbar