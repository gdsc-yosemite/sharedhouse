
import React, { useState } from "react";
import '/Users/macbookairm1/Documents/CS Projects/Shared-house-proj/sharedhouse/frontend/src/App.css';
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
        </div>
        
      );
}

export default Listing
