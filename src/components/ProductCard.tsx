// components/ProductCard.js
"use client";
import React from "react";
import Link from "next/link";
import { Tilt } from "react-tilt";

const ProductCard = ({
  title,
  price,
  imageUrl,
  description,
  onAddToCart,
  onViewDetail,
}) => {
  return (
    <div className="tilt-card max-w-72 mx-auto bg-gray-800 rounded-lg p-6 mb-4 h-[400px] flex flex-col">
      <Link href="/" className="relative block flex-shrink-0 mb-4">
        <img
          className="w-full h-32 object-cover rounded-lg"
          src={imageUrl}
          alt={title}
        />
        <div className="absolute inset-0 rounded-lg bg-cyan-500 bg-opacity-30 transition-opacity duration-300 opacity-0 hover:opacity-100"></div>
      </Link>
      <div className="flex-grow">
        <h1 className="text-white text-xl font-semibold truncate">{title}</h1>
        <p className="text-soft-blue mb-2">{`$${price.toFixed(2)}`}</p>
        <p className="text-gray-400 mb-4 truncate">{description}</p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={onAddToCart}
          className="bg-cyan-500 text-white py-2 px-4 rounded"
        >
          Agregar al carrito
        </button>
        <button onClick={onViewDetail} className="text-soft-blue">
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
