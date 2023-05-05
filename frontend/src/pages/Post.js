
import React, { useState } from "react";
import '../App.css';
import './Post.css';

function Listing() {
  const [inputs, setInputs] = useState({
    listing_title: "",
    listing_price: "",
    address: "",
    room_or_appt_num: "",
    city: "",
    zip: "",
    property_sqft: "",
    lease_start_date: "",
    location: "",
    lease_end_date: "",
    description: "",
  });
  
  const [selectedOption, setSelectedOption] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
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
        <div class="property_info-container">
          <div className="row">
            <input
              type="text"
              name="listing_title"
              value={inputs.listing_title}
              onChange={handleInputChange}
              placeholder="Listing Title"
              className="standard-text"
            />
            <div>
              <select className="my-dropdown" id="property type" value={selectedOption} onChange={handleOptionChange}>
                <option value="">Property Type</option>
                <option value="Option 1">Appartment</option>
                <option value="Option 2">House</option>
              </select>
              <br />
            </div>
          </div>
          <div className="row">
            <div>
              <select className="my-dropdown" id="listing type" value={selectedOption} onChange={handleOptionChange}>
                <option value="">Listing Type</option>
                <option value="Option 1">Sub-Lease</option>
                <option value="Option 2">Lease Transfer</option>
              </select>
              <br />
            </div>
          <input
            type="text"
            name="listing price"
            value={inputs.listing_price}
            onChange={handleInputChange}
            placeholder="Listing Price"
            className="standard-text"
          />
          </div>
          <div className="row">
          <input
            type="text"
            name="address"
            value={inputs.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="standard-text"
          />
          <input
            type="text"
            name="room_or_appt_num"
            value={inputs.room_or_appt_num}
            onChange={handleInputChange}
            placeholder="Room/Apt #"
            className="room-apt"
          />
          <input
            type="text"
            name="city"
            value={inputs.city}
            onChange={handleInputChange}
            placeholder="City"
            className="standard-text"
          />
          <div>
              <select className="my-dropdown" id="state" value={selectedOption} onChange={handleOptionChange}>
                <option value="">State</option>
                <option value="Option 1">CA</option>
                <option value="Option 2">Put all other later</option>
              </select>
              <br />
          </div>
          <input
            type="text"
            name="Zip"
            value={inputs.zip}
            onChange={handleInputChange}
            placeholder="ZIP"
            className="standard-text"
            pattern="[0-9]*"
            inputMode="numeric"
          />
          </div>
          <div className="row">
            <div>
              <select className="my-dropdown" id="bedroom" value={selectedOption} onChange={handleOptionChange}>
                <option value="">Bedrooms</option>
                <option value="Option 1">1</option>
                <option value="Option 2">2</option>
                <option value="Option 3">3</option>
                <option value="Option 4">4</option>
                <option value="Option 5">5</option>
                <option value="Option 6">6</option>
              </select>
              <br />
            </div>
            <div>
              <select className="my-dropdown" id="bathroom" value={selectedOption} onChange={handleOptionChange}>
                <option value="">Bathrooms</option>
                <option value="Option 1">1</option>
                <option value="Option 2">2</option>
                <option value="Option 3">3</option>
                <option value="Option 4">4</option>
                <option value="Option 5">5</option>
                <option value="Option 6">6</option>
              </select>
              <br />
            </div>
          </div>
          <div className="row">
          <input
            type="text"
            name="property_sqft"
            value={inputs.property_SqFt}
            onChange={handleInputChange}
            placeholder="Property SqFt"
            className="standard-text"
          />
          <div>
              <select className="my-dropdown" id="parking" value={selectedOption} onChange={handleOptionChange}>
                <option value="">Parking</option>
                <option value="Option 1">Yes</option>
                <option value="Option 2">No</option>
              </select>
              <br />
            </div>
          </div>
          <div className="row">
          <input
            type="text"
            name="lease_start_date"
            value={inputs.lease_start_date}
            onChange={handleInputChange}
            placeholder="Lease Start Date (MM/DD/YYYY)"
            className="standard-text"
          />
          <input
            type="text"
            name="lease_end_date"
            value={inputs.lease_end_date}
            onChange={handleInputChange}
            placeholder="Lease End Date (MM/DD/YYYY)"
            className="standard-text"
          />
          </div>
          <div className="row">
          <input
            type="text"
            name="description"
            value={inputs.description}
            onChange={handleInputChange}
            placeholder="Property and Lease Description..."
            className="description"
          />
          </div>
           <input type="submit" onClick={postListing}/>
        </div>
        
      );
}

export default Listing
