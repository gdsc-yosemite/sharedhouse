import React, { useState, useEffect } from "react";
import '../App.css';

function Listings() {
    const [listings, loadListings] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/firestore/listings', {
            method: 'GET',
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        }).then((response) => response.json())
          .then((json) => {
            loadListings()
            console.log(json)
          });
    })
}

export default Listings