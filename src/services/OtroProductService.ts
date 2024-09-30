const API_URL = "http://localhost:9090/api/products"; 

// Función para crear un producto
export const createProduct = async (productData) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            throw new Error("Error al crear el producto");
        }

        const data = await response.json();
        return data; // Puedes devolver la respuesta si es necesario
    } catch (error) {
        console.error("Error en createProduct:", error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

// Función para actualizar un producto
export const updateProduct = async (productId, productData) => {
    try {
        const response = await fetch(`${"http://localhost:9090/api/products"}/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
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
