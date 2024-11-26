// services/ChangePasswordService.js
import axios from "axios";
import { API_URL } from '../libs/constants';

export const ChangePasswordService = async (recovery_token, email, newPassword, role) => {
  
  try {
    const response = await axios.post(`${API_URL}/auth/change-password`, {
      recovery_token: recovery_token,
      email_usuario: email,
      password_usuario: newPassword,
      tipo_usuario: role
    });
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    // Maneja el error y lanza una excepción con un mensaje más claro
    throw new Error(
      error.response?.data?.message || "Error al cambiar la contraseña."
    );
  }
};
