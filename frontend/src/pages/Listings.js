import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import '../App.css';

function Listings({listings})
{
  return (
    <>
      {listings && listings.map((listing) => (
        <div className="listing">
        <hr></hr>
        <div className="listing-name">{listing.name}</div>
        <div className="listing-address">{listing.address}</div>
        <div className="listing-location">{listing.location}</div>
        <div className="listing-rate">{listing.rate}</div>
        <div className="listing-start-date">{listing.start_date}</div>
        <div className="listing-end-date">{listing.end_date}</div>
      </div>
      ))}
    </>
  );
}

function PaginatedListings({listingsPerPage})
{
  /** All the listings */
  const [listings, setListings] = useState([]);
  /** current listings */
  const [filteredListings, setFiltered] = useState([]); 
  /** Ids of all loaded listings */
  const [ids, setIds] = useState(new Set());

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
  }, []);

  //  Start index for listings that are loaded
  const [startIndex, setStartIndex] = useState(0);
  //  End index for listings that are loaded
  const endIndex = startIndex + listingsPerPage;
  //  Current listings are filtered between a start index and end index
  const currentListings = filteredListings.slice(startIndex, endIndex);
  //  The total number of pages for listings
  const pageCount = Math.ceil(filteredListings.length / listingsPerPage)
  //  When the next page is requested, we update the offset so we can move to the next set of listings
  const handlePageClick = (event) => {
    const newStartIndex = (event.selected * listingsPerPage) % filteredListings.length;
    setStartIndex(newStartIndex);
  };
  
  //  Return listings that are filtered into the current listings on the page
  return (
    <>
      <Listings listings={currentListings} />
      <ReactPaginate
        breakLabel = "..."
        nextLabel = "next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel = "< previous"
        renderOnZeroPageCount={false}
      />
    </>
  ); 
}

export default PaginatedListings