// pages/orders.js

import OrderItem from "@/components/OrderItem";
import Navbar from "@/components/Navbar";

const Orders = () => {
  const orders = [
    {
      id: 1,
      status: "En preparación",
      expectedTime: 30,
      deliveryContact: "123-456-7890",
    },
    {
      id: 2,
      status: "En camino",
      expectedTime: 15,
      deliveryContact: "123-456-7890",
    },
    {
      id: 3,
      status: "Entregado",
      expectedTime: 0,
      deliveryContact: "123-456-7890",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-2xl w-3/4 mx-auto mt-10 p-4 pt-28">
        <h1 className="text-2xl font-bold mb-4">Mis Pedidos</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          {orders.length === 0 ? (
            <p className="text-center text-gray-600">
              No tienes pedidos realizados
            </p>
          ) : (
            orders.map((order) => <OrderItem key={order.id} order={order} />)
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
