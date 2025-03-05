import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); // For redirection

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Pass search query to App.jsx
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      {/* Logo / Title */}
      <h1 className="text-lg font-bold">
        <Link to="/">CollegeLocator</Link>
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Colleges..."
        value={query}
        onChange={handleSearch}
        className="border p-2 rounded-md"
      />

      {/* Navigation Links */}
      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
        <li><Link to="/compare" className="hover:text-blue-500">Compare</Link></li>
        <li><Link to="/about" className="hover:text-blue-500">About</Link></li>
      </ul>

      {/* Login Button */}
      <button
        onClick={() => navigate("/login")}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Login
      </button>
    </nav>
  );
};

export default Navbar;
