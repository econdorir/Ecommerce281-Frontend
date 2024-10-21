// pages/deliveries/[id].js

import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import DeliveryItem from "@/components/DeliveryItem"; // Asegúrate de tener un componente para mostrar cada entrega

const DeliveryDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  // Simulación de una entrega (esto debería venir de tu API)
  const deliveryDetails = {
    id: id,
    status: "En camino",
    expectedTime: 25, // Tiempo estimado en minutos
    deliveryContact: "123-456-7890",
    deliveryDate: "2024-10-20 15:30", // Fecha y hora de la entrega
    items: [
      { id: 1, name: "Entrega 1", estado: "Entregado" },
      { id: 2, name: "Entrega 2", estado: "Pendiente" },
      { id: 3, name: "Entrega 3", estado: "En camino" },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl w-3/4 mx-auto mt-10 p-4 pt-28">
        <h1 className="text-2xl font-bold mb-4">
          Detalles de la Entrega #{deliveryDetails.id}
        </h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          <p className="font-semibold">Estado: {deliveryDetails.status}</p>
          <p className="font-semibold">
            Tiempo Estimado: {deliveryDetails.expectedTime} min
          </p>
          <p className="font-semibold">
            Contacto Delivery: {deliveryDetails.deliveryContact}
          </p>
          <p className="font-semibold">
            Fecha y Hora de Entrega: {deliveryDetails.deliveryDate}
          </p>
          <h2 className="text-lg font-bold mt-4">Detalles de las Entregas:</h2>
          {deliveryDetails.items.map((item, index) => (
            <DeliveryItem 
              key={item.id} 
              delivery={item} 
              deliveryNumber={index + 1} // Pasar el número de entrega (índice + 1)
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DeliveryDetails;
