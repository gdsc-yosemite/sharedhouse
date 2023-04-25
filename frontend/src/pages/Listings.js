import React, { useState, useEffect } from "react";
import '../App.css';

function Listings() {
  const listings = [];
  const [ids, loadIds] = useState(new Set());

    /** initially load 50? listings */
    useEffect(() => {
        fetch('http://localhost:3001/firestore/listings', {
            method: 'GET',
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        }).then((response) => response.json())
          .then((json) => {
            const newSet = ids;
            json.map(element => {
              if (!newSet.has(element.id)) {
                newSet.add(element.id)
                listings.push(element);
              }
            })
            loadIds(newSet);
            console.log("listings", listings);
            console.log("ids: ", ids);
          });
    })

    return (
      <div className="listings">
        <div>Listings</div>
        {
          listings.map((listing)=> (
            <div className="listing">
              <div className="listing-title">{listing.name}</div>
            </div>
          ))
        }
      </div>
    );
}

export default Listings