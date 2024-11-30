import React, { useEffect } from 'react';

function SocialLinks() {
  // Usamos useEffect para cargar el CDN de Font Awesome solo cuando el componente se monte
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link); // Agregar el enlace al head del documento
    return () => {
      document.head.removeChild(link); // Limpiar cuando el componente se desmonte
    };
  }, []);

  return (
    <div className="mb-12 px-56">
      <h2 className="text-4xl font-semibold mb-4 text-[#2F4F4F]">Síguenos en Redes Sociales</h2>
      <div className="flex space-x-6">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600">
          <i className="fab fa-facebook-square text-3xl"></i>
          <span>Facebook</span>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-pink-500">
          <i className="fab fa-instagram text-3xl"></i>
          <span>Instagram</span>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-400">
          <i className="fab fa-twitter-square text-3xl"></i>
          <span>Twitter</span>
        </a>
      </div>
    </div>
  );
}

export default SocialLinks;
