import { useEffect, useState } from "react";
import OrderItem from "@/components/OrderItem";
import Navbar from "@/components/Navbar";

interface Order {
  id_pedido: number;
  id_carrito: number;
  fecha_pedido: string; // Cambiado a string para manejar el formato ISO
  estado_pedido: string;
  monto_pago: number;
  tipo_de_pedido: string;
  carrito: {
    id_carrito: number;
    id_usuario: number | null;
  };
  entrega: entregas[];
}

interface entregas {
  id_entrega: number;
  id_pedido: number;
  id_cliente: number;
  id_delivery: number | null;
  estado_entrega: string;
  fecha_entrega: Date | null;
  cliente_confirm: boolean;
  delivery_confirm: boolean;
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
      const userData = localStorage.getItem("userData");
      const userId = userData ? JSON.parse(userData).id_usuario : null;

      if (!userId) {
        setError("No se pudo encontrar el usuario.");
        setLoading(false);
        return;
      }

      try {
        const cartResponse = await fetch(
          "http://localhost:5000/api/v1/carrito"
        );
        if (!cartResponse.ok) throw new Error("Error al obtener los carritos");
        const carts: Cart[] = await cartResponse.json();
        const userCarts = carts.filter((cart) => cart.id_usuario === userId); // Aquí no se necesita modificar

        const orderResponse = await fetch(
          "http://localhost:5000/api/v1/pedido"
        );
        if (!orderResponse.ok) throw new Error("Error al obtener los pedidos");
        const ordersData: Order[] = await orderResponse.json();

        const userOrders = ordersData.filter((order) => {
          return order.entrega.some((delivery) => delivery.id_cliente === userId);
        });
        console.log("444444444");

        // const storedUserData: any = localStorage.getItem("userData");
        // const userData = JSON.parse(storedUserData);
        // const userOrders = userData.pedidos

        setOrders(userOrders);
        console.log("55555555555555");
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
        <h1 className="text-2xl font-bold mb-4 text-center text-buttonpagecolor">Mis Pedidos</h1>
        <div className="bg-buttonpagecolor2 shadow-md rounded-lg p-4">
          {loading ? (
            <p className="text-center text-gray-600">Cargando...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-600">
              No tienes pedidos realizados
            </p>
          ) : (
            orders.map((order, index) => (
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
