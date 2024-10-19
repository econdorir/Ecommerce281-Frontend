// pages/orders.js

import { useEffect, useState } from "react";
import OrderItem from "@/components/OrderItem";
import Navbar from "@/components/Navbar";
import { API_URL } from "@/libs/constants";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/pedido`);
        if (!response.ok) {
          throw new Error("Error al obtener los pedidos");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-2xl w-3/4 mx-auto mt-10 p-4 pt-28">
        <h1 className="text-2xl font-bold mb-4">Mis Pedidos</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          {loading ? (
            <p className="text-center text-gray-600">Cargando...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-600">
              No tienes pedidos realizados
            </p>
          ) : (
            orders.map((order) => (
              <OrderItem
                key={order.id_pedido}
                order={{
                  id: order.id_pedido,
                  status: order.estado_pedido,
                  expectedTime: 0, // Puedes agregar lógica para calcular el tiempo esperado si es necesario
                  deliveryContact: "123-456-7890", // Puedes reemplazar esto por datos reales si es necesario
                  monto_pago: order.monto_pago,
                  tipo_de_pedido: order.tipo_de_pedido,
                  fecha_pedido: new Date(order.fecha_pedido).toLocaleDateString(), // Formatear la fecha
                }}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
