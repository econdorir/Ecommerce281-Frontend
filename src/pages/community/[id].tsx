// pages/comunidad/[id].tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { API_URL } from "@/libs/constants";

const CommunityDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the community ID from the URL
  const [community, setCommunity] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchCommunity = async () => {
        try {
          const response = await fetch(
            `${API_URL}/comunidad/${id}`
          );
          const data = await response.json();
          setCommunity(data);
        } catch (error) {
          console.error("Error fetching community:", error);
        }
      };
      fetchCommunity();
    }
  }, [id]);

  if (!community) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 mt-24">
        {/* Community Card */}
        <div className="border rounded-lg shadow-lg p-6 mb-8 bg-white">
          <h1 className="text-3xl font-bold mb-4">
            {community.nombre_comunidad}
          </h1>
          <p className="text-lg mb-2">
            <strong>Municipio:</strong> {community.municipio.nombre_municipio}
          </p>
          <p className="text-lg mb-2">
            <strong>Provincia:</strong> {community.municipio.provincia.nombre_provincia}
          </p>
          <p className="text-lg mb-2">
            <strong>Departamento:</strong> {community.municipio.provincia.departamento.nombre_departamento}
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-4 mb-2">Artesanos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {community.artesano.map((artesano: any) => (
            <div key={artesano.id_usuario} className="border rounded-lg shadow-lg p-4 bg-white">
              <p className="font-semibold text-lg">Nombre: {artesano.nombre_usuario}</p>
              <p>Especialidad: {artesano.especialidad}</p>
              <p>Calificación: {artesano.calificacion} ✨</p>
              <p>Celular: {artesano.celular}</p>
              <button
                onClick={() => router.push(`/artesano/${artesano.id_usuario}`)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >Ver Perfil
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CommunityDetailPage;

