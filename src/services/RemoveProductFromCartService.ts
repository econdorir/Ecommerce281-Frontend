// services/RemoveProductFromCartService.js
import axios from "axios";
import { API_URL } from "../libs/constants";

export const RemoveProductFromCartService = async (id_carrito, id_producto) => {
  try {
    // Realiza la solicitud DELETE al endpoint correspondiente
    const response = await axios.delete(
      `${API_URL}/carrito/producto/${id_carrito}/${id_producto}`
    );
    return response.data; // Retorna los datos de la respuesta
  } catch (error) {
    // Manejo de errores, imprime el error en la consola
    console.error("Error en RemoveProductFromCartService:", error);
    throw new Error(
      error.response?.data?.message || "Error al eliminar el producto."
    );
  }
};
