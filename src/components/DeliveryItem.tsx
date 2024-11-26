import Link from 'next/link';

const DeliveryItem = ({ delivery, deliveryNumber }) => {
  return (
    <div className="border-b py-2 flex justify-between">
  <div>
    <p>Entrega #{deliveryNumber}</p>
    <p>Estado: {delivery.estado}</p>
    <p>Fecha: {delivery.fecha_entrega}</p>
  </div>
  
  <div className="flex flex-col space-y-2 items-center">
    <Link href={`/deliveries/${delivery.id}`}>
      <button className="bg-orange-500 text-white px-3 py-1 rounded">Confirmaciones</button>
    </Link>
    <Link href={`/deliveriesDelivery/${delivery.id}`}>
      <button className="bg-green-500 text-white px-3 py-1 rounded">Ver Detalles</button>
    </Link>
  </div>
</div>

  );
};

export default DeliveryItem;
