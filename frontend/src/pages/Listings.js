import React, { useState, useEffect } from "react";
import '../App.css';

function Listings() {
  const [listings, loadListings] = useState([]);

    /** initially load 50? listings */
    useEffect(() => {
        fetch('http://localhost:3001/firestore/listings', {
            method: 'GET',
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        }).then((response) => response.json())
          .then((json) => {
            // json.map(element => {
            //   listings.push(element);
            // })
            // loadListings(json); // THIS DOESNT WORK
            console.log(listings);
          });
    })

    return (
      <div className="listings">
        hi
        {
          // listings.map((listing)=> (
          //   <div class="listing">
          //     <div class="listing-title">{listing.name}</div>
          //   </div>
          // ))
        }
      </div>
    );
}

export default Listings