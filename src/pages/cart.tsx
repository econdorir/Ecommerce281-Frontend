// pages/cart.js

import { useState } from 'react';
import CartItem from "@/components/CartItem";
import Navbar from "@/components/Navbar";
import PaymentForm from "@/components/PaymentForm";

const Cart = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const cartItems = [
    { id: 1, name: "Producto 1", price: 20, quantity: 2 },
    { id: 2, name: "Producto 2", price: 15, quantity: 1 },
    { id: 3, name: "Producto 3", price: 10, quantity: 3 },
  ];

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="max-w-2xl w-3/4 mx-auto mt-10 p-4 pt-28">
        <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Tu carrito está vacío</p>
          ) : (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          )}
          <div className="mt-4 flex justify-between font-semibold">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
          <button 
            onClick={() => setShowPaymentForm(true)} 
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Finalizar Compra
          </button>
        </div>
      </div>

      {showPaymentForm && <PaymentForm onClose={() => setShowPaymentForm(false)} cartItems={cartItems} />}
    </>
  );
};

export default Cart;
