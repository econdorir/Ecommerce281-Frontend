import React, { useState } from 'react';
import { createProduct } from '../services/OtroProductService';
import '../styles/AddProduct.css';
import Navbar from "@/components/Navbar";

const AddProductForm: React.FC = () => {
    const [name, setname] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [imageFiles, setImageFiles] = useState<FileList | null>(null);
    const [productDescription, setProductDescription] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [freeShipping, setFreeShipping] = useState(false);
    const [shippingThreshold, setShippingThreshold] = useState('');
    const [stock, setStock] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFiles(e.target.files);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name); // Cambiado a 'name' (coincide con el backend)
        formData.append('price', parseFloat(productPrice).toString());
        if (imageFiles && imageFiles.length > 0) {
            formData.append('images', imageFiles[0]); // Cambiado a 'images' (el backend espera un arreglo)
        }
        formData.append('description', productDescription); // Cambiado a 'description'
        formData.append('category', category); // Cambiado a 'category'
        formData.append('tags', tags); // Cambiado a 'tags'
        formData.append('freeShipping', JSON.stringify(freeShipping)); // Cambiado a 'freeShipping'
        if (freeShipping) {
            formData.append('shippingThreshold', shippingThreshold ? shippingThreshold.toString() : '');
        }
        formData.append('stock', stock ? stock.toString() : '');
        formData.append('location', location); // Cambiado a 'location'
        console.log('Datos enviados:', Object.fromEntries(formData));
        try {
            await createProduct(formData); // Asegúrate de que esta función maneja correctamente FormData
            setMessage('Producto añadido con éxito.');
            // Limpiar el formulario
            setname('');
            setProductPrice('');
            setImageFiles(null);
            setProductDescription('');
            setCategory('');
            setTags('');
            setFreeShipping(false);
            setShippingThreshold('');
            setStock('');
            setLocation('');
        } catch (error) {
            setMessage('Error al añadir el producto.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-2xl font-bold text-center mb-6">Añadir Producto</h1>
                    
                    {message && <p className="text-center text-red-500 mb-4">{message}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Nombre del producto"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Precio del producto"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Descripción del producto"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Categoría"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Etiquetas (separadas por comas)"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />

                        <div>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={freeShipping}
                                    onChange={(e) => setFreeShipping(e.target.checked)}
                                    className="mr-2"
                                />
                                Envío gratuito
                            </label>
                        </div>

                        {freeShipping && (
                            <input
                                type="number"
                                placeholder="Cantidad mínima para envío gratuito"
                                value={shippingThreshold}
                                onChange={(e) => setShippingThreshold(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        )}

                        <input
                            type="number"
                            placeholder="Stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Ubicación"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Añadir Producto</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddProductForm;
