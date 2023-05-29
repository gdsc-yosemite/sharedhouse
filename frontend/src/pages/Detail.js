
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useMemo } from "react";
import GoogleMapReact from 'google-map-react';
import { getAuth} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import '../App.css';
import '../css_pages/Detail.css';

function Detail() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [currentUser, setUser] = useState();
  const [inputs, setInputs] = useState({
    listing_title: "",
    address: "",
    property_sqft: null,
    lease_start_date: "",
    location: "",
    listing_price: null,
    lease_end_date: "",
    description: "",
    contact_info: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
        console.log("uid", currentUser)
      } else {
        setUser(null);
        alert("Please login before posting");
        navigate("/login")
        console.log("user is logged out")
      }
    });
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const postListing = (event) => {
    event.preventDefault();
    console.log("hi", inputs);
    var data = {
      type: 'listing',
      data: inputs,
      curUser: currentUser
    }
    fetch('http://localhost:3001/firestore', {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            body: JSON.stringify(data)
        // }).then(response => {
        //   console.log(response.text())
        //   if(response.ok) {
        //     return response.json();
        //   } else {
        //     throw new Error ('Someting went wrong...')
        //   }
        }).then((response) => response.json())
          .then((json) => {
            console.log(json)
          });
  }

    const defaultProps = {
      center: {
        lat: 10.99835602,
        lng: 77.01502627
      },
      zoom: 11
    };


    const AnyReactComponent = ({ text }) => <div>{text}</div>;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDR50KAIMGCR7LtDM1Duv3hQY28OJrvsjE" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
};


export default Detail;
