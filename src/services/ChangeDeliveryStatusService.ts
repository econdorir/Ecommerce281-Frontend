import { API_URL } from '../libs/constants';

export const toggleDeliveryStatus = async (idUser, isActive) => {
  try {
    // Determina el estado como un string
    const estadoString = isActive ? "Activo" : "Inactivo";

    const response = await fetch(`${API_URL}/delivery/${idUser}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      // Envía el estado como un string
      body: JSON.stringify({ estado_delivery: estadoString }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el estado de entrega");
    }

    const data = await response.json();
    console.log(data);
    return data; // Puedes devolver la respuesta si es necesario
  } catch (error) {
    console.error("Error en toggleDeliveryStatus:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};
