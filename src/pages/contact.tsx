"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white text-black">
        <div className="container mx-auto p-6 pt-20">
          <h1 className="text-5xl font-bold mb-6 text-center text-[#2EC4B6]">Contáctanos</h1>
          <p className="text-lg text-center mb-8">
            Estamos aquí para ayudarte. Si tienes preguntas o comentarios, no dudes en ponerte en contacto con nosotros.
          </p>

          <form className="bg-[#FFBF69] p-6 rounded-lg shadow-md mb-12">
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2" htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2" htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Tu correo electrónico"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2" htmlFor="subject">Asunto:</label>
              <input
                type="text"
                id="subject"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Asunto"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2" htmlFor="message">Mensaje:</label>
              <textarea
                id="message"
                className="w-full p-2 border border-gray-300 rounded"
                rows={5}
                placeholder="Escribe tu mensaje aquí..."
                required
              ></textarea>
            </div>

            <button type="submit" className="bg-[#2EC4B6] text-white py-2 px-4 rounded">Enviar</button>
          </form>

          <div className="mb-12">
            <h2 className="text-4xl font-semibold mb-4 text-[#2EC4B6]">Información de Contacto</h2>
            <p className="text-lg">Correo Electrónico: <a href="mailto:info@tuorganizacion.com" className="underline text-[#2EC4B6]">info@tuorganizacion.com</a></p>
            <p className="text-lg">Teléfono: <a href="tel:+59112345678" className="underline text-[#2EC4B6]">+591 123 456 78</a></p>
            <p className="text-lg">Dirección: Avenida 6 de Octubre, La Paz, Bolivia</p>
          </div>

          <div className="mb-12">
            <h2 className="text-4xl font-semibold mb-4 text-[#2EC4B6]">Síguenos en Redes Sociales</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>

          {/* Mapa de Google */}
          <h2 className="text-4xl font-semibold mb-4 text-[#2EC4B6]">Nuestra Ubicación</h2>
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
