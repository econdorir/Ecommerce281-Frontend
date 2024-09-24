// services/RecoveryService.js
import axios from "axios";

const PUBLIC_API_URL = "http://localhost:5000/api/v1"; // Reemplaza con tu URL de API

export const RecoveryService = async (email_usuario, tipo_usuario) => {
  try {
    const response = await axios.post(`${PUBLIC_API_URL}/auth/recovery`, {
      email_usuario: email_usuario,
      tipo_usuario: tipo_usuario,
    });
    return response.data; // Suponiendo que la API devuelve datos útiles
  } catch (error) {
    // Manejo de errores más específico si es necesario
    throw new Error(
      error.response?.data?.message || "Error al intentar recuperar la cuenta."
    );
  }
};
