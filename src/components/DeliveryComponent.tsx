import React, { useState, useEffect } from 'react';

const DeliveryComponent = () => {
    const [isArtesano, setIsArtesano] = useState(false);
    const [deliveryDetails, setDeliveryDetails] = useState({ id_entrega: null });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userType = getUserType();
        if (userType === 'artesano') {
            setIsArtesano(true);
        }
        loadDeliveryDetails();
    }, []);

    const getUserType = () => {
        return 'artesano'; // Cambia esto según la lógica real de autenticación
    };

    const loadDeliveryDetails = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entrega/detalles/1`);
            if (!response.ok) {
                throw new Error("Error al cargar los detalles de la entrega");
            }
            const data = await response.json();
            setDeliveryDetails(data);
        } catch (error) {
            alert(error.message);
        }
    };

    const confirmDelivery = async () => {
        setLoading(true); // Indicador de carga activo
        if (isArtesano) {
            await confirmDeliveryByArtesano();
        } else {
            await confirmDeliveryByCliente();
        }
        setLoading(false); // Indicador de carga inactivo
    };

    const confirmDeliveryByArtesano = async () => {
        if (!deliveryDetails.id_entrega) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entrega/confirmar/artesano/${deliveryDetails.id_entrega}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    estado_entrega: 'confirmada por artesano',
                    fecha_entrega: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error("Error al confirmar la entrega por el artesano");
            }

            setDeliveryDetails(prev => ({
                ...prev,
                estado_entrega: 'confirmada por artesano',
                fecha_entrega: new Date().toISOString(),
            }));

            alert("Entrega confirmada por el artesano con éxito");
        } catch (error) {
            alert(error.message);
        }
    };

    const confirmDeliveryByCliente = async () => {
        if (!deliveryDetails.id_entrega) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entrega/confirmar/cliente/${deliveryDetails.id_entrega}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    estado_entrega: 'confirmada por cliente',
                    fecha_entrega: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error("Error al confirmar la entrega por el cliente");
            }

            setDeliveryDetails(prev => ({
                ...prev,
                estado_entrega: 'confirmada por cliente',
                fecha_entrega: new Date().toISOString(),
            }));

            alert("Entrega confirmada por el cliente con éxito");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            {/* Indicador de carga */}
            {loading && <p>Cargando...</p>}

            {/* Botón de confirmación de entrega */}
            <div className="mt-4">
                <button
                    onClick={confirmDelivery}
                    className={`bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading} // Desactivar botón durante la carga
                >
                    Confirmar Entrega
                </button>
            </div>
        </div>
    );
};

export default DeliveryComponent;