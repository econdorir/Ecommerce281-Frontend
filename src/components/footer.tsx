import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0 mb-4 md:mb-0">
          <Link href="/">
            <span className="text-2xl font-bold hover:text-gray-400 cursor-pointer">
              Artiisninc
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <Link href="/about">
            <span className="hover:text-gray-400 cursor-pointer">
              Acerca de
            </span>
          </Link>
          <Link href="/services">
            <span className="hover:text-gray-400 cursor-pointer">
              Servicios
            </span>
          </Link>
          <Link href="/contact">
            <span className="hover:text-gray-400 cursor-pointer">Contacto</span>
          </Link>
        </nav>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <i className="fab fa-facebook-f"></i>{" "}
            {/* Assuming FontAwesome is included */}
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <i className="fab fa-twitter"></i>{" "}
            {/* Assuming FontAwesome is included */}
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <i className="fab fa-instagram"></i>{" "}
            {/* Assuming FontAwesome is included */}
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-gray-400 mt-4">
        <p>
          &copy; {new Date().getFullYear()} Artiisninc. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
