"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialLinks from '../components/SocialLinks';

const ContactPage: React.FC = () => {
  return (
    <>
      <Navbar /><br />
      <div className="bg-bgpagecolor text-black">
        <div className="container mx-auto p-6 pt-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center text-extrapagecolor">
            Contáctanos
          </h1>
          <p className="text-lg text-center mb-8">
            Estamos aquí para ayudarte. Si tienes preguntas o comentarios, no dudes en ponerte en contacto con nosotros.
          </p>

          <form className="bg-extrapagecolor2 p-6 sm:p-8 md:p-14 rounded-lg shadow-md w-full max-w-3xl mx-auto">
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
              CUAL ES <span className="text-tertiarypagecolor">TU CONSULTA?</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              <input type="text" placeholder="Nombre" className="p-5 border border-gray-300 rounded w-full" required/>
              <input type="email" placeholder="Correo Electrónico" className="p-5 border border-gray-300 rounded w-full" required/>
              <input type="tel" placeholder="Teléfono" className="p-5 border border-gray-300 rounded w-full"/>
            </div>

            <div className="mb-10">
              <input type="text" placeholder="Asunto" className="w-full p-5 border border-gray-300 rounded" required/>
            </div>

            <div className="mb-10">
              <textarea placeholder="Tu Consulta" className="w-full p-5 border border-gray-300 rounded" rows={6} required></textarea>
            </div>

            <div className="flex justify-center">
              <button type="submit" className="bg-buttonpagecolor text-white text-xl px-6 py-2 rounded hover:bg-buttonpagecolor2 transition-colors duration-300">
                Enviar
              </button>
            </div>
          </form><br />
          <div className="mb-12 px-56">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-buttonpagecolor2">Información de Contacto</h2>
            <p className="text-lg">Correo Electrónico: <a href="mailto:info@tuorganizacion.com" className="underline text-extrapagecolor">info@tuorganizacion.com</a></p>
            <p className="text-lg">Teléfono: <a href="tel:+59112345678" className="underline text-extrapagecolor">+591 123 456 78</a></p>
            <p className="text-lg">Dirección: Avenida 6 de Octubre, La Paz, Bolivia</p>
          </div>

          <SocialLinks />

          {/* Mapa de Google */}
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-buttonpagecolor2 px-56">Nuestra Ubicación</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d64369.05248255918!2d-68.1192935!3d-16.5002934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e36820f2985861%3A0x6ae78e4e8efc94d1!2sUMSA%20Universidad%20Mayor%20de%20San%20Andr%C3%A9s!5e0!3m2!1ses-419!2sbo!4v1697798232878!5m2!1ses-419!2sbo"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
