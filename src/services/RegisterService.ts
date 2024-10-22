import { API_URL } from '../libs/constants';
const axios = require("axios");

export const RegisterService = async (
  username,
  email,
  password,
  role,
  currentDate,
  cellphone
) => {
  try {
    const response = await axios.post(`${API_URL}/${role}`, {
      nombre_usuario: username,
      email_usuario: email,
      password_usuario: password,
      tipo_usuario: role,
      fecha_registro: currentDate,
      celular: cellphone
    });
    console.log(response);
    console.log(response.data);
    console.log(response.data.nombre_usuario)
    const userData = {
      id_usuario: response.data.id_usuario,
      nombre_usuario: response.data.nombre_usuario,
      password_usuario: response.data.password_usuario,
      email_usuario: response.data.email_usuario,
      tipo_usuario: response.data.tipo_usuario,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    return response.data; // Maneja la respuesta como prefieras
  } catch (error) {
    console.error(
      "Error en el registro:",
      error.response ? error.response.data : error.message
    );
    throw error; // Propaga el error para que pueda ser manejado en otro lugar
  }
};
