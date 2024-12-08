"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

import "../../src/styles/slideshow.css";

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
  precio_con_descuento: number;
}

interface Props {
  products: Product[];
  className?: string;
}

export const OfferSlideShow = ({ products, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
  return (
    <>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {products
            .filter((product) => parseInt(product.stock_producto) > 0) // Filtramos los productos con stock > 0
            .map((product) => (
              <CarouselItem key={product.id_producto}>
                <div className="my-1 bg-buttonpagecolor2 shadow-md rounded text-center t-4 flex flex-col justify-evenly">
                  <span className="block text-lg font-semibold text-bgpagecolor text-md">
                    {product.nombre_producto}
                  </span>
                  <span className="block line-through text-sm text-bgpagecolor text-md">
                    {product.precio_producto} Bs
                  </span>
                  <span className="block text-xl font-bold mt-1 text-bgpagecolor text-md">
                    {product.precio_con_descuento} Bs
                  </span>
                </div>
                <Link href={`/product/${product.id_producto}`} className="w-full my-1">
                  <button className="bg-buttonpagecolor text-white py-2 px-1 rounded transition-colors duration-300 hover:bg-tertiarypagecolor hover:text-buttonpagecolor2 w-full">
                    Ver detalles
                  </button>
                </Link>
                <div className="w-full h-24 my-1 flex justify-center">
                  <Image
                    width={1024}
                    height={1024}
                    src={product.imagen[0].url_imagen}
                    alt={product.nombre_producto}
                    className="rounded-lg object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};  