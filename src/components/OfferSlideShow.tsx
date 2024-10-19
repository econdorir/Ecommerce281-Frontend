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
      <div className={className}>
        <Swiper
          style={
            {
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            } as React.CSSProperties
          }
          spaceBetween={10}
          navigation={true}
          autoplay={{
            delay: 2500,
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          className="mySwiper2"
        >
          <div className="flex space-x-4">
            {products.map((product) => (
              <SwiperSlide key={product.id_producto}>
                <div className="flex flex-col items-center gap-3">
                  <div className="bg-white shadow-md rounded p-4 text-center mt-4 w-full">
                    <span className="block text-lg font-semibold">
                      {product.nombre_producto}
                    </span>
                    <span className="block line-through text-sm">
                      {product.precio_producto} Bs
                    </span>
                    <span className="block text-xl font-bold mt-1">
                      {product.precio_con_descuento} Bs
                    </span>
                    
                  </div>
                  <Link href={`/product/${product.id_producto}`} className="w-full">
                    <button className="bg-cyan-500 text-white py-2 px-1 rounded transition-colors duration-300 hover:bg-cyan-600 w-full">
                      Ver detalles
                    </button>
                  </Link>
                  <Image
                    width={1024}
                    height={800}
                    src={product.imagen[0].url_imagen}
                    alt={product.nombre_producto}
                    className="rounded-lg object-fill"
                  />
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          <div className="flex space-x-4">
            {products.map((product) => (
              <SwiperSlide>
                <Image
                  key={product.id_producto}
                  width={1024}
                  height={800}
                  src={product.imagen[0].url_imagen}
                  alt={product.nombre_producto}
                  className="rounded-lg object-fill"
                />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </>
  );
};
