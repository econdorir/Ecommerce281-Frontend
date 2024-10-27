import { useEffect, useState } from "react";
import DeliveryItem from "@/components/DeliveryItem";
import Navbar from "@/components/Navbar";

// Define la interfaz para las entregas y pedidos
interface Delivery {
  id_entrega: number;
  id_delivery: number;
  id_pedido: number;
  estado_entrega: string;
  fecha_entrega: string;
}

interface Order {
  id_pedido: number;
  id_carrito: number;
  fecha_pedido: string;
  estado_pedido: string;
  monto_pago: number;
  tipo_de_pedido: string;
}

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingDeliveries, setLoadingDeliveries] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
      const userData = localStorage.getItem("userData");
      const deliveryId = userData ? JSON.parse(userData).id_usuario : null;

      if (!deliveryId) {
        setError("No se pudo encontrar el repartidor.");
        setLoadingDeliveries(false);
        return;
      }

      try {
        const deliveryResponse = await fetch("http://localhost:5000/api/v1/entrega/");
        if (!deliveryResponse.ok) {
          throw new Error("Error al obtener las entregas");
        }

        const deliveriesData: Delivery[] = await deliveryResponse.json();
        const userDeliveries = deliveriesData.filter(
          (delivery) => delivery.id_delivery === deliveryId
        );

        setDeliveries(userDeliveries);
      } catch (error: any) {
        setError(error.message || "Hubo un error inesperado.");
      } finally {
        setLoadingDeliveries(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const orderResponse = await fetch("http://localhost:5000/api/v1/pedido");
        if (!orderResponse.ok) {
          throw new Error("Error al obtener los pedidos");
        }

        const ordersData: Order[] = await orderResponse.json();
        const pendingOrders = ordersData.filter(order => order.estado_pedido === "pendiente");

        setOrders(pendingOrders);
      } catch (error: any) {
        setError(error.message || "Hubo un error inesperado.");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchDeliveries();
    fetchOrders();
  }, []);

  const addDelivery = (order: Order) => {
    const newDelivery: Delivery = {
      id_entrega: deliveries.length + 1, // Cambiar según tu lógica para ID único
      id_delivery: JSON.parse(localStorage.getItem("userData") || "{}").id_usuario,
      id_pedido: order.id_pedido,
      estado_entrega: "en proceso", // Cambiar según tu lógica
      fecha_entrega: new Date().toISOString(), // Asignar la fecha actual
    };

    setDeliveries([...deliveries, newDelivery]);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl w-3/4 mx-auto mt-10 p-4 pt-28">
        <h1 className="text-2xl font-bold mb-4 text-center">Mis Entregas</h1>
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          {loadingDeliveries ? (
            <p className="text-center text-gray-600">Cargando entregas...</p>
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
                deliveryNumber={index + 1}
              />
            ))
          )}
        </div>

        <h2 className="text-xl font-bold mb-4 text-center">Pedidos Pendientes</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          {loadingOrders ? (
            <p className="text-center text-gray-600">Cargando pedidos...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-600">No hay pedidos pendientes</p>
          ) : (
            orders.map((order) => (
              <div key={order.id_pedido} className="flex justify-between items-center border-b py-2">
                <div>
                  <p>Pedido ID: {order.id_pedido}</p>
                  <p>Fecha: {new Date(order.fecha_pedido).toLocaleString()}</p>
                  <p>Estado: {order.estado_pedido}</p>
                </div>
                <button
                  onClick={() => addDelivery(order)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Añadir Pedido
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Deliveries;
