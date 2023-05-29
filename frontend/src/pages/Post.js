
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
  

  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedListingType, setSelectedListingType] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedBedroom, setSelectedBedroom] = useState("");
  const [selectedBathroom, setSelectedBathroom] = useState("");
  const [selectedParking, setSelectedParking] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handlePropertyTypeChange = (event) => {
    setSelectedPropertyType(event.target.value);
  };

  const handleListingTypeChange = (event) => {
    setSelectedListingType(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleBedroomChange = (event) => {
    setSelectedBedroom(event.target.value);
  };

  const handleBathroomChange = (event) => {
    setSelectedBathroom(event.target.value);
  };

  const handleParkingChange = (event) => {
    setSelectedParking(event.target.value);
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
          <div class="property_info_heading">
            Property Typeixe
          </div>
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
              <select className="my-dropdown" id="property type" value={selectedPropertyType} onChange={handlePropertyTypeChange}>
                <option value="placeholder" diabled default>Property Type</option>
                <option value="Option 1">Apartment</option>
                <option value="Option 2">House</option>
              </select>
              <br />
            </div>
          </div>
          <div className="row">
            <div>
              <select className="my-dropdown" id="listing type" value={selectedListingType} onChange={handleListingTypeChange}>
                <option value="placeholder" diabled default>Listing Type</option>
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
              <select className="state" id="state" value={selectedState} onChange={handleStateChange}>
                <option value="placeholder" diabled default>State</option>
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
              <select className="my-dropdown" id="bedroom" value={selectedBedroom} onChange={handleBedroomChange}>
                <option value="placeholder" diabled default>Bedrooms</option>
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
              <select className="my-dropdown" id="bathroom" value={selectedBathroom} onChange={handleBathroomChange}>
                <option value="placeholder" diabled default>Bathrooms</option>
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
              <select className="my-dropdown" id="parking" value={selectedParking} onChange={handleParkingChange}>
                <option value="placeholder" diabled default>Parking</option>
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