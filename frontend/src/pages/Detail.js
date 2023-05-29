
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
        <div>More Information:</div>
        {Object.keys(listing).length > 0 && (
        <div className="listing">
          <hr />
          <div className="listing-name">{listing.name}</div>

          <div className="listing-address">{listing.address}</div>
          <div className="listing-room-appt-num">{listing.room_appt_num}</div>
          <div className="listing-city">{listing.city}</div>
          <div className="listing-state">{listing.state}</div>
          <div className="listing-zip">{listing.zip}</div>

          <div className="listing-start-date">{listing.start_date}</div>
          <div className="listing-end-date">{listing.end_date}</div>

          <div className="listing-rate">{listing.rate}</div>
          <div className="listing-sqft">{listing.sqft}</div>

          <div className="listing-property-type">{listing.property_type}</div>
          <div className="listing-type">{listing.listing_type}</div>

          <div className="listing-bedroom">{listing.bedroom}</div>
          <div className="listing-bathroom">{listing.bathroom}</div>
          <div className="listing-parking">{listing.parking}</div>

          <div className="listing-display-name">{listing.display_name}</div>
          <div className="listing-contact">{listing.contact}</div>

          <div className="listing-desc">{listing.description}</div>

          {listing.images.map((image, index) => (
            <img className="listing-img" key={index} src={image} alt={`Image ${index}`} />
          ))}

          <div style={{ height: '50vh', width: '50%' }}>
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
