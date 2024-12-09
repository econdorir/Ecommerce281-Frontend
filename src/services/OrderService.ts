import { API_URL } from "../libs/constants";

export const createOrder = async (orderData) => {
  try {
    // Enviar el pedido al servidor (backend)
    const response = await fetch(`${API_URL}/pedido`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Error al crear el pedido");
    }

    const data = await response.json();

    // Manejar userData de manera segura
    const storedUserData = localStorage.getItem("userData");
    const userData = storedUserData ? JSON.parse(storedUserData) : {};

    // Asegúrate de que los datos necesarios existan antes de acceder a ellos
    const newUserData = {
      ...userData,
      id_carrito: data.nuevoCliente?.id_carrito || null, // Asegura que id_carrito exista
    };

    // Actualiza solo la propiedad que cambia en lugar de todo el objeto (optimización)
    if (newUserData.id_carrito !== userData.id_carrito) {
      localStorage.setItem("userData", JSON.stringify(newUserData));
    }


    return data; // Devuelve la respuesta si es necesario
  } catch (error) {
    console.error("Error en createOrder:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};