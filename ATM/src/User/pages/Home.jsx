import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import { useState ,useEffect} from "react";
const ATMs = [
  {
    id: 1,
    atmName: "Nepal Bank Limited ATM",
    atmLocation: "Kathmandu",
    transactionFee: "NPR 20",
    latitude: 27.7046,
    longitude: 85.3072
  },
  {
    id: 2,
    atmName: "Nabil Bank ATM",
    atmLocation: "Pokhara",
    transactionFee: "NPR 18",
    latitude: 28.2096,
    longitude: 83.9856
  },
  {
    id: 3,
    atmName: "Himalayan Bank ATM",
    atmLocation: "Lalitpur",
    transactionFee: "NPR 25",
    latitude: 27.6667,
    longitude: 85.3167
  },
  {
    id: 4,
    atmName: "Kumari Bank ATM",
    atmLocation: "Bhaktapur",
    transactionFee: "NPR 15",
    latitude: 27.6710,
    longitude: 85.4298
  },
  {
    id: 5,
    atmName: "Standard Chartered Bank ATM",
    atmLocation: "Biratnagar",
    transactionFee: "NPR 30",
    latitude: 26.4525,
    longitude: 87.2718
  }
];

const ATMItem = ({ ATM, onToggleFavorite, isFavorite }) => {
  const [showMap, setShowMap] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');

  const generateMapLink = (latitude, longitude) => {
    if (!latitude || !longitude) return "https://maps.google.com";
    return `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  };

  const handleSubmitReview = () => {
    console.log('Submitted review:', reviewText);
    setReviewText('');
    setShowReviewForm(false);
    alert('Thank you for your review!');
  };

  return (
    <div className="atm-card position-relative">
      {/* Favorite Button - Top Right Corner */}
      <button 
        className="favorite-btn position-absolute top-0 end-0 btn btn-link p-2"
        onClick={() => onToggleFavorite(ATM.id)}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <i className={`bi ${isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
      </button>

      <div className="atm-content">
        <h3>
          <a href={ATM.link} target="_blank" rel="noopener noreferrer">
            {ATM.atmName}
          </a>
        </h3>
        <div className="atm-details">
          <p><strong>Location:</strong> {ATM.atmLocation}</p>
          <p><strong>Transaction Fee:</strong> {ATM.transactionFee}</p>
        </div>
        <div className="atm-actions">
          <button className="btn btn-primary map-button" onClick={() => setShowMap(!showMap)}>
            {showMap ? 'Hide Map' : 'View on Map'}
          </button>
          
          <button 
            className="btn btn-outline-primary review-button" 
            onClick={() => setShowReviewForm(true)}
          >
            Write Review
          </button>
          
          {showMap && (
            <div className="map-container mt-2">
              <iframe
                title={`Map of ${ATM.atmName}`}
                width="100%"
                height="300"
                style={{border:0}}
                src={generateMapLink(ATM.latitude, ATM.longitude)}
                allowFullScreen
              />
            </div>
          )}
          
          {showReviewForm && (
            <div className="review-form-container mt-2">
              <textarea 
                className="form-control mb-2"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience..."
                rows={3}
              />
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-primary"
                  onClick={handleSubmitReview}
                  disabled={!reviewText.trim()}
                >
                  Submit
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowReviewForm(false);
                    setReviewText('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Home = ({ searchQuery = "" }) => {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('atmFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage when they change
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

  const filteredATMs = ATMs.filter(ATM =>
    ATM.atmName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedATMs = showFavorites
    ? filteredATMs.filter(ATM => favorites.includes(ATM.id))
    : filteredATMs;

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Find Your Perfect ATM</h1>
        <button 
          className={`btn ${showFavorites ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? 'Show All ATMs' : `Show Favorites (${favorites.length})`}
        </button>
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
