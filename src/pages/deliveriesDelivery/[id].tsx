"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MyMapComponent from "@/components/MapComponent";

// Define the structure of the delivery data
interface Delivery {
  id_pedido: number;
  estado_pedido: string;
  fecha_pedido: string;
  monto_pago: number;
  tipo_de_pedido: string;
}

const DeliveryDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);
  const [targetLocation, setTargetLocation] = useState<LatLngExpression | null>(null);

  const locations: LatLngExpression[] = [
    [-16.5, -68.1193], // La Paz
    [-17.3833, -66.1561], // Cochabamba
    [-16.5, -64.035], // Santa Cruz
    [-10.5, -66.3333], // Potosí
    [-18.0, -65.0], // Sucre
    [-14.8333, -61.5833], // Riberalta
    [-16.75, -63.2833], // Tarija
    [-15.0, -60.5], // Guayaramerín
    [-11.0, -68.0], // Cobija
    [-19.5833, -65.75], // Uyuni
  ];

  useEffect(() => {
    if (userLocation) {
      const randomIndex = Math.floor(Math.random() * locations.length);
      const selectedLocation = locations[randomIndex];
      setTargetLocation(selectedLocation);
    }
  }, [userLocation]);

  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      if (!id) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pedido/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener los detalles de la entrega");
        }

        const data: Delivery = await response.json();
        setDelivery(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Hubo un error inesperado.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryDetails();
  }, [id]);

  useEffect(() => {
    const getUserLocation = (): Promise<GeolocationCoordinates | null> => {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation is not supported by this browser."));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position.coords);
          },
          (error) => {
            reject(error);
          }
        );
      });
    };
    getUserLocation()
      .then((coords:any) => {
        setUserLocation([coords.latitude, coords.longitude]);
      })
      .catch((error) => {
        console.error("Error getting user location:", error);
      });
  }, []);

  if (loading) return <p>Cargando detalles de la entrega...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="mt-10 px-20 py-20">
        <h1 className="text-2xl font-bold mb-4">Detalles de la Entrega</h1>
        {delivery && (
          <>
            <p>ID de Pedido: {delivery.id_pedido}</p>
            <p>Estado: {delivery.estado_pedido}</p>
            <p>Fecha: {new Date(delivery.fecha_pedido).toLocaleString()}</p>
            <p>Monto a Pagar: {delivery.monto_pago} Bs</p>
            <p>Tipo de Pedido: {delivery.tipo_de_pedido}</p>
          </>
        )}

        <h2 className="mt-6 text-xl font-bold">Ubicación</h2>
        <MyMapComponent source={userLocation} target={targetLocation} />
      </div>
      <Footer />
    </>
  );
};

export default DeliveryDetail;
