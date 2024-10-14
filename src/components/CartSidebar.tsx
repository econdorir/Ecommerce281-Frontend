// @ts-ignore

import React from "react";
import { useAppContext } from "@/context";
import { useRouter } from "next/router";


const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, setCart, setNumberOfProductsInCart } = useAppContext();
  // const router = useRouter();

  // Función para eliminar un producto del carrito
  const handleRemoveFromCart = (id_producto) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.id_producto !== id_producto);
      setNumberOfProductsInCart(updatedCart.length); // Actualiza el contador
      return updatedCart;
    });
  };

  // Función para manejar la compra (puedes personalizar esto)
  const handleBuy = () => {
    setCart([]);
    setNumberOfProductsInCart(0);
    // router.push("/cart"); TODO FIX THIS THING
  };

  // Agrupa los productos por id y suma las cantidades
  const groupedCart = cart.reduce((acc: any, item : any) => {
    const existingItem : any = acc.find((i : any) => i.id_producto === item.id_producto);
    if (existingItem) {
      existingItem.cantidad += 1; // Incrementa la cantidad si ya existe
    } else {
      acc.push({ ...item, cantidad: 1 }); // Agrega un nuevo producto
    }
    return acc;
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 w-64 bg-white shadow-lg transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } h-full z-50`}
    >
      <button onClick={onClose} className="p-2 pl-5 pt-5 text-red-500">
        X
      </button>
      <h2 className="text-lg font-semibold p-4">Carrito</h2>
      <ul className="p-4">
        {groupedCart.length === 0 ? (
          <li className="text-gray-700">Tu carrito está vacío.</li>
        ) : (
          groupedCart.map((item) => (
            <li key={item.id_producto} className="flex items-center mb-2">
              <img
                src={item.imagen[0].url_imagen}
                alt={item.nombre_producto}
                className="w-16 h-16 object-cover mr-2"
              />
              <div className="flex-grow">
                <p>{item.nombre_producto}</p>
                <p>Cantidad: {item.cantidad}</p> {/* Muestra la cantidad */}
                <p>Precio: ${(parseFloat(item.precio_producto) * item.cantidad).toFixed(2)}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id_producto)}
                className="bg-red-500 text-white p-1 rounded ml-2"
              >
                -
              </button>
            </li>
          ))
        )}
      </ul>
      <button
        onClick={handleBuy}
        className="w-full bg-blue-500 text-white p-2 mt-4 rounded"
      >
        Comprar
      </button>
    </div>
  );
};

export default CartSidebar;
