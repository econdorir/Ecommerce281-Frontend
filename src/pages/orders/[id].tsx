import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

interface Producto {
    id_producto: number;
    nombre_producto: string;
    precio_producto: string; // Mantener como string para coincidir con el formato JSON
}

interface Pedido {
    id_pedido: number;
    carrito: {
        aniade: {
            id_aniade: number;
            cantidad: number;
            producto: Producto;
        }[];
    };
}

const OrderDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    const [orderDetails, setOrderDetails] = useState<Pedido | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!id) return;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pedido/${id}`);
                if (!response.ok) {
                    throw new Error("Error al obtener los detalles del pedido");
                }

                const data: Pedido = await response.json();
                setOrderDetails(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrderDetails();
        }
    }, [id]);

    if (loading) return <p className="text-center">Cargando...</p>;
    if (error) return <p className="text-red-600 text-center">{error}</p>;
    if (!orderDetails) return <p className="text-center">No se encontraron detalles del pedido.</p>;

    // Colores de fondo para los productos
    const productBackgroundColors = [
        "bg-blue-200",
        "bg-green-200",
        "bg-yellow-200",
        "bg-red-200",
        "bg-purple-200",
    ];

    return (
        <>
            <Navbar />
            <div className="max-w-4xl w-3/4 mx-auto mt-10 p-4 pt-28">
                <h1 className="text-3xl font-bold mb-4 text-cyan-600">
                    Detalle del Pedido #{orderDetails.id_pedido}
                </h1>
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300"> {/* Color del contenedor principal */}
                  <h2 className="text-2xl font-bold mt-4 mb-2 text-center">Productos del Pedido</h2><br />
                    <ul className="space-y-4">
                        {orderDetails.carrito.aniade.map((item, index) => (
                            <li key={item.id_aniade} className={`flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ${productBackgroundColors[index % productBackgroundColors.length]}`}>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800">{item.producto.nombre_producto}</h4>
                                    <p className="text-gray-600">Cantidad: {item.cantidad}</p>
                                </div>
                                <span className="text-lg font-bold text-green-600">${parseFloat(item.producto.precio_producto).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default OrderDetails;