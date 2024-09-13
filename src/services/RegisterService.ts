const axios = require('axios');

export const RegisterService = async (username, email, password, role) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/${role}`, {
            nombre_usuario: username,
            email_usuario: email,
            password_usuario: password
        });
        return response.data;  // Maneja la respuesta como prefieras
    } catch (error) {
        console.error('Error en el registro:', error.response ? error.response.data : error.message);
        throw error;  // Propaga el error para que pueda ser manejado en otro lugar
    }
};
