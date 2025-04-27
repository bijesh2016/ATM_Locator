import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4 className="footer-heading">Contact</h4>
          <p className="footer-text">
            Email: support@atmlocator.com <br />
            Phone: +977 9869079816
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Follow Us</h4>
          <div className="social-links">
            <a
              href="https://facebook.com"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} />
              <span>Facebook</span>
            </a>
            <a
              href="https://twitter.com"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} />
              <span>Twitter</span>
            </a>
            <a
              href="https://instagram.com"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 ATMLocator. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;