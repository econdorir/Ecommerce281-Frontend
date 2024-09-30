const axios = require("axios");

export const LoginService = async (email, password, role) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/v1/auth/login`,
      {
        email_usuario: email,
        password_usuario: password,
        tipo_usuario: role,
      }
    );

    // Almacenar información del usuario en localStorage
    const userData = {
      id_usuario: response.data.id_usuario,
      nombre_usuario: response.data.user.nombre_usuario,
      password_usuario: response.data.user.password_usuario,
      email_usuario: response.data.user.email_usuario,
      tipo_usuario: response.data.user.tipo_usuario,
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
