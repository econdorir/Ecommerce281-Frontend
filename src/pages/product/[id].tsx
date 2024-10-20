import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { QuantitySelector } from "@/components/QuantitySelector";
import { ProductSlideShow } from "@/components/ProductSlideShow";
import { FaTimes } from "react-icons/fa";
import { ProductMobileSlideShow } from "@/components/ProductMobileSlideShow";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Review from "@/components/Review";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context";
import { AddToCartService } from "../../services/AddToCartService";
import { Image, Product } from "../../types/types";

const ProductDetail = ({ product, resenia, clientes }) => {
  const router = useRouter();
  const [reseniasData, setReseniasData] = useState([]);
  const { numberOfProductsInCart, setNumberOfProductsInCart, cart, setCart } =
    useAppContext();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/resenia");
        if (!response.ok) {
          throw new Error("Error al cargar las resenias");
        }
        const data = await response.json();
        setReseniasData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, []);

  const handleAddToCart = async (product: Product) => {
    setCart((prevCart: Product[]) => {
      // Verificar si el producto ya existe en el carrito
      const existingProduct = prevCart.find((item) => item.id_producto === product.id_producto);
      console.log(product)
      if (existingProduct) {
        // Si el producto ya existe, incrementar su cantidad
        return prevCart.map((item) =>
          item.id_producto === product.id_producto
            ? { ...item, cantidad: item.cantidad + 1
             } // Aumentar cantidad
            : item
        );
      } else {
        // Si no existe, agregar el producto con cantidad inicial de 1
        return [...prevCart, { ...product, cantidad: 1 }];
      }
    });
  
    // Actualizar el número de productos en el carrito
    setNumberOfProductsInCart((prevCount) => prevCount + 1);
  
    const storedUserData: any = localStorage.getItem("userData");
    const userData = JSON.parse(storedUserData);
  
    try {
      // Realizar la llamada a la API para añadir el producto al carrito
      const result = await AddToCartService(
        product.id_producto,
        userData.id_carrito,
        1
      );
  
      // Puedes realizar alguna acción adicional aquí si el resultado es satisfactorio
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    }
  };
  

  const handleClose = () => {
    router.push("/products");
  };
  if (!product) return <div>Cargando...</div>;

  return (
    <>
      <Navbar />
      <div className="mt-52 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3 mx-5 px-36">
        <div className="col-span-1 md:col-span-2">
          <button
            onClick={handleClose}
            className="flex items-center justify-center bg-gray-400 text-white p-2 rounded-full shadow hover:bg-blue-950 transition duration-200"
          >
            <FaTimes />
          </button>

          {/* Mobile slideshow */}
          <ProductMobileSlideShow
            title={product.nombre_producto}
            images={
              product.imagen[0]?.url_imagen ||
              "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
            }
            className="block md:hidden"
          />

          {/* Desktop slideshow */}
          <ProductSlideShow
            title={product.nombre_producto}
            images={product.imagen}
            className="hidden md:block max-w-lg mx-auto"
          />
        </div>

        <div className="col-span-1 px-5 mx-5">
          <h1 className="antialiased font-bold text-4xl my-2">
            {product.nombre_producto}
          </h1>
          <p className="text-lg my-3">Bs {product.precio_producto}</p>
          <QuantitySelector quantity={1}></QuantitySelector>
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out my-5"
          >
            Agregar al carrito
          </button>
          <h3 className="font-bold text-xl">Descripcion</h3>
          <p className="font-light text-justify">
            {product.descripcion_producto}
          </p>
          <h3 className="font-bold text-xl">Stock</h3>
          <p className="font-light text-xl">{product.stock_producto}</p>
          <h3 className="font-bold text-xl">Categoria</h3>
          <p className="font-light text-xl">{product.categoria_producto}</p>

          <div className="flex items-center my-2">
            <span className="mx-1 my-1 font-light">
              <h3 className="font-bold text-xl">Peso</h3>
              <p className="font-light text-xl">{product.peso_producto}</p>
              <h3 className="font-bold text-xl">Largo</h3>
              <p className="font-light text-xl">{product.largo_producto}</p>
            </span>
            <span className="mx-1 my-1 font-light">
              <h3 className="font-bold text-xl">Ancho</h3>
              <p className="font-light text-xl">{product.ancho_producto}</p>
              <h3 className="font-bold text-xl">Alto</h3>
              <p className="font-light text-xl">{product.alto_producto}</p>
            </span>
          </div>

          {/*<h3 className="font-bold text-xl">Rating</h3>
          <div className="flex items-center my-2">
            {Array.from({ length: 5 }, (_, index) => {
              if (index < product.rating.rate) {
                return <FaStar key={index} className="text-blue-500" />;
              } else if (index < product.rating.rate + 0.5) {
                return <FaStarHalfAlt key={index} className="text-blue-500" />;
              }
              return <FaStar key={index} className="text-gray-400" />;
            })}
            <span className="ml-2 font-light">
              ({product.rating.count} votos)
            </span>
          </div>*/}
        </div>
      </div>
      <h3 className="font-bold text-4xl text-center my-5">Reseñas</h3>
      <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-3 mx-5 px-36">
        {
          // Filtrar reseñas por producto
          resenia.filter((item) => item.id_producto === product.id_producto)
            .length > 0 ? (
            resenia
              .filter((item) => item.id_producto === product.id_producto)
              .map((item) => {
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
                        {item.fecha_resenia}
                      </span>
                      <br />
                      <span className="text-gray-700">
                        {item.descripcion_resenia}
                      </span>
                    </p>
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
            <p className=" col-span-3 font-light text-center text-gray-500 text-lg">
              No hay reseñas disponibles para este producto.
            </p>
          )
        }
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const productResponse = await fetch(
    `http://localhost:5000/api/v1/producto/${id}`
  );
  const product = await productResponse.json();

  const reseniaResponse = await fetch(`http://localhost:5000/api/v1/resenia`);
  const resenia = await reseniaResponse.json();

  const clienteResponse = await fetch(`http://localhost:5000/api/v1/cliente`);
  const clientes = await clienteResponse.json();

  return {
    props: { product, resenia, clientes },
  };
};

export default ProductDetail;
