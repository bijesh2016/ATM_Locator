import { useEffect, useRef } from 'react';

const GoogleMap = ({ atms }) => {
  const mapRef = useRef(null);
  const apiKey = 'AIzaSyA1AppZWRE2p_AnOLXmsnhhHXXPXcEwlxY';

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    function initializeMap() {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 27.7172, lng: 85.3240 },
        zoom: 12,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      atms.forEach(atm => {
        new window.google.maps.Marker({
          position: { lat: atm.latitude, lng: atm.longitude },
          map,
          title: atm.atmName,
        });
      });
    }
  }, [atms]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};

export default GoogleMap;