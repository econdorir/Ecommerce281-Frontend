import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Dynamically import components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

interface MyMapComponentProps {
  source: L.LatLngExpression | null;
  target: L.LatLngExpression | null;
}

const MyMapComponent: React.FC<MyMapComponentProps> = ({ source, target }) => {
  if (!source || !target) {
    return <div>Cargando mapa...</div>; // Show loading until everything is ready
  }

  const polylinePositions = [source, target];

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const distance = calculateDistance(source[0], source[1], target[0], target[1]);

  return (
    <MapContainer center={source} zoom={10} style={{ height: "400px", width: "100%" ,border:"2px solid black", zIndex: "0" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={source}>
        <Popup>Source Location</Popup>
      </Marker>
      <Marker position={target}>
        <Popup>Target Location</Popup>
      </Marker>
      <Polyline positions={polylinePositions} color="blue" />
      <div style={{ position: "absolute", top: "10px", left: "10px", background: "white", padding: "5px", borderRadius: "5px" }}>
        {distance && <p>Distance: {distance.toFixed(2)} km</p>}
      </div>
    </MapContainer>
  );
};

export default MyMapComponent;
