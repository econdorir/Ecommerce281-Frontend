"use client";

import React, { useState } from "react";
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

interface Props {
  images: Image[];
  title: string;
  className?: string;
}

export const ProductSlideShow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
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
          delay: 2500
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.map((image)=>
        <SwiperSlide>
        <Image
          width={1024}
          height={800}
          src={image.url_imagen}
          alt={title}
          className="rounded-lg  object-fill"
        />
      </SwiperSlide>
        )}
        
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
        {images.map((image)=>
        <SwiperSlide>
        <Image
          width={300}
          height={300}
          src={image.url_imagen}
          alt={title}
          className="rounded-lg  object-fill"
        />
      </SwiperSlide>
        )}
        
        
      </Swiper>
    </div>
  );
};
