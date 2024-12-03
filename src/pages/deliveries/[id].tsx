import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import confirmDelivery from "@/components/DeliveryComponent";

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

interface Aniade {
  id_aniade: number;
  producto: Producto;
  cantidad: number;
  artesano_confirm: boolean;
  delivery_confirm: boolean;
}

const DeliveryDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [deliveryDetails, setDeliveryDetails] = useState<Delivery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedArtesano, setSelectedArtesano] = useState<Artesano | null>(
    null
  );
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [modalType, setModalType] = useState<"artesano" | "cliente" | null>(
    null
  );

  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      if (!id) return;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entrega/${id}`);
                if (!response.ok) {
                    throw new Error("Error al obtener los detalles de la entrega");
                }

        const data: Delivery = await response.json();
        setDeliveryDetails(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDeliveryDetails();
    }
  }, [id]);

  const handleShowModal = useCallback((artesano: Artesano) => {
    setSelectedArtesano(artesano);
    setModalType("artesano");
    setShowModal(true);
  }, []);

  const handleShowClienteModal = useCallback((cliente: Cliente) => {
    setSelectedCliente(cliente);
    setModalType("cliente");
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedArtesano(null);
    setSelectedCliente(null);
    setModalType(null);
  }, []);

    async function updateDeliveryStatus(deliveryDetails: Delivery) {
        // Verificar todos los "aniades" para determinar el estado de la entrega
        const allConfirmed = deliveryDetails.pedido.carrito.aniade.every(item => item.artesano_confirm && item.delivery_confirm);
        const someConfirmed = deliveryDetails.pedido.carrito.aniade.some(item => item.artesano_confirm || item.delivery_confirm);

        let estadoEntrega = "Pendiente"; // Valor por defecto
        if (allConfirmed) {
            estadoEntrega = "En camino";
        } else if (someConfirmed) {
            estadoEntrega = "En preparacion";
        }
        console.log(estadoEntrega)
    
        // Realizar el POST para actualizar el estado de la entrega y el pedido
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entrega/${deliveryDetails.id_entrega}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    estado_entrega: estadoEntrega,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Error al actualizar el estado de la entrega');
            }
    
            const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pedido/${deliveryDetails.pedido.id_pedido}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    estado_pedido: estadoEntrega,
                }),
            });
    
            if (!response2.ok) {
                throw new Error('Error al actualizar el estado del pedido');
            }
    
            // Actualizar el estado local en el estado de la aplicación
            setDeliveryDetails(prev => (prev ? {
                ...prev,
                estado_entrega: estadoEntrega,
                pedido: {
                    ...prev.pedido,
                    estado_pedido: estadoEntrega,
                }
            } : prev));
    
        } catch (error) {
            console.error("Error al actualizar el estado:", error);
        }
    }
    
    const confirmDelivery = async () => {
        
        if (!deliveryDetails) return;

        
        const allConfirmed = deliveryDetails.pedido.carrito.aniade.every(item => item.artesano_confirm && item.delivery_confirm);

        if(!allConfirmed){
            alert("Se debe completar todas las confirmaciones con los Artesanos!");
            return;
        }

        try {
                // Si ambas confirmaciones están en true, no permitir modificaciones
            console.log(deliveryDetails)
            if (deliveryDetails.delivery_confirm && deliveryDetails.cliente_confirm) {
                alert("La entrega ya fue confirmada por ambas partes y no se puede modificar.");
                return;
            }
            if (deliveryDetails.delivery_confirm && !deliveryDetails.cliente_confirm){
            window.confirm("¿Deseas cancelar la confirmación de la entrega?")
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entrega/${deliveryDetails.id_entrega}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fecha_entrega: new Date().toISOString(),
                    delivery_confirm: false
                }),
            });

        if (!response.ok) {
          throw new Error("Error al confirmar la entrega");
        }

        setDeliveryDetails((prev) =>
          prev
            ? {
                ...prev,
                fecha_entrega: new Date().toISOString(),
                delivery_confirm: false,
              }
            : prev
        );

            alert("Confirmacion cancelada con éxito");
            return;
            }

            if (!deliveryDetails.delivery_confirm){

                window.confirm("¿Deseas confirmar la entrega?");
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entrega/${deliveryDetails.id_entrega}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fecha_entrega: new Date().toISOString(),
                        delivery_confirm: true
                    }),
                });
    
                if (!response.ok) {
                    throw new Error("Error al confirmar la entrega");
                }
                if(deliveryDetails.cliente_confirm){
                    
                    setDeliveryDetails(prev => (prev ? {
                        ...prev,
                        delivery_confirm: true,
                        estado_entrega: "Entregado",
                        pedido: {
                            ...prev.pedido,
                            estado_pedido: "Entregado"
                        }
                    } : prev));
                }else{
                    setDeliveryDetails(prev => (prev ? {
                        ...prev,
                        fecha_entrega: new Date().toISOString(),
                        delivery_confirm: true
                    } : prev));
                }
                alert("Entrega confirmada con éxito");
                return;
            }
        } catch (error: any) {
            alert(error.message);
        }
    };


    const ConfirmArtesano =  useCallback( async (aniade: Aniade) => {
        if (!aniade) return;
        try {
            if (aniade.delivery_confirm && aniade.artesano_confirm) {
                alert("La entrega ya fue confirmada por ambas partes y no se puede modificar.");
                return;
            }
            if (aniade.delivery_confirm && !aniade.artesano_confirm){
            window.confirm("¿Deseas cancelar la confirmación de la entrega?")
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/aniade/${aniade.id_aniade}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    delivery_confirm: false
                }),
            });

          if (!response.ok) {
            throw new Error("Error al confirmar la entrega");
          }

            setDeliveryDetails(prev => {
                const updatedDetails = prev ? {
                    ...prev,
                    pedido: {
                        ...prev.pedido,
                        carrito: {
                            ...prev.pedido.carrito,
                            aniade: prev.pedido.carrito.aniade.map(item =>
                                item.id_aniade === aniade.id_aniade
                                    ? { ...item, delivery_confirm: false }
                                    : item
                            )
                        }
                    }
                } : null;
            
                if (updatedDetails) {
                    updateDeliveryStatus(updatedDetails); // Llama a la función solo si no es null
                }
                return updatedDetails; // Devuelve el estado actualizado o null
            });
            

          alert("Confirmacion cancelada con éxito");
        }

            if (!aniade.delivery_confirm){
                window.confirm("¿Deseas confirmar la entrega?");
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/aniade/${aniade.id_aniade}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        delivery_confirm: true
                    }),
                });
    
                if (!response.ok) {
                    throw new Error("Error al confirmar la entrega");
                }
    
                setDeliveryDetails(prev => {
                    const updatedDetails = prev ? {
                        ...prev,
                        pedido: {
                            ...prev.pedido,
                            carrito: {
                                ...prev.pedido.carrito,
                                aniade: prev.pedido.carrito.aniade.map(item =>
                                    item.id_aniade === aniade.id_aniade
                                        ? { ...item, delivery_confirm: true }
                                        : item
                                )
                            }
                        }
                    } : null;
                    if (updatedDetails) {
                        updateDeliveryStatus(updatedDetails); // Llama a la función solo si no es null
                    }
                    return updatedDetails; // Devuelve el estado actualizado o null
                });
                
                
                
                alert("Entrega confirmada con éxito");
            }
        } catch (error: any) {
            alert(error.message);
        }
    }, [deliveryDetails]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!deliveryDetails) return <p>No se encontraron detalles de la entrega.</p>;

  const cliente = deliveryDetails.cliente;

  return (
    <>
      <Navbar />
      <div className="max-w-2xl w-3/4 mx-auto mt-10 p-4 pt-28">
        <h1 className="text-2xl font-bold mb-4">
          Detalle de la Entrega #{deliveryDetails.id_entrega}
        </h1>
        <div className="bg-buttonpagecolor2 shadow-md rounded-lg p-4 text-white">
          <p className="font-semibold text-buttonpagecolor">
            Estado: {deliveryDetails.estado_entrega}
          </p>
          <p className="font-semibold text-buttonpagecolor">
            Fecha de Entrega:{" "}
            {deliveryDetails.fecha_entrega
              ? new Date(deliveryDetails.fecha_entrega).toLocaleString()
              : "No disponible"}
          </p>

          <h3 className="text-lg font-bold mt-4 text-buttonpagecolor">
            Productos del Pedido:
          </h3>
          <ul className="">
            {deliveryDetails.pedido.carrito.aniade.map((item) => (
              <li
                key={item.id_aniade}
                className="my-8 flex flex-col sm:flex-row justify-between items-center mb-2"
              >
                {/* Contenedor para el texto alineado a la izquierda */}
                <span className="sm:w-2/6">
                  {item.producto.nombre_producto} (Cantidad: {item.cantidad})
                </span>

                {/* Contenedor para los botones alineados a la derecha */}
                <div className="w-full flex sm:w-3/6 space-x-2">
                  <button
                    onClick={() => handleShowModal(item.producto.artesano)}
                    className="w-1/2 sm:w-full bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                  >
                    Ver Artesano
                  </button>
                  <button
                    onClick={() => ConfirmArtesano(item)}
                    className={`w-1/2 sm:w-full px-3 py-1 rounded-md ${
                      item.delivery_confirm && !item.artesano_confirm
                        ? "bg-red-600 hover:bg-red-700"
                        : item.delivery_confirm && item.artesano_confirm
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-orange-600 hover:bg-orange-700"
                    } text-white`}
                  >
                    {item.delivery_confirm && !item.artesano_confirm
                      ? "Cancelar Confirmación"
                      : item.delivery_confirm && item.artesano_confirm
                      ? "Pedido Terminado"
                      : "Confirmar"}
                  </button>
                </div>
                <div className="mt-10 w-full h-[1px] bg-white sm:hidden"></div>
              </li>
            ))}
          </ul>

          <div className="w-full mt-4 items-center justify-center">
            <button
              onClick={() => handleShowClienteModal(cliente)}
              className="w-full max-w-52 bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700"
            >
              Ver Cliente
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={confirmDelivery}
              className={`w-full max-w-52 px-3 py-1 rounded-md ${
                deliveryDetails.delivery_confirm &&
                !deliveryDetails.cliente_confirm
                  ? "bg-red-600 hover:bg-red-700"
                  : deliveryDetails.delivery_confirm &&
                    deliveryDetails.cliente_confirm
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-orange-600 hover:bg-orange-700"
              } text-white`}
            >
              {deliveryDetails.delivery_confirm &&
              !deliveryDetails.cliente_confirm
                ? "Cancelar Confirmación"
                : deliveryDetails.delivery_confirm &&
                  deliveryDetails.cliente_confirm
                ? "Pedido Terminado"
                : "Confirmar"}
            </button>
          </div>
        </div>

        {showModal && modalType === "artesano" && selectedArtesano && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Contacto del Artesano
              </h2>
              <ul>
                <li>Nombre: {selectedArtesano.nombre_usuario}</li>
                <li>Celular: {selectedArtesano.celular}</li>
                <li>Email: {selectedArtesano.email_usuario}</li>
                <li>
                  Comunidad: {selectedArtesano.comunidad.nombre_comunidad}
                </li>
                <li>
                  Municipio:{" "}
                  {selectedArtesano.comunidad.municipio.nombre_municipio}
                </li>
              </ul>
              <button
                onClick={handleCloseModal}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {showModal && modalType === "cliente" && selectedCliente && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Contacto del Cliente
              </h2>
              <ul>
                <li>Nombre: {selectedCliente.nombre_usuario}</li>
                <li>Celular: {selectedCliente.celular}</li>
                <li>Email: {selectedCliente.email_usuario}</li>
              </ul>
              <button
                onClick={handleCloseModal}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DeliveryDetails;
