// components/OrderItem.js

import Link from 'next/link';

const OrderItem = ({ order, orderNumber }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Pedido #{orderNumber}</h3>
                <div className="text-gray-600 mb-1">
                    <span className="font-medium">Fecha - Hora:</span> {order.fecha_pedido}
                </div>
                <div className="text-gray-600 mb-1">
                    <span className="font-medium">Estado:</span> <span className='capitalize'>{order.status}</span>
                </div>
                <div className="text-gray-600 mb-1">
                    <span className="font-medium">Total:</span> <span className="font-semibold">{order.monto_pago} Bs</span>
                </div>
                <div className="text-gray-600">
                    <span className="font-medium">Tipo:</span> <span className='capitalize'>{order.tipo_de_pedido}</span>
                </div>
            </div>
            <Link 
                href={`/orders/${order.id}`} 
                className="mt-2 md:mt-0 inline-block bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Ver detalles del pedido ${orderNumber}`}
            >
                Ver Pedido
            </Link>
        </div>
    );
};

export default OrderItem;
