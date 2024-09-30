const axios = require("axios");

export const RegisterService = async (
  username,
  email,
  password,
  role,
  currentDate
) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/v1/${role}`, {
      nombre_usuario: username,
      email_usuario: email,
      password_usuario: password,
      tipo_usuario: role,
      fecha_registro: currentDate,
    });

    const userData = {
      id_usuario: response.data.id_usuario,
      nombre_usuario: response.data.user.nombre_usuario,
      password_usuario: response.data.user.password_usuario,
      email_usuario: response.data.user.email_usuario,
      tipo_usuario: response.data.user.tipo_usuario,
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
