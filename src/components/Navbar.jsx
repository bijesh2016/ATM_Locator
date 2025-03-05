import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import CSS

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <h1>
        <Link to="/">ATM Locator</Link>
      </h1>

      <input
        type="text"
        placeholder="Search ATMs..."
        value={query}
        onChange={handleSearch}
      />

      {/* Hamburger Button */}
      <button onClick={toggleMenu} className="hamburger">
        <div></div>
        <div></div>
        <div></div>
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "show" : ""}`}>
        <ul>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/banks" onClick={() => setIsMenuOpen(false)}>Banks</Link></li>
          <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
        </ul>
      </div>

      {/* Desktop Navigation */}
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/banks">Banks</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <button onClick={() => navigate("/login")}>Login</button>
    </nav>
  );
};

export default Navbar;
