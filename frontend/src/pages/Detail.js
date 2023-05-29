
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import queryString from 'query-string';
import '../App.css';
import '../css_pages/Detail.css';

function Detail() {
  /** All the listings */
  const location = useLocation();
  const [listing, setListing] = useState({});

    /** initially load 50? listings */
    useEffect(() => {
      const url = new URL(window.location.href);
        const queryParams = new URLSearchParams(url.search);
        fetch(`http://localhost:3001/firestore/detail?id=${queryParams.get('id')}`, {
            method: 'GET',
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        }).then((response) => response.json())
          .then((json) => {
            setListing(json);
          });
    }, [])

    useEffect(() => {
      console.log(listing.images);
    }, [listing]);

    return (
      <div className="details">
        <div>More Information:</div>
        {Object.keys(listing).length > 0 && (
        <div className="listing">
          <hr />
          <div className="listing-name">{listing.name}</div>
          <div className="listing-address">{listing.address}</div>
          <div className="listing-location">{listing.location}</div>
          <div className="listing-rate">{listing.rate}</div>
          <div className="listing-start-date">{listing.start_date}</div>
          <div className="listing-end-date">{listing.end_date}</div>
          {listing.images.map((image, index) => (
            <img className="listing-img" key={index} src={image} alt={`Image ${index}`} />
          ))}
        </div>
      )}
      </div>
    );
}

export default Detail
