
import React, { useState } from "react";
import '../App.css';

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

  function postListing() {
    console.log(inputs);
    fetch('http://localhost:3001/firestore', {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
            body: inputs
        }).then(response => {
          console.log(response.text())
          if(response.ok) {
            return response.json();
          } else {
            throw new Error ('Someting went wrong...')
          }
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
        placeholder="listing name"
        value={inputs.listing_title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="address"
        placeholder="address"
        value={inputs.address}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="property_SqFt"
        placeholder="property size (sqft)"
        value={inputs.property_SqFt}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="lease_start_date"
        placeholder="lease start date"
        value={inputs.lease_start_date}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="location"
        placeholder="location"
        value={inputs.location}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="listing_price"
        placeholder="price"
        value={inputs.listing_price}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="lease_end_date"
        placeholder="lease end date"
        value={inputs.lease_end_date}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="lease_rate"
        placeholder="rate"
        value={inputs.lease_rate}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        placeholder="description"
        value={inputs.description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="contact_info"
        placeholder="contact"
        value={inputs.contact_info}
        onChange={handleInputChange}
      />
      <button onClick={postListing()}>
        Post
      </button>
    </div>
  );
}

export default Listing
