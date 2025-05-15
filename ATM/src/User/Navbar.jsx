import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { allBanksInfo } from "../Data/branchData";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail');
    setIsLoggedIn(loginStatus);
    setUserEmail(email || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail("");
    navigate('/');
  };

  useEffect(() => {
    // Handle clicking outside of search container
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    onSearch(searchTerm);

    // Only show suggestions if there's an exact match
    const exactMatches = allBanksInfo.filter(bank => 
      bank.name.toLowerCase() === searchTerm.toLowerCase()
    );

    // If we have exact matches, show them
    if (exactMatches.length > 0) {
      setSuggestions(exactMatches);
      setShowSuggestions(true);
    } else {
      // Check for partial matches of complete words
      const words = searchTerm.toLowerCase().split(' ').filter(word => word.length > 0);
      if (words.length > 0) {
        const partialMatches = allBanksInfo.filter(bank => {
          const bankWords = bank.name.toLowerCase().split(' ');
          return words.every(word => 
            bankWords.some(bankWord => bankWord.startsWith(word))
          );
        });
        setSuggestions(partialMatches);
        setShowSuggestions(partialMatches.length > 0);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
  };

  const handleSuggestionClick = (bankName) => {
    setQuery(bankName);
    onSearch(bankName);
    setShowSuggestions(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo on the left */}
        <h1 className="navbar-logo">
          <Link to="/">ATM Locator</Link>
        </h1>

        {/* Search in the middle */}
        <div className="navbar-search-container" ref={searchRef}>
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Type full ATM name to search..."
              value={query}
              onChange={handleSearch}
              className="navbar-search"
            />
            {query && (
              <button 
                className="clear-search"
                onClick={() => {
                  setQuery("");
                  onSearch("");
                  setSuggestions([]);
                  setShowSuggestions(false);
                }}
              >
                ×
              </button>
            )}
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((bank, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(bank.name)}
                >
                  <div className="suggestion-main">
                    <span className="suggestion-name">{bank.name}</span>
                    <span className="suggestion-location">{bank.location}</span>
                  </div>
                  <span className="suggestion-fee">Fee: NPR {bank.fee}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation and Login/Logout on the right */}
        <div className="nav-right">
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/banks">Banks</Link>
            <Link to="/about">About</Link>
          </div>

          {isLoggedIn ? (
            <div className="user-menu">
              <span className="user-email">{userEmail}</span>
              <button 
                onClick={handleLogout} 
                className="btn btn-outline-primary logout-button"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate("/login")} 
              className="login-button"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;