// pages/product/[id].js
import React from "react";
import { useRouter } from "next/router";
import { QuantitySelector } from "@/components/QuantitySelector";
import { ProductSlideShow } from "@/components/ProductSlideShow";
import { FaTimes } from "react-icons/fa";
import { ProductMobileSlideShow } from "@/components/ProductMobileSlideShow";

const ProductDetail = ({ product }) => {
  const router = useRouter();

  const handleClose = () => {
    router.push("/products");
  };
  if (!product) return <div>Cargando...</div>;

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3 mx-5">
      <div className="col-span-1 md:col-span-2">
        <button
          onClick={handleClose}
          className="flex items-center justify-center bg-gray-400 text-white p-2 rounded-full shadow hover:bg-blue-950 transition duration-200"
        >
          <FaTimes />
        </button>

        {/* Mobile slideshow */}
        <ProductMobileSlideShow title={product.title} images={product.image} className="block md:hidden"/>

        {/* Desktop slideshow */}
        <ProductSlideShow title={product.title} images={product.image} className="hidden md:block" />
      </div>

      <div className="col-span-1 px-5 mx-5">
        <h1 className="antialiased font-bold text-3xl my-2 ">{product.title}</h1>
        <p className="text-lg my-3">Bs {product.price}</p>
        <QuantitySelector quantity={2}></QuantitySelector>
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out my-5">
          Agregar al carrito
        </button>

        <h3 className="font-bold text-sm">Categoria</h3>
        <p className="font-light">{product.category}</p>

        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>

        <h3 className="font-bold text-sm">Rating</h3>
        <p className="font-light">{product.rating.rate}</p>
        <p className="font-light">{product.rating.count}</p>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await response.json();

  return {
    props: { product },
  };
};

export default ProductDetail;
