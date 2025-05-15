import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load reviews from localStorage
    const loadReviews = () => {
      const savedReviews = localStorage.getItem('atmReviews');
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      }
      setLoading(false);
    };

    loadReviews();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials-grid">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <div className="testimonial-header">
                    <div className="user-info">
                      <i className="bi bi-person-circle user-icon"></i>
                      <div className="user-details">
                        <h4>{review.userEmail || 'Anonymous User'}</h4>
                        <p className="atm-name">{review.atmName}</p>
                      </div>
                    </div>
                    <div className="review-date">
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="review-text">{review.text}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-reviews">
              <i className="bi bi-chat-square-text"></i>
              <p>No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 