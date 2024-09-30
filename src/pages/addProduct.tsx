import React, { useState } from 'react';
import { createProduct } from '../services/ProductService';
import '../styles/AddProduct.css';
//import Navbar from "@/components/Navbar";

const AddProductForm: React.FC = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [image, setImage] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            name: productName,
            price: parseFloat(productPrice),
            image: productName,
            description: productDescription,
        };

        try {
            await createProduct(productData);
            setMessage('Producto añadido con éxito.');
            setProductName('');
            setProductPrice('');
            setImage('');
            setProductDescription('');
        } catch (error) {
            setMessage('Error al añadir el producto.');
        }
    };
    return (
        <>
            <Navbar /> {/* Componente de navegación */}
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"> {/* Centrado vertical y horizontal */}
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"> {/* Estilo del formulario */}
                    <h1 className="text-2xl font-bold text-center mb-6">Añadir Producto</h1> {/* Texto centrado */}
                    
                    {/* Mostrar el mensaje de error o éxito */}
                    {message && <p className="text-center text-red-500 mb-4">{message}</p>} 

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nombre del producto"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            id="productName"
                            name="productName"
                        /> 
                        <input
                            type="text"
                            placeholder="Precio del producto"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            id="productPrice"
                            name="productPrice"
                        />
                        <input
                            type="text"
                            placeholder="URL de la imagen"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            id="productImage"
                            name="productImage"
                        />
                        <input
                            type="text"
                            placeholder="Descripción del producto"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            id="productDescription"
                            name="productDescription"
                        />
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Añadir Producto</button>
                    </form>
                </div>
            </div>
        </>
    );
};
 
export default AddProductForm;
