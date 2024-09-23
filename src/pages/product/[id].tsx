// pages/product/[id].js
import React from "react";
import { useRouter } from "next/router";

const ProductDetail = ({ product }) => {
  const router = useRouter();

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="h-64 w-full object-cover mb-4"
      />
      <p className="text-gray-700">${product.price}</p>
      <p className="mt-4">{product.description}</p>
      <button
        onClick={() => router.back()}
        className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
      >
        Volver
      </button>
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
