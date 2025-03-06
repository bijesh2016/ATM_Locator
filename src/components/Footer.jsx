import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is loaded

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 mb-3">
            <h4 className="footer-heading">Contact</h4>
            <p className="footer-text">
              Email: support@atmlocator.com <br />
              Phone: +977 9869079816
            </p>
          </div>
          <div className="col-md-6 mb-3">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="social-links">
              <a
                href="https://facebook.com"
                className="social-link facebook mr-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a
                href="https://twitter.com"
                className="social-link twitter mr-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a
                href="https://instagram.com"
                className="social-link instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>
        </div>
        <p className="footer-rights text-center">
          © 2025 ATMLocator. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
