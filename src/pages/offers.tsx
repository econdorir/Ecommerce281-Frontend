import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { OfferSlideShow } from "@/components/OfferSlideShow";
import axios from "axios";
import { Vortex } from "@/components/ui/vortex";

// Define la interfaz para el producto
interface Image {
  id_imagen: number;
  url_imagen: string;
  id_producto: number;
}

interface Product {
  id_producto: number;
  id_artesano: number;
  id_promocion: number;
  nombre_producto: string;
  precio_producto: number;
  descripcion_producto: string;
  stock_producto: string;
  imagen: Image[];
}

// Define la interfaz para la promoción
interface Offer {
  id_promocion: number;
  descuento_promocion: number;
  fecha_ini: Date;
  fecha_fin: Date;
  nombre_promocion: string;
}

const Offers: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get<Product[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/producto/`
        );
        setProducts(productResponse.data);
        const offerResponse = await axios.get<Offer[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/promocion/`
        );
        setOffers(offerResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getCurrentOffers = () => {
    const today = new Date(); // Fecha para pruebas
    return offers.filter((offer) => {
      const startDate = new Date(offer.fecha_ini);
      const endDate = new Date(offer.fecha_fin);
      return today >= startDate && today <= endDate;
    });
  };

  const currentOffers = getCurrentOffers();

  const filteredProducts = products
    .filter((product) => {
      console.log(
        "Checking product:",
        product.nombre_producto,
        "with id_promocion:",
        product.id_promocion
      );
      return currentOffers.some(
        (offer) => offer.id_promocion === product.id_promocion
      );
    })
    .map((product) => {
      console.log("Product after filter:", product.nombre_producto);
      const offer = currentOffers.find(
        (offer) => offer.id_promocion === product.id_promocion
      );
      const discountedPrice = offer
        ? product.precio_producto -
          product.precio_producto * (offer.descuento_promocion / 100)
        : product.precio_producto;

      return {
        ...product,
        precio_con_descuento: discountedPrice,
      };
    });

  console.log("Filtered Products:", filteredProducts);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error)
    return (
      <div className="text-red-500">Error al cargar los productos: {error}</div>
    );

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-auto pt-20 bg-black">
        <Vortex
          backgroundColor="black"
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full z-0"
        >
          {currentOffers.length > 0 ? (
            currentOffers.map((offer) => (
              <div
                key={offer.id_promocion}
                className="bg-[#000] text-[#2EC4B6] text-center p-2 sm:px-5 rounded-lg shadow-lg mb-6 font-mono border border-[#CBF3F0]"
              >
                <h2 className="text-xxl font-bold my-4">Ofertas Especiales</h2>
                <h2 className="text-lg font-bold text-[#FF9F1C] my-3">
                  {offer.nombre_promocion}
                </h2>
                <h2 className="text-md font-bold text-[#FFBF69] my-3">
                  {offer.descuento_promocion}% DE DESCUENTO EN PRODUCTOS
                  SELECCIONADOS
                </h2>
                <p className="my-2 text-[#2EC4B6] text-md">
                  {" "}
                  Válido Del {formatDate(offer.fecha_ini)} Al{" "}
                  {formatDate(offer.fecha_fin)}
                </p>
              </div>
            ))
          ) : (
            <h2 className="bg-[#000] text-[#2EC4B6] text-center p-10 rounded-lg shadow-lg mb-6 font-mono border border-[#CBF3F0]">
              No hay ofertas disponibles en este momento.
            </h2>
          )}
          {filteredProducts.length > 0 ? (
            <OfferSlideShow
              products={filteredProducts}
              className="block max-w-lg mx-auto w-screen"
            />
          ) : (
            <h2 className="bg-[#FFFFFF] text-[#2EC4B6] text-center p-10 rounded-lg shadow-lg mb-6 font-mono border border-[#CBF3F0]">
              No hay productos relacionados con las ofertas actuales.
            </h2>
          )}
        </Vortex>
      </div>
      <Footer />
    </>
  );
};

export default Offers;
