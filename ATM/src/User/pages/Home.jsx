import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import { useState, useEffect } from "react";
import { branchLocations } from '../../Data/branchData';
import InteractiveMap from '../../components/InteractiveMap';
import { useNavigate } from 'react-router-dom';
import { atmService } from '../../Services/atmService';

const ATMItem = ({ ATM, onToggleFavorite, isFavorite }) => {
  const [showMap, setShowMap] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [showBranches, setShowBranches] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const navigate = useNavigate();

  const handleATMClick = () => {
    const branches = branchLocations[ATM.atmName] || [];
    setSelectedBranches(branches);
    setShowBranches(!showBranches);
    setShowMap(true);
  };

  const handleReviewClick = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      const confirmLogin = window.confirm('You need to be logged in to write a review. Would you like to log in now?');
      if (confirmLogin) {
        navigate('/login');
      }
      return;
    }

    setShowReviewForm(true);
  };

  const handleSubmitReview = () => {
    const userEmail = localStorage.getItem('userEmail');
    const newReview = {
      atmName: ATM.atmName,
      text: reviewText,
      userEmail: userEmail,
      date: new Date().toISOString()
    };

    // Get existing reviews
    const existingReviews = JSON.parse(localStorage.getItem('atmReviews') || '[]');
    
    // Add new review
    const updatedReviews = [newReview, ...existingReviews];
    
    // Store in localStorage
    localStorage.setItem('atmReviews', JSON.stringify(updatedReviews));

    // Reset form
    setReviewText('');
    setShowReviewForm(false);
    
    // Show success message
    alert('Thank you for your review!');
  };

  const getMapMarkers = () => {
    if (showBranches && selectedBranches.length > 0) {
      return selectedBranches;
    }
    return [ATM];
  };

  return (
    <div className="atm-card">
      <button 
        className="favorite-btn position-absolute top-0 end-0 btn btn-link p-2"
        onClick={() => onToggleFavorite(ATM.id)}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <i className={`bi ${isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
      </button>

      <div className="atm-content">
        <div className="atm-header">
          {ATM.bankLogo && (
            <img 
              src={ATM.bankLogo} 
              alt={`${ATM.atmName} logo`} 
              className="bank-logo"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <h3>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              handleATMClick();
            }}>
              {ATM.atmName}
            </a>
          </h3>
        </div>

        <div className="atm-details">
          <p><strong>Location:</strong> {ATM.atmLocation}</p>
          <p><strong>Transaction Fee:</strong> {ATM.transactionFee}</p>
          {ATM.distance !== undefined && (
            <p className="distance-info">
              <strong>Distance:</strong> 
              <span className={ATM.distance < 1 ? 'text-success' : ATM.distance < 3 ? 'text-warning' : ''}>
                {ATM.distance < 1 
                  ? `${(ATM.distance * 1000).toFixed(0)} meters` 
                  : `${ATM.distance.toFixed(1)} km`}
              </span>
            </p>
          )}
          {ATM.features && (
            <div className="atm-features">
              {ATM.features.map((feature, index) => (
                <span key={index} className="feature-badge">
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="atm-actions">
          <button 
            className={`btn ${showMap ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => setShowMap(!showMap)}
          >
            <i className={`bi ${showMap ? 'bi-map-fill' : 'bi-map'} me-1`}></i>
            {showMap ? 'Hide Map' : 'View Map'}
          </button>
          
          <button 
            className="btn btn-outline-primary"
            onClick={handleReviewClick}
          >
            <i className="bi bi-star me-1"></i>
            Write Review
          </button>
        </div>

        {showMap && (
          <div className="map-container">
            <InteractiveMap 
              markers={getMapMarkers()}
              selectedATM={ATM}
            />
          </div>
        )}
        
        {showReviewForm && (
          <div className="review-form-container">
            <textarea 
              className="form-control"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience..."
              rows={3}
            />
            <div className="btn-group">
              <button 
                className="btn btn-primary"
                onClick={handleSubmitReview}
                disabled={!reviewText.trim()}
              >
                <i className="bi bi-send me-1"></i>
                Submit
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setShowReviewForm(false);
                  setReviewText('');
                }}
              >
                <i className="bi bi-x me-1"></i>
                Cancel
              </button>
            </div>
          </div>
        )}

        {showBranches && selectedBranches.length > 0 && (
          <div className="branches-list mt-3">
            <h4>Available Branches:</h4>
            <div className="list-group">
              {selectedBranches.map(branch => (
                <div key={branch.id} className="list-group-item">
                  <h5 className="mb-1">{branch.branchName}</h5>
                  <p className="mb-1">{branch.location}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Home = ({ searchQuery = "" }) => {
  const [atms, setAtms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getUserLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
      
      // Update distances for all ATMs
      const atmsWithDistance = atms.map(atm => ({
        ...atm,
        distance: calculateDistance(latitude, longitude, atm.latitude, atm.longitude)
      }));

      // Sort by distance
      atmsWithDistance.sort((a, b) => a.distance - b.distance);
      setAtms(atmsWithDistance);
      
    } catch (err) {
      let errorMessage = 'Unable to retrieve your location.';
      if (err.code === 1) {
        errorMessage = 'Location access denied. Please enable location services.';
      } else if (err.code === 2) {
        errorMessage = 'Location unavailable. Please try again.';
      } else if (err.code === 3) {
        errorMessage = 'Location request timed out. Please try again.';
      }
      setLocationError(errorMessage);
    } finally {
      setLocationLoading(false);
    }
  };

  useEffect(() => {
    const fetchATMs = async () => {
      try {
        setLoading(true);
        const data = await atmService.getAllATMs();
        setAtms(data);
        setError(null);
      } catch (err) {
        setError('Failed to load ATMs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchATMs();
  }, []);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('atmFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('atmFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (atmId) => {
    setFavorites(prev => 
      prev.includes(atmId) 
        ? prev.filter(id => id !== atmId)
        : [...prev, atmId]
    );
  };

  const filteredATMs = atms.filter(ATM =>
    ATM.atmName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedATMs = showFavorites
    ? filteredATMs.filter(ATM => favorites.includes(ATM.id))
    : filteredATMs;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading ATMs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Find Your Perfect ATM</h1>
        <div className="d-flex justify-content-center gap-2 mb-4">
          <button 
            className={`btn ${locationLoading ? 'btn-secondary' : 'btn-primary'}`}
            onClick={getUserLocation}
            disabled={locationLoading}
          >
            {locationLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Getting Location...
              </>
            ) : (
              <>
                <i className="bi bi-geo-alt"></i>
                {userLocation ? 'Update Location' : 'Find Nearest ATMs'}
              </>
            )}
          </button>
          <button 
            className={`btn ${showFavorites ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setShowFavorites(!showFavorites)}
          >
            {showFavorites ? 'Show All ATMs' : `Show Favorites (${favorites.length})`}
          </button>
        </div>
        {locationError && (
          <div className="alert alert-warning" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {locationError}
          </div>
        )}
      </div>
      
      <div className="atms-grid">
        {displayedATMs.length > 0 ? (
          displayedATMs.map(ATM => (
            <ATMItem 
              key={ATM.id} 
              ATM={ATM}
              onToggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(ATM.id)}
            />
          ))
        ) : (
          <div className="no-results">
            <p>{showFavorites ? 'No favorite ATMs found' : 'No ATMs found matching your search'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
