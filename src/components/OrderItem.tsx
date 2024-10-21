// components/OrderItem.js

import Link from 'next/link';
import React, { useState } from 'react';

// Definimos la interfaz para los contactos de delivery
interface DeliveryContact {
    nombre_usuario: string;
    celular: number; // Cambiamos a number
    email_usuario: string;
}

const OrderItem = ({ order, orderNumber }) => {
    const [showModal, setShowModal] = useState(false);
    const [deliveryContacts, setDeliveryContacts] = useState<DeliveryContact | null>(null);

    const fetchDeliveryContacts = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/pedido/${order.id}`);
            if (!response.ok) {
                throw new Error('Error al obtener contactos del delivery');
            }

            const data = await response.json();
            console.log(data); // Para verificar la respuesta

            // Accediendo a la información de delivery desde el primer elemento de entrega
            if (data.entrega.length > 0) {
                setDeliveryContacts(data.entrega[0].delivery); // Acceder a la información de delivery
            } else {
                setDeliveryContacts(null); // No hay entregas
            }
        } catch (error) {
            console.error('Error fetching delivery contacts:', error);
        }
    };

    const handleShowModal = () => {
        fetchDeliveryContacts();
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-start border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Pedido #{orderNumber}</h3>
                <div className="text-gray-600 mb-1">
                    <span className="font-medium">Fecha - Hora:</span> {order.fecha_pedido}
                </div>
                <div className="text-gray-600 mb-1">
                    <span className="font-medium">Estado:</span> <span className='capitalize'>{order.estado_pedido}</span>
                </div>
                <div className="text-gray-600 mb-1">
                    <span className="font-medium">Total:</span> <span className="font-semibold">{order.monto_pago} Bs</span>
                </div>
                <div className="text-gray-600">
                    <span className="font-medium">Tipo:</span> <span className='capitalize'>{order.tipo_de_pedido}</span>
                </div>
            </div>
            <div className="flex flex-col md:items-end">
                <Link 
                    href={`/orders/${order.id}`} 
                    className="mt-2 md:mt-0 inline-block bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`Ver detalles del pedido ${orderNumber}`}
                >
                    Ver Pedido
                </Link>
                <button 
                    onClick={handleShowModal} 
                    className="mt-2 inline-block bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
                    aria-label="Ver contactos del delivery"
                >
                    Ver Contacto
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 scale-100">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contacto del Delivery</h2>
                        {deliveryContacts ? (
                            <ul>
                                <li>Nombre: {deliveryContacts.nombre_usuario}</li>
                                <li>Celular: {deliveryContacts.celular}</li> {/* Se muestra como número */}
                                <li>Email: {deliveryContacts.email_usuario}</li>
                            </ul>
                        ) : (
                            <p>Cargando contactos del delivery...</p>
                        )}
                        <button 
                            onClick={handleCloseModal} 
                            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderItem;
