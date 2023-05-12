import React, { useState, useEffect } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import '../App.css';

function MyListings() {
    const [load, reload] = useState([]);
    /** All the listings */
    const [listings, loadListings] = useState([]);
    /** Ids of all loaded listings */
    const [ids, loadIds] = useState(new Set());

    const auth = getAuth();
    const [currentUser, setUser] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                /** set user */
                var userid = user.uid;
                setUser(userid);

                /** retrieve listings */
                const url = `http://localhost:3001/firestore/my-listings?userId=${userid}`;
                console.log("url: ", url);
                fetch(url, {
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
                    reload(0);
                    console.log("listings", listings);
                    console.log("ids: ", ids);
                });
            } else {
              setUser(null);
              console.log("user is logged out")
            }
        });
    }, [])

    function delListing(id) {
        console.log("delete", id);
        fetch('http://localhost:3001/firestore/delete', {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            body: JSON.stringify({ id: id }),
        }).then((response) => response.json())
          .then((json) => {
            console.log(json)
        });
    }

  return (
    <div className="listings">
        <div>Listings</div>
        {
        listings.map((listing)=> (
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

                <button onClick={() => delListing(listing.id)}>Delete</button>
            </div>
        ))
        }
  </div>
  )
}

export default MyListings