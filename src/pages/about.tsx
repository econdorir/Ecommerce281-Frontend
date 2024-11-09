"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar /><br />
      <div className="text-black">
        <div className="container mx-auto p-6 pt-20">
          <h1 className="text-5xl font-bold mb-6 text-center text-[#2EC4B6]">Acerca de Nosotros</h1>

          <section className="mb-12 p-4 rounded-lg flex items-center">
            <img src="/images/mision.jpeg" alt="Nuestra Misión" className="w-3/4 h-80 object-cover rounded-lg mr-6" />
            <div>
              <h2 className="text-4xl font-semibold mb-2 text-[#2F4F4F]">Nuestra Misión</h2>
              <p className="text-lg">
                En nuestra plataforma, buscamos conectar a las comunidades artesanales de Bolivia con mercados nacionales e internacionales. Nuestra misión es facilitar la comercialización de productos auténticos y sostenibles, promoviendo la riqueza cultural de nuestras tradiciones artesanales.
              </p>
            </div>
          </section>

          <section className="mb-12 p-4 rounded-lg flex items-center flex-row-reverse">
            <img src="/images/values.jpeg" alt="Nuestros Valores" className="w-3/4 h-80 object-cover rounded-lg ml-6" />
            <div>
              <h2 className="text-4xl font-semibold mb-2 text-[#2F4F4F]">Nuestros Valores</h2>
              <ul className="list-disc list-inside text-lg">
                <li><strong>Autenticidad</strong>: Valoramos las técnicas tradicionales y la historia detrás de cada producto.</li>
                <li><strong>Sostenibilidad</strong>: Fomentamos prácticas que aseguran la continuidad de las comunidades artesanales.</li>
                <li><strong>Inclusión</strong>: Trabajamos para que todos los artesanos tengan la oportunidad de mostrar su trabajo.</li>
                <li><strong>Conexión</strong>: Creemos en el poder de las plataformas digitales para unir a los productores con los consumidores.</li>
              </ul>
            </div>
          </section>

          <section className="mb-12 p-4 rounded-lg flex items-center">
            <img src="/images/antecedent.jpeg" alt="Antecedentes" className="w-3/4 h-80 object-cover rounded-lg mr-6" />
            <div>
              <h2 className="text-4xl font-semibold mb-2 text-[#2F4F4F]">Antecedentes</h2>
              <p className="text-lg">
                Bolivia es rica en tradiciones artesanales, donde las comunidades indígenas y rurales han preservado técnicas de producción únicas. Sin embargo, enfrentan serias dificultades para comercializar sus productos debido a la falta de infraestructura tecnológica y acceso limitado a mercados. Nuestra plataforma nace para resolver esta problemática, permitiendo a los artesanos vender sus productos directamente y recibir una parte justa de los ingresos.
              </p>
            </div>
          </section>

          <section className="mb-12 p-4 rounded-lg flex items-center flex-row-reverse">
            <img src="/images/aim.jpeg" alt="Objetivos del Proyecto" className="w-3/4 h-80 object-cover rounded-lg ml-6" />
            <div>
              <h2 className="text-4xl font-semibold mb-2 text-[#2F4F4F]">Objetivos del Proyecto</h2>
              <p className="text-lg">
                Nuestro objetivo es crear un espacio donde los artesanos puedan no solo vender sus productos, sino también resaltar el valor cultural de sus creaciones. A través de nuestra plataforma de comercio electrónico, buscamos:
              </p>
              <ul className="list-disc text-lg pl-5">
                <li><strong>Autenticidad</strong>: Valoramos las técnicas tradicionales y la historia detrás de cada producto.</li>
                <li><strong>Sostenibilidad</strong>: Fomentamos prácticas que aseguran la continuidad de las comunidades artesanales.</li>
                <li><strong>Inclusión</strong>: Trabajamos para que todos los artesanos tengan la oportunidad de mostrar su trabajo.</li>
                <li><strong>Conexión</strong>: Creemos en el poder de las plataformas digitales para unir a los productores con los consumidores.</li>
              </ul>
            </div>
          </section>

          <section className="mb-12 p-4 rounded-lg flex items-center">
            <img src="/images/team.jpeg" alt="Nuestro Equipo" className="w-3/4 h-80 object-cover rounded-lg mr-6" />
            <div>
            <h2 className="text-4xl font-semibold mb-2 text-[#2F4F4F]">Nuestro Equipo</h2>
              <p className="text-lg">
                Contamos con un equipo multidisciplinario apasionado por el arte, la cultura y la tecnología. Nuestro compromiso es empoderar a los artesanos y ofrecerles las herramientas necesarias para que puedan prosperar en el mercado actual.
              </p>
            </div>
          </section>

          <section className="p-4 rounded-lg flex items-center flex-row-reverse">
            <div>
            <h2 className="text-4xl font-semibold mb-2 text-[#2F4F4F]">Contáctanos</h2>
              <p className="text-lg text-black">
                Estamos aquí para responder tus preguntas y colaborar en el crecimiento de las comunidades artesanales. No dudes en <a href="/contact" className="underline text-[#1E90FF] font-semibold">contactarnos</a> para más información.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;