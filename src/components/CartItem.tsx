"use client";
import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";

const CartItem = ({ item}) => {
  const { cart, setCart, setNumberOfProductsInCart } = useAppContext();
  const router = useRouter();
  const handleRemoveFromCart = async (id_producto) => {
    const storedUserData: any = localStorage.getItem("userData");
    const userData = JSON.parse(storedUserData);

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/carrito/producto/${userData.id_carrito}/${id_producto}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Agrega más encabezados si es necesario, como tokens de autorización
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      // Actualiza el carrito en el contexto después de eliminar el producto
      setCart((prevCart) => {
        const updatedCart = prevCart.filter(
          (item) => item.id_producto !== id_producto
        );
        setNumberOfProductsInCart(updatedCart.length); // Actualiza el contador
        return updatedCart;
      });
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  // Función para manejar la compra (puedes personalizar esto)
  const handleBuy = () => {
    router.push("/cart");
  };

  const groupedCart = cart.reduce((acc: any, item: any) => {
    const existingItem = acc.find(
      (i: any) => i.id_producto === item.id_producto
    );

    if (existingItem) {
      // Incrementa la cantidad si el producto ya existe en el acumulador
      existingItem.cantidad += item.cantidad; // Asegúrate de que `item.cantidad` es la cantidad correcta
    } else {
      // Agrega el nuevo producto al acumulador
      acc.push({ ...item });
    }

    return acc;
  }, []);
  const updateProductQuantity = async (id_producto: number, nuevaCantidad: number) => {
    const storedUserData: any = localStorage.getItem("userData");
    const userData = JSON.parse(storedUserData);
  
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/aniade/${userData.id_carrito}/${id_producto}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cantidad: nuevaCantidad }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Error al actualizar la cantidad del producto");
      }
  
      // Maneja posibles respuestas vacías
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
  
      // Actualiza el estado del carrito en el frontend
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id_producto === id_producto
            ? { ...item, cantidad: item.cantidad + nuevaCantidad }
            : item
        )
      );
    } catch (error) {
      console.error("Error al actualizar la cantidad del producto:", error);
    }
  };
  

  return (
    <div className="flex justify-between items-center border-b border-gray-300 py-2">
      <div>
        <h3 className="text-lg font-semibold">{item.nombre_producto}</h3>
        <p className="text-tertiarypagecolor">Cantidad: {item.cantidad}</p>
      </div>
      <div className="text-lg font-semibold">${item.precio_producto * item.cantidad}</div>
      <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2 mt-2">
                    {/* Botón para decrementar */}
                    <button
                      onClick={async () => {
                        if (item.cantidad === 1) {
                          // Lógica para eliminar si la cantidad llega a 0
                          await handleRemoveFromCart(item.id_producto);
                        } else {
                          await updateProductQuantity(item.id_producto,-1);
                        }
                      }}
                      className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      -
                    </button>
                    {/* Botón para incrementar */}
                    <button
                      onClick={async () => {
                        await updateProductQuantity(item.id_producto,1);
                      }}
                      className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
        <button
          onClick={() => handleRemoveFromCart(item.id_producto)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;
