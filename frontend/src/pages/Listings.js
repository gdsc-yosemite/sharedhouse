import React, { useState, useEffect } from "react";
import '../App.css';
import Dropdown from "../components/dropdown";
import "../components/dropdown.css"
import Box from "../components/box";
import details from "../assets/listingsdetails.png";
import '../css_pages/listings.css';
import Dropdownn from "../components/dropdown2";
import "../components/dropdown2.css"


function Listings() {
  /** All the listings */
  const [listings, loadListings] = useState([]);
  /** current listings */
  const [filteredListings, setFiltered] = useState([]); 
  /** Ids of all loaded listings */
  const [ids, loadIds] = useState(new Set());

    /** initially load 50? listings */
    useEffect(() => {
        fetch('http://localhost:3001/firestore/listings', {
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
            setFiltered(listings)
            console.log("listings", listings);
            console.log("ids: ", ids);
          });
          
    }, [])
    const [inputs, setInputs] = useState({
      location:"",
      num_people: "",
      lease_start_date:"",
      lease_end_date:"",
    });

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    };

    const options = [
      {value: "1", label: "1"},
      {value: "2", label: "2"},
      {value: "3", label: "3"},
      {value: "4", label: "4"},
      {value: "5", label: "5"},
    ]
    return (
      <div className="listings">
        <div>Listings</div>
        <div className="row">
            <input
              type="text"
              name="city"
              value={inputs.city}
              onChange={handleInputChange}
              placeholder="City"
              className="city"
          />
          <input
            type="text"
            name="lease_start_date"
            value={inputs.lease_start_date}
            onChange={handleInputChange}
            placeholder="Lease Start Date (MM/DD/YYYY)"
            className="standard-text"
            style={{width:100}}
          />
          <input
            type="text"
            name="lease_end_date"
            value={inputs.lease_end_date}
            onChange={handleInputChange}
            placeholder="Lease End Date (MM/DD/YYYY)"
            className="standard-text"
            style={{width:100}}
          />
          
        </div>
        {
          filteredListings.map((listing)=> (
            <div className="listing">
              <hr></hr>
              <div className="listing-name">{listing.name}</div>
              <div className="listing-address">{listing.address}</div>
              <div className="listing-location">{listing.location}</div>
              <div className="listing-rate">{listing.rate}</div>
              <div className="listing-start-date">{listing.start_date}</div>
              <div className="listing-end-date">{listing.end_date}</div>
            </div>
          ))
        }
        <Dropdown placeHolder="# Bdrms" options={options}/>
        <Dropdownn placeHolder="# Bath" options={options}/>
        <Box placeHolder="filter" > <img id="details" alt="updated" src={details}/></Box>
      </div>
    );
}

export default Listings