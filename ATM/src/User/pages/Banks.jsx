import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Banks.css'; 

const localBanks = [
  { id: 1, name: "Nepal Bank Limited", location: "Kathmandu" },
  { id: 2, name: "Agricultural Development Bank", location: "Kathmandu" },
  { id: 3, name: "Nabil Bank", location: "Kathmandu" },
  { id: 4, name: "Himalayan Bank", location: "Kathmandu" },
  { id: 5, name: "Standard Chartered Bank Nepal", location: "Kathmandu" },
  { id: 6, name: "Kumari Bank", location: "Kathmandu" },
  { id: 7, name: "Shree Harsha Bank", location: "Pokhara" },
  { id: 8, name: "Global IME Bank", location: "Kathmandu" }
];

const bankCoordinates = [
  { id: 1, latitude: 27.700769, longitude: 85.300140 },
  { id: 2, latitude: 27.705769, longitude: 85.312140 },
  { id: 3, latitude: 27.709769, longitude: 85.290140 },
  { id: 4, latitude: 27.715769, longitude: 85.320140 },
  { id: 5, latitude: 27.720769, longitude: 85.325140 },
  { id: 6, latitude: 27.725769, longitude: 85.330140 },
  { id: 7, latitude: 28.209769, longitude: 83.990140 }, 
  { id: 8, latitude: 27.735769, longitude: 85.340140 }
];

const banksWithCoordinates = localBanks.map(bank => {
  const coordinates = bankCoordinates.find(coord => coord.id === bank.id);
  return { ...bank, ...coordinates };
});

const Home = () => {
  const [selectedBank, setSelectedBank] = useState(banksWithCoordinates[0]);

  const generateMapLink = (latitude, longitude) => {
    if (!latitude || !longitude) return "https://maps.google.com";
    return `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>ATM Locator</h1>
      </div>
      
      <div className="bank-locator-container">
        {/* Sidebar */}
        <div className="bank-sidebar">
          <div className="bank-list">
            {banksWithCoordinates.map(bank => (
              <div
                key={bank.id}
                className={`bank-item ${selectedBank.id === bank.id ? "active" : ""}`}
                onClick={() => setSelectedBank(bank)}
              >
                <h3>{bank.name}</h3>
                <p className="location">{bank.location}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Container */}
        <div className="map-container">
          <div className="map-header">
            <h2>{selectedBank.name}</h2>
            <p className="location-text">{selectedBank.location}</p>
          </div>
          <div className="map-wrapper">
            <iframe
              title="Bank Location"
              src={generateMapLink(selectedBank.latitude, selectedBank.longitude)}
              className="bank-map"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;