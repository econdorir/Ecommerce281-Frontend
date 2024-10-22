// pages/profile.js

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  
  // Datos del usuario
  const [userData, setUserData] = useState({
    id_usuario: 28,
    nombre_usuario: "Raul Méndez",
    email_usuario: "RaulM@gmail.com",
    celular: 69878742,
    tipo_usuario: "cliente",
    fecha_registro: "2024-09-21",
    nro_compras: 8,
  });

  const handleUpdate = () => {
    // Lógica para actualizar los datos del usuario
    console.log("Datos actualizados:", userData);
  };

  const handleChangePassword = () => {
    // Lógica para cambiar la contraseña
    console.log("Cambio de contraseña solicitado");
  };

  const viewOrders = () => {
    router.push('/orders'); // Redirige a la página de pedidos
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-20">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <h1 className="text-2xl font-semibold text-center">Perfil de Usuario</h1>

          <div className="mt-4">
            <label className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              value={userData.nombre_usuario}
              onChange={(e) =>
                setUserData({ ...userData, nombre_usuario: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={userData.email_usuario}
              onChange={(e) =>
                setUserData({ ...userData, email_usuario: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Celular:</label>
            <input
              type="tel"
              value={userData.celular}
              onChange={(e) =>
                setUserData({ ...userData, celular: parseInt(e.target.value) })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Tipo de Usuario:</label>
            <input
              type="text"
              value={userData.tipo_usuario}
              readOnly
              className="mt-1 block w-full bg-gray-200 border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Fecha de Registro:</label>
            <input
              type="text"
              value={userData.fecha_registro}
              readOnly
              className="mt-1 block w-full bg-gray-200 border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="mt-6 w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700"
          >
            Actualizar Datos
          </button>

          <button
            onClick={handleChangePassword}
            className="mt-4 w-full bg-red-600 text-white rounded-md py-2 hover:bg-red-700"
          >
            Cambiar Contraseña
          </button>

          <button
            onClick={viewOrders}
            className="mt-4 w-full bg-green-600 text-white rounded-md py-2 hover:bg-green-700"
          >
            Ver Mis Pedidos
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
