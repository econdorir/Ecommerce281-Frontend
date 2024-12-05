// services/RecoveryService.js
import { API_URL } from '../libs/constants';
import axios from "axios";

export const RecoveryService = async (email_usuario, tipo_usuario) => {
  try {
    const response = await axios.post(`${API_URL}/auth/recovery`, {
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
