import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent: React.FC = () => {
  const position: [number, number] = [-16.5, -68.1193]; // Coordenadas de La Paz, Bolivia

  return (
    <MapContainer center={position} zoom={4} className="h-96 z-0">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>La Paz, Bolivia</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
