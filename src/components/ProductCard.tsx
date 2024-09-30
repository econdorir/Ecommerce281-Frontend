"use client";
import React from "react";
import Link from "next/link";

const ProductCard = ({
  title,
  price,
  imageUrl,
  description,
  stock,
  onAddToCart,
  id,
}) => {
  return (
    <div className="tilt-card max-w-72 mx-auto bg-gray-800 rounded-lg p-6 mb-4 h-[400px] flex flex-col sm:mx-1 md:mx-1 lg:mx-auto">
      <div className="relative block flex-shrink-0 mb-4">
        <img
          className="w-full h-32 object-cover rounded-lg"
          src={imageUrl}
          alt={title}
        />
        <div className="absolute inset-0 rounded-lg bg-cyan-500 bg-opacity-30 transition-opacity duration-300 opacity-0 hover:opacity-100"></div>
      </div>
      <div className="flex-grow">
        <h1 className="text-white text-xl font-semibold truncate">{title}</h1>
        <p className="text-white text-lg mb-2">{`$${price.toFixed(2)}`}</p>
        <p className="text-gray-400 mb-2 truncate">{description}</p>
        <p className="text-green-400 font-semibold">{`Stock: ${stock}`}</p>
      </div>
      <div className="flex justify-evenly">
        <button
          onClick={onAddToCart}
          className="bg-cyan-500 text-white py-2 px-1 rounded transition-colors duration-300 hover:bg-cyan-600"
        >
          Agregar al carrito
        </button>
        <Link href={`/product/${id}`}>
          <button className="bg-cyan-500 text-white py-2 px-1 rounded transition-colors duration-300 hover:bg-cyan-600">
            Ver detalles
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
