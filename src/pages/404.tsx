// pages/404.js
import { Parallax } from "react-parallax";

const Custom404 = () => {
  return (
    <Parallax
      bgImage="https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?cs=srgb&dl=pexels-padrinan-255379.jpg&fm=jpg" // Reemplaza con tu URL de imagen
      strength={300}
      className="flex flex-col items-center justify-center h-screen"
    >
      <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-lg text-white">Página no encontrada</p>
        <p className="mt-2 text-gray-300">
          Lo sentimos, no pudimos encontrar la página que buscabas.
        </p>
        <a
          href="/"
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Regresar a la página principal
        </a>
      </div>
    </Parallax>
  );
};

export default Custom404;
