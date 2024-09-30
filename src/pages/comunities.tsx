import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import MapComponent from "@/components/MapComponent";
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('../components/MapComponent'), {
  ssr: false, // Esto desactiva el renderizado del lado del servidor
});

const CommunitiesPage = () => {
  return (
    <>
      <Navbar />
      <div>
        <section
          className="bg-cover bg-center h-60"
          style={{
            backgroundImage: "url('/path/to/your/background-image.jpg')",
          }}
        >
          <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
            <h1 className="text-white text-3xl">
              Bienvenido a las Comunidades
            </h1>
          </div>
        </section>

        <div className="container mx-auto p-4">
          <h2 className="text-xl font-semibold mb-4">
            Acerca de las Comunidades
          </h2>
          <p>
            Aquí puedes aprender sobre diversas comunidades que comparten
            intereses y objetivos comunes. Únete y forma parte de un espacio
            colaborativo y enriquecedor.
          </p>

          <h2 className="text-xl font-semibold mt-6">Mapa de Bolivia</h2>
          <DynamicMap />

          <h2 className="text-xl font-semibold mt-6">
            Comunidades Disponibles
          </h2>
          <ul>
            <li>
              <strong>Comunidad de Tecnología:</strong> Un grupo de entusiastas
              de la tecnología que comparten conocimientos y recursos.
            </li>
            <li>
              <strong>Comunidad de Arte:</strong> Un espacio para artistas y
              amantes del arte donde se pueden compartir obras y técnicas.
            </li>
            <li>
              <strong>Comunidad de Salud:</strong> Enfocada en el bienestar y la
              salud, esta comunidad organiza talleres y charlas.
            </li>
            {/* Agrega más comunidades aquí */}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CommunitiesPage;
