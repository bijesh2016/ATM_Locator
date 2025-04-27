import React from "react";
import "./SearchBar.css"; 

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <h2 className="search-title">Find Your Perfect ATM</h2>
      <p className="search-description">Discover ATMs that match your preferences and location</p>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Enter location or city"
          className="search-input"
        />
        <button className="search-button">Search ATMs</button>
      </div>
    </div>
  );
};

export default SearchBar;
