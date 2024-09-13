import Link from 'next/link';
import styles from "../styles/hero.module.css"

const HeroSection = () => {
  return (
    <section className={`${styles.animatedBackground} bg-gray-100 h-screen flex flex-col items-center justify-center text-center pt-56 sm:pt-0`}>
      <div className="container mx-auto px-4">
        {/* Large Text with Welcome Message */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">
          Bienvenido a Nuestra Tienda de Productos Artesanales
        </h1>

        {/* Smaller Text with Description */}
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Descubre productos únicos y hechos a mano por comunidades locales. Apoya el comercio justo y encuentra piezas exclusivas que cuentan una historia.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {/* Start Now Button */}
          <Link href="/register">
            <div className="inline-block bg-orange-400 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-lg hover:bg-orange-500 transition duration-300 cursor-pointer">
              Comenzar Ahora
            </div>
          </Link>

          {/* View Products Button */}
          <Link href="/products">
            <div className="inline-block bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-lg hover:bg-gray-700 transition duration-300 cursor-pointer">
              Mirar Productos
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
