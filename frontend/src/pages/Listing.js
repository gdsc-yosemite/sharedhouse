
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import '../App.css';

const firebaseConfig = {
  apiKey: "AIzaSyDT-MnGUOVt_DH6qLonDqZYTmTs8dIm6Sc",
  authDomain: "sharedhouse-yosemite.firebaseapp.com",
  projectId: "sharedhouse-yosemite",
  storageBucket: "sharedhouse-yosemite.appspot.com",
  messagingSenderId: "913316799799",
  appId: "1:913316799799:web:560e1c5ea73341a2dce6b2",
  measurementId: "G-8S2H8126XZ"
};

function Listing() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [currentUser, setUser] = useState();
  const app = initializeApp(firebaseConfig);
  const storage =getStorage(app);

  const [image, setImage] = useState("");
  const [imageUrls, addImage] = useState([]);
  const [inputs, setInputs] = useState({
    listing_title: "",
    address: "",
    property_sqft: null,
    lease_start_date: "",
    location: "",
    listing_price: null,
    lease_end_date: "",
    description: "",
    contact_info: "hi",
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

  function handleImageChange(event) {
    setImage(event.target.files[0]);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  function handleUpload() {
    if (!image) {
      alert("Please upload an image!");
    }
    const storageRef = ref(storage, `/files/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

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

  const postListing = (event) => {
    event.preventDefault();
    console.log("hi", inputs);
    console.log("images: ", imageUrls);
    var data = {
      type: 'listing',
      data: inputs,
      curUser: currentUser,
      images: imageUrls,
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
        placeholder="Listing"
        className="standard-text"
      />
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
        name="property_sqft"
        value={inputs.property_SqFt}
        onChange={handleInputChange}
        placeholder="Property SqFt"
        className="standard-text"
      />
      <input
        type="text"
        name="lease_start_date"
        value={inputs.lease_start_date}
        onChange={handleInputChange}
        placeholder="Lease Start Date"
        className="standard-text"
      />
      <input
        type="text"
        name="location"
        value={inputs.location}
        onChange={handleInputChange}
        placeholder="Location"
        className="standard-text"
      />
      <input
        type="text"
        name="listing_price"
        value={inputs.listing_price}
        onChange={handleInputChange}
        placeholder="Listing Price"
        className="standard-text"
      />
      <input
        type="text"
        name="lease_end_date"
        value={inputs.lease_end_date}
        onChange={handleInputChange}
        placeholder="Lease End Date"
        className="standard-text"
      />
      <input
        type="text"
        name="description"
        value={inputs.description}
        onChange={handleInputChange}
        placeholder="Property and Lease Description..."
        className="standard-text"
      />
      <input
        type="text"
        name="contact_info"
        value={inputs.contact_info}
        onChange={handleInputChange}
        placeholder="extraaaaaaaaa"
        className="standard-text"
      />

      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>

        <input type="submit" onClick={postListing}/>
    </div>
  );
}

export default Listing
