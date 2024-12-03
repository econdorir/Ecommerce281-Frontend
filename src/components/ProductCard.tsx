"use client";
import React from "react";
import Link from "next/link";
import { useAppContext } from "@/context";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import Image from "next/image";

const ProductCard = ({
  title,
  price,
  imageUrl,
  description,
  stock,
  onAddToCart,
  id,
}) => {
  // Llamada al contexto dentro del componente
  const { isLoggedIn, role } = useAppContext();

  return (
    <CardContainer className="w-full max-w-sm">
      <CardBody className="w-full max-w-sm mx-auto bg-gray-800 rounded-lg p-4 mb-6 h-[350px] flex flex-col sm:mx-2 md:mx-2 lg:mx-auto px-4 transition-all transform hover:scale-105">
        <div className="relative block flex-shrink-0 mb-4">
          <CardItem translateZ="50"  translateY={-5} className="w-full">
            <Image
              className="w-full h-36 object-cover rounded-lg"
              height="1000"
              width="1000"
              src={imageUrl && imageUrl !== "" ? imageUrl : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"}
              alt={title}
            />
          </CardItem>
          <div className="absolute inset-0 rounded-lg bg-cyan-500 bg-opacity-30 transition-opacity duration-300 opacity-0 hover:opacity-100"></div>
        </div>
        <div className="flex-grow">
          <h2 className="text-white text-lg font-semibold truncate">{title}</h2>
          <p className="text-white text-md mb-2">{`$${price.toFixed(2)}`}</p>
          <p className="text-gray-400 mb-2 text-sm truncate">{description}</p>
          <p className="text-extrapagecolor font-semibold text-sm">{`Stock: ${stock}`}</p>
        </div>
        {/* Action buttons */}
        <div className="flex justify-between items-center mt-4">
          <CardItem translateX={-5} translateZ={50} translateY={5}>
            {isLoggedIn &&
              role === "cliente" && ( // Condición para mostrar el botón
                <button
                  onClick={onAddToCart}
                  className="bg-buttonpagecolor text-white p-2 rounded transition-colors duration-300 hover:bg-tertiarypagecolor cursor-pointer"
                >
                  Agregar al carrito
                </button>
              )}
          </CardItem>
          <CardItem translateZ={50} translateY={5} translateX={5}>
            <Link href={`/product/${id}`}>
              <button className="bg-buttonpagecolor text-extrapagecolor2 p-2 rounded transition-colors duration-300 hover:bg-tertiarypagecolor text-center cursor-pointer">
                Ver detalles
              </button>
            </Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default ProductCard;
