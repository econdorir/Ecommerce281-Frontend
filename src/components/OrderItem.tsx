// components/OrderItem.js

import Link from 'next/link';

const OrderItem = ({ order }) => {
    return (
        <div className="flex justify-between items-center border-b border-gray-300 py-4">
            <div>
                <h3 className="text-lg font-semibold">Pedido #{order.id}</h3>
                <p className="text-gray-600">Estado: {order.status}</p>
                <p className="text-gray-600">Tiempo Esperado: {order.expectedTime} min</p>
                <p className="text-gray-600">Contacto Delivery: {order.deliveryContact}</p>
            </div>
            <Link href={`/orders/${order.id}`} className="text-blue-500 hover:underline">
                Ver Pedido
            </Link>
        </div>
    );
};

export default OrderItem;
