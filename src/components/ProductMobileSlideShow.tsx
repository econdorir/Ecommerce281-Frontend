"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "../../src/styles/slideshow.css";
import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";

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

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          
        }}
        pagination
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image)=>
        <SwiperSlide>
          <Image
            width={1024}
            height={800}
            src={images}
            alt={title}
            className="w-full  object-fill"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={1024}
            height={800}
            src={images}
            alt={title}
            className="w-full  object-fill"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={1024}
            height={800}
            src={images}
            alt={title}
            className="  object-fill"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
