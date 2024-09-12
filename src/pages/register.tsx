import Image from "next/image";
import Link from "next/link";


export default function SignupForm() {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-screen-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      {/* Left Side */}
      <div className="md:w-1/2 bg-teal-300 relative flex items-center justify-center p-4">
        <div className="sm:w-64 sm:h-64 sm:bg-orange-400 sm:rounded-full sm:absolute sm:top-1/2 sm:transform sm:-translate-y-1/2 sm:rotate-[-30deg] sm:flex sm:items-center sm:justify-center">
          <Image
            src="/images/telas.jpg"
            alt="Imagen de telas"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="w-40 h-40 bg-opacity-10 rounded-full absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center">
          <Image
            src="/images/Logo281.png"
            alt="Logo"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
        <div className="mb-6">
          <Link href="/">
            <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 hover:bg-blue-600 rounded-lg shadow-md">
              &larr;
            </button>
          </Link>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Crear una Nueva Cuenta
        </h1>
        <form className="flex flex-col space-y-4">
          <label htmlFor="nombre" className="text-sm text-gray-700">
            Nombre Completo
          </label>
          <input
            type="text"
            id="nombre"
            placeholder="Enter your Full Name here"
            required
            className="p-3 border border-gray-300 rounded-lg text-sm"
          />

          <label htmlFor="email" className="text-sm text-gray-700">
            Correo
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your Email here"
            required
            className="p-3 border border-gray-300 rounded-lg text-sm"
          />

          <label htmlFor="password" className="text-sm text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your Password here"
            required
            className="p-3 border border-gray-300 rounded-lg text-sm"
          />

          <label htmlFor="confirm-password" className="text-sm text-gray-700">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm your Password here"
            required
            className="p-3 border border-gray-300 rounded-lg text-sm"
          />

          <button
            type="submit"
            className="py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-lg text-lg cursor-pointer"
          >
            Crear Cuenta
          </button>
        </form>

        <p className="text-sm text-gray-700 mt-4">
          Ya tienes una cuenta{" "}
          <a href="#" className="text-orange-400 hover:underline">
            Iniciar Sesión
          </a>
        </p>

        <div className="my-6 text-gray-400 text-center">- OR -</div>

        <button className="flex items-center justify-center py-3 bg-white border border-gray-300 rounded-lg cursor-pointer">
          <Image
            src="/images/google_logo.jpg"
            alt="Google Icon"
            width={20}
            height={20}
          />
          <span className="ml-2 text-gray-800">Sign up with Google</span>
        </button>
      </div>
    </div>
  );
}
