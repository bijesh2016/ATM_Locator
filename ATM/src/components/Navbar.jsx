import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogout = () => {
    // Implement the logout logic here
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-bank me-2"></i>
          ATM Locator
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/atms">
                <i className="bi bi-geo-alt me-1"></i>
                ATMs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/banks">
                <i className="bi bi-building me-1"></i>
                Banks
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/testimonials">
                <i className="bi bi-chat-quote me-1"></i>
                Reviews
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <div className="dropdown">
                <button
                  className="btn btn-link dropdown-toggle user-menu-button"
                  type="button"
                  id="userMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {userEmail}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuButton">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                <i className="bi bi-box-arrow-in-right me-1"></i>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 