import Link from 'next/link';

const DeliveryItem = ({ delivery, deliveryNumber }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-green-50 to-white">
            <div className="flex-1 mb-4 md:mb-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Entrega #{deliveryNumber}</h3>
                <div className="text-gray-600 mb-1">
                    <span className="font-medium">Fecha - Hora de Entrega:</span> {delivery.fecha_entrega}
                </div>
                <div className="text-gray-600 mb-1">
                    <span className="font-medium">Estado:</span> <span className='capitalize'>{delivery.estado}</span>
                </div>
            </div>
            <Link 
                href={`/deliveries/${delivery.id}`} 
                className="mt-2 md:mt-0 inline-block bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label={`Ver detalles de la entrega ${deliveryNumber}`}
            >
                Ver Entrega
            </Link>
        </div>
    );
};

export default DeliveryItem;
