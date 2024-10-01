import React from "react";
import { useRouter } from "next/router";
import { QuantitySelector } from "@/components/QuantitySelector";
import { ProductSlideShow } from "@/components/ProductSlideShow";
import { FaTimes } from "react-icons/fa";
import { ProductMobileSlideShow } from "@/components/ProductMobileSlideShow";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Navbar from "@/components/Navbar";

const ProductDetail = ({ product }) => {
  const router = useRouter();

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
            images={product.imagen[0].url_imagen}
            className="block md:hidden"
          />

          {/* Desktop slideshow */}
          <ProductSlideShow
            title={product.nombre_producto}
            images={product.imagen[0].url_imagen}
            className="hidden md:block max-w-lg mx-auto"
          />
        </div>

        <div className="col-span-1 px-5 mx-5">
          <h1 className="antialiased font-bold text-4xl my-2">
            {product.nombre_producto}
          </h1>
          <p className="text-lg my-3">Bs {product.precio_producto}</p>
          <QuantitySelector quantity={2}></QuantitySelector>
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out my-5">
            Agregar al carrito
          </button>
          <h3 className="font-bold text-xl">Descripcion</h3>
          <p className="font-light">{product.descripcion_producto}</p>
          <h3 className="font-bold text-xl">Stock</h3>
          <p className="font-light text-xl">{product.stock_producto}</p>
          <h3 className="font-bold text-xl">Categoria</h3>
          <p className="font-light text-xl">{product.categoria_producto}</p>

          <div className="flex items-center my-2">
          <span className="mx-1 my-1 font-light"><h3 className="font-bold text-xl">Peso</h3>
          <p className="font-light text-xl">{product.peso_producto}</p>
          <h3 className="font-bold text-xl">Largo</h3>
          <p className="font-light text-xl">{product.largo_producto}</p></span>
          <span className="mx-1 my-1 font-light"><h3 className="font-bold text-xl">Ancho</h3>
          <p className="font-light text-xl">{product.ancho_producto}</p>
          <h3 className="font-bold text-xl">Alto</h3>
          <p className="font-light text-xl">{product.alto_producto}</p></span>
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
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const response = await fetch(`http://localhost:5000/api/v1/producto/${id}`);
  const product = await response.json();

  return {
    props: { product },
  };
};

export default ProductDetail;
