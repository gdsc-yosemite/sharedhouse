import React, { useState, useEffect } from "react";
import '../App.css';

function Listings() {
  /** All the listings */
  const [listings, loadListings] = useState([]);
  /** current listings */
  const [filteredListings, setFiltered] = useState([]); 
  /** Ids of all loaded listings */
  const [ids, loadIds] = useState(new Set());
  /** Number of listings currently loaded */
  const [numListings, setNum] = useState(0);

    /** initially load 50? listings */
    useEffect(() => {
        fetch('http://localhost:3001/firestore/listings/initial', {
            method: 'GET',
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        }).then((response) => response.json())
          .then((json) => {
            json.map(element => {
              if (!ids.has(element.id)) {
                ids.add(element.id)
                listings.push(element);
              }
            })
            setFiltered(listings);
            setNum(numListings => numListings + 50);
            console.log("listings", listings);
            console.log("ids: ", ids);
          });
    })

    /** Load More Listings */
    const loadMore = (event) => {
      event.preventDefault();
      fetch('http://localhost:3001/firestore/listings/more', {
        method: 'GET',
        headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
    }).then((response) => response.json()) 
      .then((json) => {
        json.map(element => {
          if (!ids.has(element.id)) {
            ids.add(element.id)
            listings.push(element);
          }
        })
        setFiltered(listings);
        setNum(numListings => numListings + 50);
        console.log("listings", listings);
        console.log("ids: ", ids);
      });
    }

    return (
      <div className="listings">
        <div>Listings</div>
        {
          filteredListings.map((listing)=> (
            <div className="listing">
              <hr></hr>
              <div className="listing-name">{listing.name}</div>
              <div className="listing-address">{listing.address}</div>
              <div className="listing-location">{listing.location}</div>
              <div className="listing-sqft">{listing.sqft}</div>
              <div className="listing-rate">{listing.rate}</div>
              <div className="listing-start-date">{listing.start_date}</div>
              <div className="listing-end-date">{listing.end_date}</div>
              <div className="listing-description">{listing.description}</div>
              <div className="listing-contact">{listing.contact}</div>
            </div>
          ))
        }
        <input type="submit" onClick={loadMore}/>
      </div>
    );
}

export default Listings