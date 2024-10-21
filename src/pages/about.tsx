"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white text-black">
        <div className="container mx-auto p-6 pt-20">
          <h1 className="text-5xl font-bold mb-6 text-center text-[#2EC4B6]">Acerca de Nosotros</h1>

          <section className="mb-12 bg-[#FFBF69] p-4 rounded-lg shadow-md">
            <h2 className="text-4xl font-semibold mb-2 text-[#2EC4B6]">Nuestra Misión</h2>
            <p className="text-lg">
              En nuestra plataforma, buscamos conectar a las comunidades artesanales de Bolivia con mercados nacionales e internacionales. Nuestra misión es facilitar la comercialización de productos auténticos y sostenibles, promoviendo la riqueza cultural de nuestras tradiciones artesanales.
            </p>
          </section>

          <section className="mb-12 bg-[#CBF3F0] p-4 rounded-lg shadow-md">
            <h2 className="text-4xl font-semibold mb-2 text-[#2EC4B6]">Nuestros Valores</h2>
            <ul className="list-disc list-inside text-lg">
              <li>Autenticidad: Valoramos las técnicas tradicionales y la historia detrás de cada producto.</li>
              <li>Sostenibilidad: Fomentamos prácticas que aseguran la continuidad de las comunidades artesanales.</li>
              <li>Inclusión: Trabajamos para que todos los artesanos tengan la oportunidad de mostrar su trabajo.</li>
              <li>Conexión: Creemos en el poder de las plataformas digitales para unir a los productores con los consumidores.</li>
            </ul>
          </section>

          <section className="mb-12 bg-[#FFBF69] p-4 rounded-lg shadow-md">
            <h2 className="text-4xl font-semibold mb-2 text-[#2EC4B6]">Antecedentes</h2>
            <p className="text-lg">
              Bolivia es rica en tradiciones artesanales, donde las comunidades indígenas y rurales han preservado técnicas de producción únicas. Sin embargo, enfrentan serias dificultades para comercializar sus productos debido a la falta de infraestructura tecnológica y acceso limitado a mercados. Nuestra plataforma nace para resolver esta problemática, permitiendo a los artesanos vender sus productos directamente y recibir una parte justa de los ingresos.
            </p>
          </section>

          <section className="mb-12 bg-[#CBF3F0] p-4 rounded-lg shadow-md">
            <h2 className="text-4xl font-semibold mb-2 text-[#2EC4B6]">Objetivos del Proyecto</h2>
            <p className="text-lg">
              Nuestro objetivo es crear un espacio donde los artesanos puedan no solo vender sus productos, sino también resaltar el valor cultural de sus creaciones. A través de nuestra plataforma de comercio electrónico, buscamos:
            </p>
            <ul className="list-disc list-inside text-lg">
              <li>Facilitar la venta de productos artesanales a nivel nacional e internacional.</li>
              <li>Contribuir al desarrollo económico de las comunidades artesanales.</li>
              <li>Promover la preservación de tradiciones culturales y conocimientos ancestrales.</li>
              <li>Crear un vínculo directo entre artesanos y consumidores.</li>
            </ul>
          </section>

          <section className="mb-12 bg-[#FFBF69] p-4 rounded-lg shadow-md">
            <h2 className="text-4xl font-semibold mb-2 text-[#2EC4B6]">Nuestro Equipo</h2>
            <p className="text-lg">
              Contamos con un equipo multidisciplinario apasionado por el arte, la cultura y la tecnología. Nuestro compromiso es empoderar a los artesanos y ofrecerles las herramientas necesarias para que puedan prosperar en el mercado actual.
            </p>
          </section>

          <section className="bg-[#2EC4B6] p-4 rounded-lg shadow-md">
            <h2 className="text-4xl font-semibold mb-2 text-white">Contáctanos</h2>
            <p className="text-lg text-white">
              Estamos aquí para responder tus preguntas y colaborar en el crecimiento de las comunidades artesanales. No dudes en <a href="/contact" className="underline text-white font-semibold">contactarnos</a> para más información.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
