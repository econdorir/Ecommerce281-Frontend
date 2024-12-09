import Link from "next/link";

const DeliveryItem = ({ delivery, deliveryNumber }) => {
  return (
    <div className="flex flex-col sm:flex-row border-b py-2 justify-between items-center bg-tertiarypagecolor">
      <div className="flex flex-col p-2">
        <p>Entrega #{deliveryNumber}</p>
        <p>Estado: {delivery.estado}</p>
        <p>Fecha: {delivery.fecha_entrega}</p>
      </div>

      <div className="w-full sm:w-1/3 p-2 flex flex-col space-y-2 items-center">
        <Link className="w-full" href={`/deliveries/${delivery.id}`}>
          <button className="w-full bg-orange-500 text-white px-3 py-1 rounded">
            Confirmaciones
          </button>
        </Link>
        <Link className="w-full" href={`/deliveriesDelivery/${delivery.id}`}>
          <button className="w-full bg-green-500 text-white px-3 py-1 rounded">
            Ver Detalles
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DeliveryItem;
