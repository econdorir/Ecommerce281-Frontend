import { useEffect, useState } from "react";
import OrderItem from "@/components/OrderItem";
import Navbar from "@/components/Navbar";

// Define la interfaz para los pedidos y carritos
interface Order {
  id_pedido: number;
  id_carrito: number;
  fecha_pedido: Date;
  estado_pedido: string;
  monto_pago: number;
  tipo_de_pedido: string;
}

interface Cart {
  id_carrito: number;
  id_usuario: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrdersAndCarts = async () => {
      // Obtener datos del usuario de localStorage
      const userData = localStorage.getItem("userData");
      const userId = userData ? JSON.parse(userData).id_usuario : null;

      if (!userId) {
        setError("No se pudo encontrar el usuario.");
        setLoading(false);
        return;
      }

      try {
        // Obtener todos los carritos
        const cartResponse = await fetch("http://localhost:5000/api/v1/carrito");
        if (!cartResponse.ok) {
          throw new Error("Error al obtener los carritos");
        }
        const carts: Cart[] = await cartResponse.json();

        // Filtrar carritos del usuario logueado
        const userCarts = carts.filter(cart => cart.id_usuario === userId);

        // Obtener todos los pedidos
        const orderResponse = await fetch("http://localhost:5000/api/v1/pedido");
        if (!orderResponse.ok) {
          throw new Error("Error al obtener los pedidos");
        }
        const ordersData: Order[] = await orderResponse.json();

        // Filtrar los pedidos que pertenecen a los carritos del usuario
        const userOrders = ordersData.filter(order =>
          userCarts.some(cart => cart.id_carrito === order.id_carrito)
        );

        setOrders(userOrders);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndCarts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-2xl w-3/4 mx-auto mt-10 p-4 pt-28">
        <h1 className="text-2xl font-bold mb-4 text-center">Mis Pedidos</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          {loading ? (
            <p className="text-center text-gray-600">Cargando...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-600">No tienes pedidos realizados</p>
          ) : (
            orders.map((order,index) => (
              <OrderItem
                key={order.id_pedido}
                order={{
                  id: order.id_pedido,
                  status: order.estado_pedido,
                  expectedTime: 0, // Agrega lógica si es necesario
                  deliveryContact: "123-456-7890", // Reemplaza por datos reales
                  monto_pago: order.monto_pago,
                  tipo_de_pedido: order.tipo_de_pedido,
                  fecha_pedido: new Date(order.fecha_pedido).toLocaleString(),
                }}
                orderNumber={index + 1} // Pasar el número de pedido (índice + 1)
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
