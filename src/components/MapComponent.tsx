import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent: React.FC = () => {
  const position: [number, number] = [-16.5, -68.1193]; // Coordenadas de La Paz, Bolivia

  return (
    <div className="h-96 z-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d64369.05248255918!2d-68.1192935!3d-16.5002934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e36820f2985861%3A0x6ae78e4e8efc94d1!2sUMSA%20Universidad%20Mayor%20de%20San%20Andr%C3%A9s!5e0!3m2!1ses-419!2sbo!4v1697798232878!5m2!1ses-419!2sbo"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
    </div>
  );
};

export default MapComponent;
