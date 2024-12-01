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
          {products.map((product) => (
            <CarouselItem>
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
      {/* <div className={className}>
        
        <Swiper
          style={
            {
              "--swiper-navigation-color": "#5eead4",
              "--swiper-pagination-color": "#5eead4",
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
          className="mySwiper2 flex items-center justify-center"
        >
          <div className="flex items-center justify-center space-x-4 px-20">
            {products.map((product) => (
              <SwiperSlide key={product.id_producto} className="mx-5">
                <div className="flex flex-col items-center gap-3 w-4/5">
                  <div className="bg-buttonpagecolor2 shadow-md rounded p-4 text-center t-4 w-full">
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
                  <Link
                    href={`/product/${product.id_producto}`}
                    className="w-full"
                  >
                    <button className="bg-buttonpagecolor text-white py-2 px-1 rounded transition-colors duration-300 hover:bg-cyan-600 w-full">
                      Ver detalles
                    </button>
                  </Link>
                  <div className="w-24 h-24">
                    <Image
                      width={1024}
                      height={1024}
                      src={product.imagen[0].url_imagen}
                      alt={product.nombre_producto}
                      className="rounded-lg object-contain"
                    />
                  </div>
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
          className="mySwiper w-screen flex justify-center items-center"
        >
          <div className="w-full flex justify-center items-center px-20">
            {products.map((product) => (
              <SwiperSlide className="hover:cursor-pointer">
                <div className="w-16 h-16">
                  <Image
                    key={product.id_producto}
                    width={1024}
                    height={1024}
                    src={product.imagen[0].url_imagen}
                    alt={product.nombre_producto}
                    className="rounded-lg object-fill"
                  />
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div> */}
    </>
  );
};
