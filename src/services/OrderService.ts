import { API_URL } from "../libs/constants";
import io from "socket.io-client";

// Conexión con el servidor WebSocket en el puerto 4000
const socket = io("http://localhost:4000"); // Cambia la URL al puerto correcto

// Verificar la conexión al servidor WebSocket
socket.on("connect", () => {
  console.log("Conectado al servidor WebSocket");
});

socket.on("connect_error", (err) => {
  console.error("Error de conexión:", err);
});

// Escuchar el evento 'notify_deliveries' para recibir notificaciones
socket.on("notify_deliveries", (data) => {
  console.log("Nueva notificación para deliveries:", data.message);
  console.log("Detalles del pedido:", data.orderDetails);
  // Aquí puedes agregar lógica para mostrar notificaciones al usuario
});

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

    // Emitir el evento de "new_order" para notificar a los deliveries
    socket.emit("new_order", {
      message: `Nuevo pedido de ${userData.name || "un cliente desconocido"}`,
      orderDetails: data.nuevoCliente, // Puedes personalizar los detalles que envías
    });

    return data; // Devuelve la respuesta si es necesario
  } catch (error) {
    console.error("Error en createOrder:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};