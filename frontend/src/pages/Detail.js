
import React, { useState, useEffect, useMemo } from 'react';
import Geocode from "react-geocode";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import queryString from 'query-string';
import GoogleMapReact from 'google-map-react';
import '../App.css';
import '../css_pages/Detail.css';

function Detail() {
  const auth = getAuth();


  /** All the listings */
  const location = useLocation();
  const [listing, setListing] = useState({});
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

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
      var address = listing.address +' '+ listing.city + listing.state;
      Geocode.setApiKey("AIzaSyDR50KAIMGCR7LtDM1Duv3hQY28OJrvsjE");
      Geocode.fromAddress(address).then(
        (response) => {
          console.log('coordinates', [response.results[0].geometry.location.lat, response.results[0].geometry.location.lng]);
          changeDef(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng);
        },
        (error) => {
          console.error(error);
        }
      );
    }, [listing]);
    
    function changeDef(lati, long)
    {
      setLat(lati);
      setLong(long);
    }

    return (
      <div className="details">
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

          <div>
            debugging
            <div>{lat}</div>
            <div>{long}</div>
          </div>

          <div style={{ height: '50vh', width: '50%' }} id="mapmarker">
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyDR50KAIMGCR7LtDM1Duv3hQY28OJrvsjE" }}
              defaultCenter={{lat: lat, lng: long}}
              defaultZoom={11}>
              <AnyReactComponent 
                lat={lat}
                lng={long}
                text = "Your Listing"
              />
            </GoogleMapReact>
          </div>

        </div>
      )}
      </div>
    );
}

export default Detail
