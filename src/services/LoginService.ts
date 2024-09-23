const axios = require('axios');

export const LoginService = async (email, password) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/login`, {
            email_usuario: email,
            password_usuario: password
        });
        return response.data;
    } catch (error) {
        console.error('Error en el inicio de sesión:', error.response ? error.response.data : error.message);
        throw error;
    }
};
