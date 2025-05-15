import React, { useEffect, useRef } from 'react';
import './InteractiveMap.css';

const InteractiveMap = ({ markers, selectedATM }) => {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA1AppZWRE2p_AnOLXmsnhhHXXPXcEwlxY`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initializeMap();
    }

    return () => {
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
      }
    };
  }, []);

  useEffect(() => {
    if (googleMapRef.current && markers) {
      updateMarkers();
    }
  }, [markers]);

  const initializeMap = () => {
    if (!mapRef.current) return;

    // Create map instance
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 13,
      center: { lat: 27.7172, lng: 85.3240 }, // Default center (Kathmandu)
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "on" }],
        },
      ],
    });

    googleMapRef.current = map;
    updateMarkers();
  };

  const updateMarkers = () => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    if (!markers || !googleMapRef.current) return;

    const bounds = new window.google.maps.LatLngBounds();

    // Add new markers
    markers.forEach((location) => {
      const marker = new window.google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map: googleMapRef.current,
        title: location.branchName || location.atmName,
        animation: window.google.maps.Animation.DROP,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new window.google.maps.Size(40, 40),
        },
      });

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="info-window">
            <h3>${location.branchName || location.atmName}</h3>
            <p>${location.location || location.atmLocation}</p>
            <p>Fee: NPR ${location.fee || location.transactionFee}</p>
          </div>
        `,
      });

      // Add click listener to marker
      marker.addListener('click', () => {
        // Close all other info windows
        markersRef.current.forEach(m => m.infoWindow?.close());
        infoWindow.open(googleMapRef.current, marker);
      });

      marker.infoWindow = infoWindow;
      markersRef.current.push(marker);
      bounds.extend(marker.getPosition());
    });

    // Fit map to show all markers
    if (markersRef.current.length > 0) {
      googleMapRef.current.fitBounds(bounds);
      if (markersRef.current.length === 1) {
        googleMapRef.current.setZoom(15);
      }
    }
  };

  return (
    <div className="map-container">
      <div ref={mapRef} className="google-map"></div>
    </div>
  );
};

export default InteractiveMap; 