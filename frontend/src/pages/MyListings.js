import React, { useState, useEffect } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import '../App.css';
import '../css_pages/MyListings.css';

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
            window.location.reload()
        });
    }

  return (
    <div className="listings">
        <div className="title">My Listings</div>
        {
        listings.map((listing)=> (
            <div className="listing">
                <div className="listing-header">
                    <div className="listing-name">{listing.name}</div>
                    <div className="listing-contact-info">
                            <div className="listing-display-name">{listing.display_name}</div>
                            <div className="listing-contact"><span className="listing-label">Contact:</span> {listing.contact}</div>
                    </div>
                </div>

                <div className="listing-text">
                    <div className="listing-left">
                        <div className="listing-address-info listing-info">
                            <div className="listing-label">Address:</div>
                            <div className="listing-address">
                                <div className="listing-address-1">{listing.address} 
                                    { listing.room_appt_num != "" && (
                                        <span>, RM {listing.room_appt_num}</span>
                                    )}
                                </div>
                                <div className="listing-address-2">{listing.city}, {listing.state} {listing.zip}</div>
                            </div>
                        </div>

                        <div className="listing-date-info listing-info">
                            <div className="listing-start-date"><span className="listing-label">Start Date:</span> {listing.start_date}</div>
                            <div className="listing-end-date"><span className="listing-label">End Date:</span> {listing.end_date}</div>
                        </div>

                        <div className="listing-info">
                            <div className="listing-rate"><span className="listing-label">Rate:</span> ${listing.rate}/mo.</div>
                        </div>
                        </div>

                    <div className="listing-right">
                        <div className="listing-type-info listing-info">
                            <div className="listing-property-type"><span className="listing-label">Property Type:</span> {listing.property_type}</div>
                            <div className="listing-type"><span className="listing-label">Listing Type:</span> {listing.listing_type}</div>
                        </div>

                        <div className="listing-amenity-info listing-info">
                            <div className="listing-bedroom"><span className="listing-label"># of Bedrooms:</span> {listing.bedroom}</div>
                            <div className="listing-bathroom"><span className="listing-label"># of Bathrooms</span> {listing.bathroom}</div>
                            <div className="listing-parking"><span className="listing-label">Parking</span> {listing.parking}</div>
                        </div>

                        <div className="listing-info">
                        <div className="listing-sqft"><span className="listing-label">Property sqft:</span> {listing.sqft}</div>
                        </div>
                    </div>
                </div>

                <button className="button-delete" onClick={() => delListing(listing.id)}>Delete</button>
            </div>
        ))
        }
  </div>
  )
}

export default MyListings