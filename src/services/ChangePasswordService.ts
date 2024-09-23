// services/ChangePasswordService.js
import axios from "axios";

const API_URL = "https://yourapi.com/api"; // Reemplaza con la URL de tu API

export const ChangePasswordService = async (email, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/change-password`, {
      email,
      newPassword,
    });
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    // Maneja el error y lanza una excepción con un mensaje más claro
    throw new Error(
      error.response?.data?.message || "Error al cambiar la contraseña."
    );
  }
};
