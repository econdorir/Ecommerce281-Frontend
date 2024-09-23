// services/RecoveryService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/recovery"; // Reemplaza con tu URL de API

export const RecoveryService = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/recover`, { email });
    return response.data; // Suponiendo que la API devuelve datos útiles
  } catch (error) {
    // Manejo de errores más específico si es necesario
    throw new Error(error.response?.data?.message || "Error al intentar recuperar la cuenta.");
  }
};
