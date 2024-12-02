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
          
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-buttonpagecolor2">Información de Contacto</h2>
            <p className="text-lg">Correo Electrónico: <a href="mailto:info@tuorganizacion.com" className="underline text-extrapagecolor">info@tuorganizacion.com</a></p>
            <p className="text-lg">Teléfono: <a href="tel:+59112345678" className="underline text-extrapagecolor">+591 123 456 78</a></p>
            <p className="text-lg">Dirección: Avenida 6 de Octubre, La Paz, Bolivia</p>
          

          <SocialLinks />

          {/* Mapa de Google */}
         <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-buttonpagecolor2 px-56 text-center mx-auto">Nuestra Ubicación</h2>

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
