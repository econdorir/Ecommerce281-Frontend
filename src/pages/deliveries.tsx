import { useEffect, useState } from "react";
import DeliveryItem from "@/components/DeliveryItem"; // Asegúrate de tener un componente para mostrar cada entrega
import Navbar from "@/components/Navbar";

// Define la interfaz para las entregas
interface Delivery {
  id_entrega: number;
  id_delivery: number;
  id_pedido: number;
  estado_entrega: string;
  fecha_entrega: Date;
}

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
      // Obtener datos del usuario de localStorage (en este caso, el repartidor)
      const userData = localStorage.getItem("userData");
      const deliveryId = userData ? JSON.parse(userData).id_delivery : null;

      if (!deliveryId) {
        setError("No se pudo encontrar el repartidor.");
        setLoading(false);
        return;
      }

      try {
        // Obtener todas las entregas
        const deliveryResponse = await fetch("http://localhost:5000/api/v1/entrega");
        if (!deliveryResponse.ok) {
          throw new Error("Error al obtener las entregas");
        }
        const deliveriesData: Delivery[] = await deliveryResponse.json();

        // Filtrar las entregas que pertenecen al repartidor logueado
        const userDeliveries = deliveriesData.filter(
          delivery => delivery.id_delivery === deliveryId
        );

        setDeliveries(userDeliveries);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-2xl w-3/4 mx-auto mt-10 p-4 pt-28">
        <h1 className="text-2xl font-bold mb-4 text-center">Mis Entregas</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          {loading ? (
            <p className="text-center text-gray-600">Cargando...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : deliveries.length === 0 ? (
            <p className="text-center text-gray-600">No tienes entregas realizadas</p>
          ) : (
            deliveries.map((delivery, index) => (
              <DeliveryItem
                key={delivery.id_entrega}
                delivery={{
                  id: delivery.id_entrega,
                  estado: delivery.estado_entrega,
                  fecha_entrega: new Date(delivery.fecha_entrega).toLocaleString(),
                }}
                deliveryNumber={index + 1} // Pasar el número de entrega (índice + 1)
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Deliveries;
