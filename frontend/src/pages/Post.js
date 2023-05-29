
import React, { useState, useEffect } from "react";
import '../App.css';
import '../css_pages/Post.css';
import checkmark from '../assets/checkmark.png';

/** Firebase storage (for image upload) */
import { initializeApp } from 'firebase/app';
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDT-MnGUOVt_DH6qLonDqZYTmTs8dIm6Sc",
  authDomain: "sharedhouse-yosemite.firebaseapp.com",
  projectId: "sharedhouse-yosemite",
  storageBucket: "sharedhouse-yosemite.appspot.com",
  messagingSenderId: "913316799799",
  appId: "1:913316799799:web:560e1c5ea73341a2dce6b2",
  measurementId: "G-8S2H8126XZ"
};

  const app = initializeApp(firebaseConfig);
  const storage =getStorage(app);

  function Post() {
    const auth = getAuth();
  const navigate = useNavigate();
  const [currentUser, setUser] = useState();
  const [images, setImage] = useState([]);
  const [imageUrls, setImages] = useState([]);
  const [uploaded, setUpload] = useState(false);

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

  function handleImageChange(event) {
    document.getElementById("checkmark").style.visibility = 'hidden';
    let new_files = event.target.files;
    console.log("new files: ", new_files);
    for (let i = 0; i < new_files.length; i++) {
      images.push(new_files[i]);
    }
    setUpload(false);
  }

  function handleUpload() {
    if (!images) {
      alert("Please upload an image!");
    }
    for (let i = 0; i < images.length; i++) {
      const storageRef = ref(storage, `/files/${images[i].name}`);
      const uploadTask = uploadBytesResumable(storageRef, images[i]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (err) => console.log(err),
        () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          imageUrls.push(url);
          console.log(url);
        });
        }
      ); 
    }
    setUpload(true);
    document.getElementById("checkmark").style.visibility = 'visible';
    console.log("image urls: ", imageUrls);
  }

/** Listing information */

  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    contact: "",
    display_name: "",
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
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if all input fields and dropdowns are filled/selected
    const isFormValid =
      inputs.first_name !== "" &&
      inputs.last_name !== "" &&
      inputs.contact !== "" &&
      inputs.display_name !== "" &&
      inputs.listing_title !== "" &&
      inputs.listing_price !== "" &&
      inputs.address !== "" &&
      inputs.room_or_appt_num !== "" &&
      inputs.city !== "" &&
      inputs.zip !== "" &&
      inputs.property_sqft !== "" &&
      inputs.lease_start_date !== "" &&
      inputs.location !== "" &&
      inputs.lease_end_date !== "" &&
      inputs.description !== "" &&
      selectedPropertyType !== "" &&
      selectedListingType !== "" &&
      selectedState !== "" &&
      selectedBedroom !== "" &&
      selectedBathroom !== "" &&
      selectedParking !== "";

    setIsFormValid(isFormValid);
  }, [
    inputs,
    selectedPropertyType,
    selectedListingType,
    selectedState,
    selectedBedroom,
    selectedBathroom,
    selectedParking,
  ]);

  const handleInfoChange = (event) => {
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
    var data = {
      type: 'listing',
      data: inputs,
      curUser: currentUser,
      images: imageUrls
    }
    console.log("img :( ", imageUrls);
    console.log("hi", data);
    fetch('http://localhost:3001/firestore', {
      method: 'POST',
      headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((json) => {
        console.log(json)
      });
  }


  return (
    <div>
      <div className="client_info-containter">
        <div className="client_info_heading">
          Client Info
        </div>
      <div className="client_info_row">
          <input
            type="text"
            name="first_name"
            value={inputs.first_name}
            onChange={handleInputChange}
            placeholder="First Name"
            className="standard-text"
          />
          <input
            type="text"
            name="last_name"
            value={inputs.last_name}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="standard-text"
          />
      </div>
      <div className="client_info_row">
          <input
            type="text"
            name="contact"
            value={inputs.contact}
            onChange={handleInputChange}
            placeholder="Contact"
            className="standard-text"
          />
          <input
            type="text"
            name="display_name"
            value={inputs.display_name}
            onChange={handleInputChange}
            placeholder="Display Name"
            className="standard-text"
          />
      </div>
      </div>
      <div className="property_info-container">
        <div className="property_info_heading">
          Property Type
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
            <select className="my-dropdown" id="property_type" value={selectedPropertyType} onChange={handlePropertyTypeChange}>
              <option value="">Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
            </select>
            <br />
          </div>
        </div>
        <div className="row">
          <div>
            <select className="my-dropdown" id="listing_type" value={selectedListingType} onChange={handleListingTypeChange}>
              <option value="">Listing Type</option>
              <option value="Sub-Lease">Sub-Lease</option>
              <option value="Lease Transfer">Lease Transfer</option>
            </select>
            <br />
          </div>
          <input
            type="text"
            name="listing_price"
            value={inputs.listing_price}
            onChange={handleInputChange}
            placeholder="Listing Price Per Month"
            className="standard-text"
            pattern="[0-9]*"
            inputMode="numeric"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </div>
        <div className="row">
          
          <div className="sub_row1">
            <input
              type="text"
              name="address"
              value={inputs.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="address"
            />
            <input
              type="text"
              name="room_or_appt_num"
              value={inputs.room_or_appt_num}
              onChange={handleInputChange}
              placeholder="Room/Apt #"
              className="room-apt"
            />
          </div>
          <div className="sub_row2">
            <input
              type="text"
              name="city"
              value={inputs.city}
              onChange={handleInputChange}
              placeholder="City"
              className="city"
            />
            <select className="state" id="state" value={selectedState} onChange={handleStateChange}>
              <option value="">State</option>
              <option value="CA">CA</option>
              <option value="Other">Other</option>
            </select>
            <br/>
            <input
              type="text"
              name="zip"
              value={inputs.zip}
              onChange={handleInputChange}
              placeholder="ZIP"
              className="zip"
              pattern="[0-9]*"
              inputMode="numeric"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </div>
        </div>
        <div className="row">
          <div>
            <select className="my-dropdown" id="bedroom" value={selectedBedroom} onChange={handleBedroomChange}>
              <option value="">Bedrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <br />
          </div>
          <div>
            <select className="my-dropdown" id="bathroom" value={selectedBathroom} onChange={handleBathroomChange}>
              <option value="">Bathrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <br />
          </div>
        </div>
        <div className="row">
          <input
            type="text"
            name="property_sqft"
            value={inputs.property_sqft}
            onChange={handleInputChange}
            placeholder="Property SqFt"
            className="standard-text"
          />
          <div>
            <select className="my-dropdown" id="parking" value={selectedParking} onChange={handleParkingChange}>
              <option value="">Parking</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
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
      </div>
      
      <div>
            <input type="file" accept="image/*" onChange={handleImageChange} name="files[]" multiple/>
            <button onClick={handleUpload}>Upload</button>
            <img id="checkmark" alt="updated" src={checkmark}/>
          </div>

      <div>
          <button type="submit" onClick={postListing}>
            Submit
          </button>
        </div>
    </div>
    );
}

export default Post
