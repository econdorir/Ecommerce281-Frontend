// pages/orders/[id].js

import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import CartItem from "@/components/CartItem";

const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  // Simulación de un pedido (esto debería venir de tu API)
  const orderDetails = {
    id: id,
    status: "En preparación",
    expectedTime: 30,
    deliveryContact: "123-456-7890",
    products: [
      { id: 1, name: "Producto 1", price: 20, quantity: 2 },
      { id: 2, name: "Producto 2", price: 15, quantity: 1 },
      { id: 3, name: "Producto 3", price: 10, quantity: 3 },
    ],
  };

  const totalPrice = orderDetails.products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="max-w-2xl w-3/4 mx-auto mt-10 p-4 pt-28">
        <h1 className="text-2xl font-bold mb-4">
          Detalles del Pedido #{orderDetails.id}
        </h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          <p className="font-semibold">Estado: {orderDetails.status}</p>
          <p className="font-semibold">
            Tiempo Esperado: {orderDetails.expectedTime} min
          </p>
          <p className="font-semibold">
            Contacto Delivery: {orderDetails.deliveryContact}
          </p>
          <h2 className="text-lg font-bold mt-4">Productos:</h2>
          {orderDetails.products.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="mt-4 flex justify-between font-semibold">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
