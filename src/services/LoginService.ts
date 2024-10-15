import { API_URL } from '../libs/constants';
const axios = require("axios");

export const LoginService = async (email, password, role) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      {
        email_usuario: email,
        password_usuario: password,
        tipo_usuario: role,
      }
    );
    
    // Almacenar información del usuario en localStorage
    const userData = {
      id_usuario: response.data.token.user.id_usuario,
      nombre_usuario: response.data.token.user.nombre_usuario,
      password_usuario: response.data.token.user.password_usuario,
      email_usuario: response.data.token.user.email_usuario,
      tipo_usuario: response.data.token.user.tipo_usuario,
      id_carrito: response.data.carrito.id_carrito
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    return response.data;
  } catch (error) {
    console.error(
      "Error en el inicio de sesión:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
