
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import queryString from 'query-string';
import GoogleMapReact from 'google-map-react';
import '../App.css';
import '../css_pages/Detail.css';

function Detail() {
  const auth = getAuth();

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  /** All the listings */
  const location = useLocation();
  const [listing, setListing] = useState({});
  const AnyReactComponent = ({ text }) => <div>{text}</div>;

    /** initially listing */
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
        {Object.keys(listing).length > 0 && (
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

          <div className="listing-desc"><span className="listing-label">Description:</span> <span className="desc-text">{listing.description}</span></div>

          <div className="listing-images">
            {listing.images.map((image, index) => (
              <img className="listing-img" key={index} src={image} alt={`Image ${index}`} />
            ))}
          </div>

          <div className="listing-map" style={{ height: '50vh', width: '50%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyDR50KAIMGCR7LtDM1Duv3hQY28OJrvsjE" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}>
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        </div>
      )}
      </div>
    );
}

export default Detail
