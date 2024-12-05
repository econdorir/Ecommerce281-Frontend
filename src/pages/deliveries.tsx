import { useEffect, useState } from "react";
import DeliveryItem from "@/components/DeliveryItem";
import Navbar from "@/components/Navbar";
import Link from 'next/link';

// Define la interfaz para las entregas y pedidos

interface Comunidad {
  id_comunidad: number;
  nombre_comunidad: string;
  id_municipio: number;
  municipio: {
      id_municipio: number;
      nombre_municipio: string;
      id_provincia: number;
  };
}

interface Artesano {
  nombre_usuario: string;
  celular: number;
  email_usuario: string;
  comunidad: Comunidad;
}

interface Producto {
  nombre_producto: string;
  artesano: Artesano;
}

interface Cliente {
  nombre_usuario: string;
  celular: number;
  email_usuario: string;
}

interface Delivery {
  id_entrega: number;
  id_pedido: number;
  id_cliente: number;
  id_delivery: number;
  estado_entrega: string;
  fecha_entrega: string | null;
  delivery_confirm: boolean;
  cliente_confirm: boolean;
  cliente: Cliente;
  pedido: {
      id_pedido: number;
      id_carrito: number;
      fecha_pedido: string;
      estado_pedido: string;
      monto_pago: number;
      tipo_de_pedido: string;
      carrito: {
          id_carrito: number;
          id_usuario: number;
          aniade: {
              id_aniade: number;
              producto: Producto; // Fixed this line
              cantidad: number;
              artesano_confirm: boolean;
              delivery_confirm: boolean;
          }[];
      };
  };
}

interface Carrito {
  id_carrito: number;
  id_usuario: number | null; // Puede ser nulo si no hay usuario asociado
}

interface Entrega {
  id_entrega: number;
  id_pedido: number;
  id_cliente: number;
  id_delivery: number;
  estado_entrega: string;
  fecha_entrega: string; // Se puede usar Date en tiempo de ejecución
  cliente_confirm: boolean;
  delivery_confirm: boolean;
}

interface Order {
  id_pedido: number;
  id_carrito: number;
  fecha_pedido: string; // Se puede usar Date en tiempo de ejecución
  estado_pedido: string;
  monto_pago: number;
  tipo_pedido: string;
  carrito: Carrito;
  entrega: Entrega[]; // Puede haber múltiples entregas, por eso es un arreglo
}


