import React from 'react';
import { useNavigate } from "react-router-dom";
import findbtn from "../assets/find-btn.svg"
import '../App.css';
import '../css_pages/Home.css';
import landing from "../assets/landin.png";

function Home() {
  const navigate = useNavigate();

  function listings() {
    navigate(`/listings`);
  }

  return (
    <div className="container">
      <div className="main-text">
        <div className="big-title">
            <div>Housing</div>
            <div>doesn't have to</div>
            <div>be permanent</div>
        </div>

        <div className="sub-title">
          <div>Find apartments and homes to</div>
          <div>to sublease for only the time <span className="spec-text">YOU NEED</span>.</div>
        </div>

        <img onClick={listings} className="findbtn" src={findbtn}/>
      </div>
      
      <img className="home-img" src={landing} />
    </div>
  )
}

export default Home
