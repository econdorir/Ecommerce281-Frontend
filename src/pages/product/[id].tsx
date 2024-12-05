import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { QuantitySelector } from "@/components/QuantitySelector";
import { ProductSlideShow } from "@/components/ProductSlideShow";
import { FaTimes, FaStar } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { ProductMobileSlideShow } from "@/components/ProductMobileSlideShow";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context";
import { AddToCartService } from "../../services/AddToCartService";
import { Product } from "../../types/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { API_URL } from "@/libs/constants";

const ProductDetail = ({ product, resenia, clientes, promociones }) => {
  const router = useRouter();
  const [reseniasData, setReseniasData] = useState([]);
  const {
    numberOfProductsInCart,
    setNumberOfProductsInCart,
    cart,
    setCart,
    role,
    isLoggedIn,
  } = useAppContext(); // Desestructurar role y isLoggedIn
  const [selectedQuantity, setSelectedQuantity] = useState(1); // State to store selected quantity
  const [finalPrice, setFinalPrice] = useState(product.precio_producto);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/resenia`);
        if (!response.ok) {
          throw new Error("Error al cargar las reseñas");
        }
        const data = await response.json();
        setReseniasData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    // Función para calcular el precio final
    const calculateFinalPrice = () => {
      let price = product.precio_producto;

      // Filtrar promociones aplicables
      const currentDate = new Date();
      const applicablePromotion = promociones.find(
        (promo) =>
          promo.id_promocion === product.id_promocion &&
          new Date(promo.fecha_ini) <= currentDate &&
          new Date(promo.fecha_fin) >= currentDate
      );

      // Si hay una promoción aplicable, calcular el precio final
      if (applicablePromotion) {
        const discount = applicablePromotion.descuento_promocion; // Suponiendo que `descuento` es un porcentaje
        price *= 1 - discount / 100;
      } else {
        console.log("no hay promnociones");
      }

      setFinalPrice(price);
    };

    calculateFinalPrice();
  }, [product, promociones]);

  const handleAddToCart = async (product: Product) => {
    setCart((prevCart: Product[]) => {
      const existingProduct = prevCart.find(
        (item) => item.id_producto === product.id_producto
      );
      if (existingProduct) {
        // Update product quantity based on selectedQuantity
        return prevCart.map((item) =>
          item.id_producto === product.id_producto
            ? { ...item, cantidad: item.cantidad + selectedQuantity } // Use selected quantity
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            ...product,
            cantidad: selectedQuantity,
            precio_producto: finalPrice,
          },
        ];
      }
    });

    setNumberOfProductsInCart((prevCount) => prevCount + selectedQuantity); // Increment by selected quantity

    const storedUserData: any = localStorage.getItem("userData");
    const userData = JSON.parse(storedUserData);

    try {
      await AddToCartService(
        product.id_producto,
        userData.id_carrito,
        selectedQuantity
      );
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  };

  const handleClose = () => {
    router.push("/products");
  };

  if (!product) return <div>Cargando...</div>;

  const renderStars = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="h-5 w-5 text-buttonpagecolor" />);
      } else if (rating >= i - 0.5) {
        stars.push(
          <div className="relative h-5 w-5 overflow-hidden" key={i}>
            <FaStar
              className="absolute h-full w-full text-buttonpagecolor"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
          </div>
        ); // Estrella medio llena
      } else {
        stars.push(<FaStar key={i} className="h-5 w-5 text-gray-300" />);
      }
    }
    return stars;
  };

  // Filtrar reseñas del producto
  const reseñasFiltradas = resenia.filter(
    (item) => item.id_producto === product.id_producto
  );
  const totalCalificacion = reseñasFiltradas.reduce((acc, item) => {
    const calificacion = Number(item.calificacion_resenia); // Asegúrate de que sea un número
    return acc + (isNaN(calificacion) ? 0 : calificacion); // Ignora calificaciones no válidas
  }, 0);
  const promedioCalificacion =
    reseñasFiltradas.length > 0
      ? (totalCalificacion / reseñasFiltradas.length).toFixed(1)
      : 0;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <>
      <Navbar />
      <div className="mt-52 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3 mx-5 sm:px-36">
        <div className="col-span-1 md:col-span-2">
          <button
            onClick={handleClose}
            className="w-12 h-12 flex items-center justify-center bg-buttonpagecolor text-buttonpagecolor2 p-2 rounded-full shadow hover:bg-buttonpagecolor2 font-bolder hover:text-bgpagecolor text-xlg transition duration-200"
          >
            <IoMdArrowBack />
          </button>

          {/* Imagen para pantallas pequeñas */}
          <ProductMobileSlideShow
            title={product.nombre_producto}
            images={
              product.imagen||
              "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
            }
            className="block md:hidden"
          />

          {/* Imagen para pantallas medianas y grandes */}
          <ProductSlideShow
            title={product.nombre_producto}
            images={product?.imagen || "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"}
            className="hidden md:block max-w-lg mx-auto border-black"
          />
          {/* <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {product.imagen.map((image, index) => (
                <CarouselItem key={index}>
                  <Image
                    width={1024}
                    height={800}
                    src={image.url_imagen}
                    alt={"title"}
                    className="rounded-lg  object-fill"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel> */}
        </div>

        <div className="col-span-1 px-5 mx-5">
          <h1 className="antialiased font-bold text-4xl my-2">
            {product.nombre_producto}
          </h1>

          {finalPrice < product.precio_producto ? (
            <>
              <p className="my-3 line-through text-lg">
                Bs {product.precio_producto}
              </p>
              <p className="text-xl my-3 font-bold">Bs {finalPrice.toFixed(2)}</p>
            </>
          ) : (
            <p className="text-lg my-3">Bs {product.precio_producto}</p>
          )}

          {/* Solo mostrar el selector de cantidad y botón si el usuario está logueado y es cliente */}
          {isLoggedIn && role === "cliente" && (
            <>
              <QuantitySelector
                quantity={selectedQuantity}
                onQuantityChange={setSelectedQuantity} // Actualizar cantidad seleccionada
              />

              <button
                onClick={() => handleAddToCart(product)}
                className="bg-buttonpagecolor text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-buttonpagecolor2 transition duration-200 ease-in-out my-5"
              >
                Agregar al carrito
              </button>
            </>
          )}

          <h3 className="font-bold text-xl">Descripcion</h3>
          <p className="font-light text-justify">
            {product.descripcion_producto}
          </p>
          <h3 className="font-bold text-xl">Stock</h3>
          <p className="font-light text-xl">{product.stock_producto}</p>
          <h3 className="font-bold text-xl">Categoria</h3>
          <p className="font-light text-xl">{product.categoria_producto}</p>

          <div className="flex flex-wrap items-center my-2">
            <div className="w-full sm:w-1/2">
              <h3 className="font-bold text-xl">Peso</h3>
              <p className="font-light text-xl">{product.peso_producto}</p>
              <h3 className="font-bold text-xl">Largo</h3>
              <p className="font-light text-xl">{product.largo_producto}</p>
            </div>

            <div className="w-full sm:w-1/2">
              <h3 className="font-bold text-xl">Ancho</h3>
              <p className="font-light text-xl">{product.ancho_producto}</p>
              <h3 className="font-bold text-xl">Alto</h3>
              <p className="font-light text-xl">{product.alto_producto}</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="font-bold text-4xl text-center my-5">Reseñas</h3>
      <div className="grid grid-cols-1 gap-3 mx-5 sm:px-36 text-center">
        <div className="mb-6 p-6 border border-gray-300 rounded-lg shadow-lg bg-gradient-to-br from-white to-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <h1 className="text-5xl">{promedioCalificacion}</h1>
          <div className="flex justify-center items-center mt-2">
            {renderStars(Number(promedioCalificacion))}
          </div>
          <h1>{reseñasFiltradas.length} reseñas</h1>
        </div>
      </div>
      <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-3 mx-5 sm:px-36">
        {reseñasFiltradas.length > 0 ? (
          reseñasFiltradas.map((item) => {
            const cliente = clientes
              .map((c) => ({
                id_usuario: c.id_usuario,
                nombre_usuario: c.nombre_usuario,
                nro_compras: c.nro_compras,
              }))
              .find((c) => c.id_usuario === item.id_usuario);

            return (
              <div
                key={item.id_resenia}
                className="mb-6 p-6 border border-gray-300 rounded-lg shadow-lg bg-gradient-to-br from-white to-gray-100 hover:shadow-2xl transition-shadow duration-300"
              >
                <p className="font-light text-justify text-gray-800">
                  <span className="font-semibold text-xl">
                    {formatDate(item.fecha_resenia)}
                  </span>
                  <br />
                  <span className="text-gray-700">
                    {item.descripcion_resenia}
                  </span>
                </p>
                <div className="flex items-center mt-2">
                  {renderStars(item.calificacion_resenia)}
                </div>

                <div className="mt-4 border-t border-gray-300 pt-3">
                  {cliente ? (
                    <p className="font-light text-gray-600">
                      <span className="font-semibold text-gray-800">
                        {cliente.nombre_usuario}
                      </span>
                      <br />
                      <span className="text-sm italic">
                        {cliente.nro_compras} compras
                      </span>
                    </p>
                  ) : (
                    <p className="font-light text-gray-600 italic">
                      Cliente desconocido
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-3 font-light text-center text-gray-500 text-lg">
            No hay reseñas disponibles para este producto.
          </p>
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const productResponse = await fetch(
    `${API_URL}/producto/${id}`
  );
  const product = await productResponse.json();

  const reseniaResponse = await fetch(`${API_URL}/resenia`);
  const resenia = await reseniaResponse.json();

  const clienteResponse = await fetch(`${API_URL}/cliente`);
  const clientes = await clienteResponse.json();

  const promocionResponse = await fetch(
    `${API_URL}/promocion`
  );
  const promociones = await promocionResponse.json();

  return {
    props: { product, resenia, clientes, promociones },
  };
};

export default ProductDetail;
