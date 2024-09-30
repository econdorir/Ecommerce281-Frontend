// components/CartSidebar.tsx
import React from "react";
import { useAppContext } from "@/context";

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart } = useAppContext(); // Asegúrate de que el carrito esté en tu contexto

  return (
    <div
      className={`fixed top-0 right-0 w-64 bg-white shadow-lg transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } h-full z-50`}
    >
      <button onClick={onClose} className="p-2 text-gray-500">
        Cerrar
      </button>
      <h2 className="text-lg font-semibold p-4">Carrito</h2>
      <ul className="p-4">
        {cart.map((item, index) => (
          <li key={index} className="text-gray-700 mb-2">
            {item.nombre_producto} - $
            {parseFloat(item.precio_producto).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartSidebar;
