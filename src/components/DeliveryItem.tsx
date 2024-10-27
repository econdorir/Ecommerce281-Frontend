import Link from 'next/link';

const DeliveryItem = ({ delivery, deliveryNumber }) => {
  return (
    <div className="border-b py-2 flex justify-between">
      <div>
        <p>Entrega #{deliveryNumber}</p>
        <p>Estado: {delivery.estado}</p>
        <p>Fecha: {delivery.fecha_entrega}</p>
      </div>
      <Link href={`/deliveries/${delivery.id}`}>
        <button className="bg-green-500 text-white px-3 py-1 rounded">Ver Entrega</button>
      </Link>
    </div>
  );
};

export default DeliveryItem;
