import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo on the left */}
        <h1 className="navbar-logo">
          <Link to="/">ATM Locator</Link>
        </h1>

        <div className="navbar-search-container">
          <input
            type="text"
            placeholder="Search ATMs..."
            value={query}
            onChange={handleSearch}
            className="navbar-search"
          />
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/banks">Banks</Link>
          <Link to="/about">About</Link>
        </div>

        <button 
          onClick={() => navigate("/login")} 
          className="login-button"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;