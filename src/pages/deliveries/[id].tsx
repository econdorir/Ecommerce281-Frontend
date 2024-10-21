import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

interface Cliente {
  nombre_usuario: string;
  celular: number;
  email_usuario: string;
}

interface Delivery {
  id_entrega: number;
  id_pedido: number;
  id_cliente: number;
  id_delivery: number;
  estado_entrega: string;
  fecha_entrega: string | null; // Puede ser null
  pedido: {
    carrito: {
      cliente: Cliente;
    };
  };
}

const DeliveryDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [deliveryDetails, setDeliveryDetails] = useState<Delivery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // Estado para manejar el modal

  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      if (!id) return; // Esperar hasta que el id esté disponible

      try {
        const response = await fetch(`http://localhost:5000/api/v1/entrega/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener los detalles de la entrega");
        }

        const data: Delivery = await response.json();
        setDeliveryDetails(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDeliveryDetails();
    }
  }, [id]);

  const handleShowModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!deliveryDetails) return <p>No se encontraron detalles de la entrega.</p>;

  // Asegurarse de que el cliente existe en los datos anidados
  const cliente = deliveryDetails.pedido?.carrito?.cliente;

  return (
    <>
      <Navbar />
      <div className="max-w-2xl w-3/4 mx-auto mt-10 p-4 pt-28">
        <h1 className="text-2xl font-bold mb-4">
          Detalles de la Entrega #{deliveryDetails.id_entrega}
        </h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          <p className="font-semibold">Estado: {deliveryDetails.estado_entrega}</p>
          <p className="font-semibold">
            Fecha de Entrega:{" "}
            {deliveryDetails.fecha_entrega
              ? new Date(deliveryDetails.fecha_entrega).toLocaleString()
              : "No disponible"}
          </p>
          <h2 className="text-lg font-bold mt-4">Detalles de la Entrega:</h2>
          <p>ID Pedido: {deliveryDetails.id_pedido}</p>
          <p>ID Cliente: {deliveryDetails.id_cliente}</p>
          <p>ID Delivery: {deliveryDetails.id_delivery}</p>
          <button
            onClick={handleShowModal}
            className="mt-2 inline-block bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Ver contactos del cliente"
          >
            Ver Cliente
          </button>
        </div>

        {showModal && cliente && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 scale-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contacto del Cliente</h2>
              <ul>
                <li>Nombre: {cliente.nombre_usuario}</li>
                <li>Celular: {cliente.celular}</li>
                <li>Email: {cliente.email_usuario}</li>
              </ul>
              <button
                onClick={handleCloseModal}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DeliveryDetails;
