
import React, { useState } from "react";
import '../App.css';
import './Listings.css';

function Listing() {
  const [inputs, setInputs] = useState({
    listing_title: "",
    address: "",
    property_SqFt: "",
    lease_start_date: "",
    location: "",
    listing_price: "",
    lease_end_date: "",
    lease_rate: "",
    description: "",
    contact_info: "",
  });

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
      data: inputs
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
      return (
        <div>
          <input
            type="text"
            name="listing_title"
            value={inputs.listing_title}
            onChange={handleInputChange}
            className="input-text"
          />
          <input
            type="text"
            name="address"
            value={inputs.address}
            onChange={handleInputChange}
            className="input-text"
          />
          <input
            type="text"
            name="property_SqFt"
            value={inputs.property_SqFt}
            onChange={handleInputChange}
            className="input-text"
          />
          <input
            type="text"
            name="lease_start_date"
            value={inputs.lease_start_date}
            onChange={handleInputChange}
            className="input-text"
          />
          <input
            type="text"
            name="location"
            value={inputs.location}
            onChange={handleInputChange}
            className="input-text"
          />
          <input
            type="text"
            name="listing_price"
            value={inputs.listing_price}
            onChange={handleInputChange}
            className="input-text"
          />
          <input
            type="text"
            name="lease_end_date"
            value={inputs.lease_end_date}
            onChange={handleInputChange}
            className="input-text"
          />
          <input
            type="text"
            name="lease_rate"
            value={inputs.lease_rate}
            onChange={handleInputChange}
            className="input-text"
          />
          <input
            type="text"
            name="description"
            value={inputs.description}
            onChange={handleInputChange}
            className="input-text"
          />
          <input
            type="text"
            name="contact_info"
            value={inputs.contact_info}
            onChange={handleInputChange}
            className="input-text"
          />
           <input type="submit" onClick={postListing}/>
        </div>
      );
}

export default Listing
