"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Nuestra Misión",
    description:
      "En nuestra plataforma, buscamos conectar a las comunidades artesanales de Bolivia con mercados nacionales einternacionales. Nuestra misión es facilitar la comercializaciónde productos auténticos y sostenibles, promoviendo la riquezacultural de nuestras tradiciones artesanales.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/images/mision.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Nuestros Valores",
    description:
      "Autenticidad: Valoramos las técnicas tradicionales y la historia detrás de cada producto. Sostenibilidad: Fomentamos prácticas que aseguran la continuidad de las comunidades artesanales. Inclusión: Trabajamos para que todos los artesanos tengan la oportunidad de mostrar su trabajo. Conexión: Creemos en el poder de las plataformas digitales para unir a los productores con los consumidores.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/images/values.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Antecedentes",
    description:
      "Bolivia es rica en tradiciones artesanales, donde las comunidades indígenas y rurales han preservado técnicas de producción únicas. Sin embargo, enfrentan serias dificultades para comercializar sus productos debido a la falta de infraestructura tecnológica y acceso limitado a mercados. Nuestra plataforma nace para resolver esta problemática, permitiendo a los artesanos vender sus productos directamente y recibir una parte justa de los ingresos.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/images/antecedent.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Objetivos del Proyecto",
    description:
      "  Nuestro objetivo es crear un espacio donde los artesanos puedan no solo vender sus productos, sino también resaltar el valor cultural de sus creaciones. A través de nuestra plataforma de comercio electrónico, buscamos promover la <strong>autenticidad</strong>: valoramos las técnicas tradicionales y la historia detrás de cada producto. Fomentar la <strong>sostenibilidad</strong>: apoyamos prácticas que aseguran la continuidad de las comunidades artesanales. Impulsar la <strong>inclusión</strong>: trabajamos para que todos los artesanos tengan la oportunidad de mostrar su trabajo. Finalmente, buscamos crear <strong>conexión</strong>: creemos en el poder de las plataformas digitales para unir a los productores con los consumidores.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/images/aim.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Nuestro Equipo",
    description:
      "Contamos con un equipo multidisciplinario apasionado por el arte, la cultura y la tecnología. Nuestro compromiso es empoderar a los artesanos y ofrecerles las herramientas necesarias para que puedan prosperar en el mercado actual.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/images/team.jpeg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Contáctanos",
    description:
      "Queremos escuchar tus inquietudes y ofrecerte el apoyo necesario para que puedas conocer más sobre nuestros productos y el impacto de nuestro trabajo. Ya sea que seas un artesano, consumidor o simplemente tengas preguntas, estamos aquí para ayudarte.",
    content: (
      <div className="h-full w-full flex flex-col items-center justify-center text-white p-5">
        <p className="text-lg text-black">
          Estamos aquí para responder tus preguntas y colaborar en el
          crecimiento de las comunidades artesanales. No dudes en{" "}
          <span>contactarnos</span> para más información.
        </p>
        <a
          href="/contact"
          className="mt-4 inline-block bg-[#1E90FF] text-white py-2 px-6 rounded-lg text-center font-semibold transition-colors duration-300 hover:bg-blue-600"
        >
          Contactar
        </a>
      </div>
    ),
  },
];
const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <br />
      <div className="w-dvw text-black container mx-auto bg-black">
        <TextHoverEffect text="Acerca de Nosotros" />
      </div>
      <StickyScroll content={content} />
      <Footer />
    </>
  );
};

export default AboutPage;
