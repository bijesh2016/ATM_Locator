import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./About.css"; 

const About = () => {
  return (
    <div className="container mt-5">
      <h1 className="about-title text-center mb-4">About Us</h1>
      <p className="lead">
        Welcome to ATMLocator, your trusted guide to finding ATMs and banks in Nepal. Whether you're traveling, commuting, or just in need of cash, we help you locate ATMs quickly and efficiently.
      </p>
      <p>
        Our platform provides a comprehensive database of ATMs and bank branches throughout Nepal, including detailed information about transaction fees, locations, and available services.
      </p>
      <h3>Our Mission</h3>
      <p>
        At ATMLocator, our mission is to make banking more accessible for everyone. We aim to provide an easy-to-use platform for users to find the closest ATM or bank branch, helping people save time and avoid unnecessary hassles.
      </p>
      <h3>Why Choose Us?</h3>
      <ul>
        <li>Comprehensive ATM and Bank Location Data</li>
        <li>Real-Time ATM Status and Availability</li>
        <li>Simple and Intuitive User Interface</li>
        <li>Transaction Fee Information to Help You Save Money</li>
      </ul>
      <h3>Contact Us</h3>
      <p>
        Have any questions? Feel free to reach out to us at <a href="mailto:support@atmlocator.com">support@atmlocator.com</a>. We're here to help you with any inquiries.
      </p>

      {/* Testimonials Section */}
      <div className="testimonials-section mt-5">
        <h3 className="text-center mb-4">What Our Users Say</h3>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="testimonial-card shadow-sm p-4 mb-4">
              <p className="testimonial-text">
                "ATMLocator has made it so much easier to find ATMs while traveling. I saved time and avoided high transaction fees!"
              </p>
              <p className="testimonial-author">— John Doe, Kathmandu</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="testimonial-card shadow-sm p-4 mb-4">
              <p className="testimonial-text">
                "This app is amazing! It showed me all the nearby ATMs with the lowest transaction fees. Highly recommend!"
              </p>
              <p className="testimonial-author">— Priya Sharma, Pokhara</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="testimonial-card shadow-sm p-4 mb-4">
              <p className="testimonial-text">
                "I love the real-time ATM status feature. It helped me avoid long queues and find an ATM that was actually working."
              </p>
              <p className="testimonial-author">— Rajeev Kumar, Biratnagar</p>
            </div>
          </div>
        </div>
        <p className="text-center text-muted">
          More testimonials coming soon!
        </p>
      </div>
    </div>
  );
};

export default About;
