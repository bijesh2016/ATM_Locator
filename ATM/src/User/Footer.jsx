import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import './Footer.css'; 

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log("Email would be sent with:", { email, message });
      setIsSubmitting(false);
      setSubmitStatus("success");
      setEmail("");
      setMessage("");
      
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4 className="footer-heading">Contact Us</h4>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="4"
                placeholder="Your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary send-button"
              disabled={isSubmitting}
            >
              <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            
            {submitStatus === "success" && (
              <div className="alert alert-success mt-3">
                Thank you! Your message has been sent.
              </div>
            )}
          </form>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Quick Contact</h4>
          <p className="footer-text">
            Email: support@atmlocator.com <br />
            Phone: +977 9869079816
          </p>
          
          <h4 className="footer-heading mt-4">Follow Us</h4>
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