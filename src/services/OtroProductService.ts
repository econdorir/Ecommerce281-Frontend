import axios from 'axios';
import { API_URL } from '../libs/constants';

export const createProduct = async (formData: FormData) => {
    try {
        const response = await axios.post(`${API_URL}/products`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Opcional: axios maneja esto automáticamente
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error en createProduct:', error);
        throw error;
    }
};
// Función para actualizar un producto
export const updateProduct = async (productId: string, formData: FormData) => {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: "PUT",
            body: formData, // Usar formData directamente sin cabecera de Content-Type
        });

        if (!response.ok) {
            throw new Error("Error al actualizar el producto");
        }

        const data = await response.json();
        return data; // Puedes devolver la respuesta si es necesario
    } catch (error) {
        console.error("Error en updateProduct:", error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};