const Deliveries = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [deliveries2, setDeliveries2] = useState<Delivery[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingDeliveries, setLoadingDeliveries] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
      const userData = localStorage.getItem("userData");
      const deliveryId = userData ? JSON.parse(userData).id_usuario : null;

      if (!deliveryId) {
        setError("No se pudo encontrar el repartidor.");
        setLoadingDeliveries(false);
        return;
      }

      try {
        const deliveryResponse = await fetch("http://localhost:5000/api/v1/entrega/");
        if (!deliveryResponse.ok) {
          throw new Error("Error al obtener las entregas");
        }

        const deliveriesData: Delivery[] = await deliveryResponse.json();
        const userDeliveries = deliveriesData.filter(
          (delivery) => delivery.id_delivery === deliveryId
        );

        setDeliveries(userDeliveries);
      } catch (error: any) {
        setError(error.message || "Hubo un error inesperado.");
      } finally {
        setLoadingDeliveries(false);
      }
    };


    const fetchDeliveries2 = async () => {
      const userData = localStorage.getItem("userData");
      const deliveryId = userData ? JSON.parse(userData).id_usuario : null;

      if (!deliveryId) {
        setError("No se pudo encontrar el repartidor.");
        setLoadingDeliveries(false);
        return;
      }

      try {
        const deliveryResponse = await fetch("http://localhost:5000/api/v1/entrega/");
        if (!deliveryResponse.ok) {
          throw new Error("Error al obtener las entregas");
        }

        const deliveriesData: Delivery[] = await deliveryResponse.json();

        setDeliveries2(deliveriesData);
      } catch (error: any) {
        setError(error.message || "Hubo un error inesperado.");
      } finally {
        setLoadingDeliveries(false);
      }
    };


    const fetchOrders = async () => {
      try {
        const orderResponse = await fetch("http://localhost:5000/api/v1/pedido");
        if (!orderResponse.ok) {
          throw new Error("Error al obtener los pedidos");
        }

        const ordersData: Order[] = await orderResponse.json();
        const pendingOrders = ordersData.filter(order => order.estado_pedido === "Pendiente");

        setOrders(pendingOrders);
      } catch (error: any) {
        setError(error.message || "Hubo un error inesperado.");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchDeliveries();
    fetchDeliveries2();
    fetchOrders();
  }, []);
  const addDelivery = async (order: Order) => {
    const id_delivery = JSON.parse(localStorage.getItem("userData") || "{}").id_usuario;
    console.log(order);
    console.log(deliveries2);
    console.log(id_delivery);
  
    // Buscar la entrega correspondiente usando id_pedido
    const deliveryToUpdate = deliveries2.find(delivery => delivery.id_pedido === order.id_pedido);
    
    console.log(deliveryToUpdate);
  
    if (deliveryToUpdate) {
      const response = await fetch(`http://localhost:5000/api/v1/entrega/${deliveryToUpdate.id_entrega}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha_entrega: new Date().toISOString(),
          id_delivery: id_delivery,
        }),
      });
  
      if (response.ok) {
        const updatedDelivery = await response.json();
        console.log("Entrega actualizada:", updatedDelivery);
  
        // Actualiza el estado local
        setDeliveries2(prevDeliveries => 
          prevDeliveries.map(delivery => 
            delivery.id_entrega === deliveryToUpdate.id_entrega ? updatedDelivery : delivery
          )
        );
        setOrders(prev => 
          prev ? prev.filter(order => order.id_pedido !== deliveryToUpdate.id_pedido) : prev
        );
        
      setDeliveries(prevDeliveries => {
        const updatedDeliveries = prevDeliveries.map(delivery => 
          delivery.id_entrega === deliveryToUpdate.id_entrega ? updatedDelivery : delivery
        );

        // Añadir el nuevo deliveryToUpdate si no está en la lista
        if (!updatedDeliveries.some(delivery => delivery.id_entrega === updatedDelivery.id_entrega)) {
          updatedDeliveries.push(updatedDelivery);
        }

        return updatedDeliveries;
      });
      } else {
        console.error("Error al actualizar la entrega:", response.statusText);
      }
    } else {
      console.error("No se encontró una entrega para este pedido.");
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="max-w-2xl w-3/4 mx-auto mt-10 p-4 pt-28">
        <h1 className="text-2xl font-bold mb-4 text-center">Mis Entregas</h1>
        <div className="bg-buttonpagecolor2 shadow-md rounded-lg p-4 mb-6">
          {loadingDeliveries ? (
            <p className="text-center text-gray-600">Cargando entregas...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : deliveries.length === 0 ? (
            <p className="text-center text-gray-600">No tienes entregas realizadas</p>
          ) : (
            deliveries.map((delivery, index) => (
              <DeliveryItem
                key={delivery.id_entrega}
                delivery={{
                  id: delivery.id_entrega,
                  estado: delivery.estado_entrega,
                  fecha_entrega: delivery.fecha_entrega,
                  pedido: delivery.pedido,
                }}
                deliveryNumber={index + 1}
              />
            ))
          )}
        </div>

        <h2 className="text-xl font-bold mb-4 text-center">Pedidos Disponibles</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          {loadingOrders ? (
            <p className="text-center text-gray-600">Cargando pedidos...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-600">No hay pedidos pendientes</p>
          ) : (
            orders.map((order) => {
              if (order.entrega[0].id_delivery === null) {
                return (
                  <div key={order.id_pedido} className="flex justify-between items-center border-b py-2">
                    <div>
                      <p>Pedido ID: {order.id_pedido}</p>
                      <p>Fecha: {new Date(order.fecha_pedido).toLocaleString()}</p>
                      <p>Estado: {order.estado_pedido}</p>
                    </div>
                    <button
                      onClick={() => addDelivery(order)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Añadir Pedido
                    </button>
                    <Link href={`/deliveriesDelivery/${order.entrega[0].id_entrega}`}>
                      <button className="bg-green-500 text-white px-3 py-1 rounded">Ver Detalles</button>
                    </Link>
                  </div>
                );
              }
              // Si id_delivery es null, no se renderiza nada
              return null;
            }) // Aquí es donde estaba el error, faltaba cerrar el map
          )}
        </div>
      </div>
    </>
  );
};

export default Deliveries;
