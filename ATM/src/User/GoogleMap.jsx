import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 27.7172, 
  lng: 85.324, 
};

const GoogleMapComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA1AppZWRE2p_AnOLXmsnhhHXXPXcEwlxY", // Replace with your API key
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12} // Adjust the zoom level
      center={center}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default GoogleMapComponent;