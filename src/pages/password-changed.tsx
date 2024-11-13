import Link from "next/link";

const PasswordChanged = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Contraseña Cambiada Exitosamente
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        Tu contraseña se ha cambiado correctamente. Ahora puedes iniciar sesión
        con tu nueva contraseña.
      </p>
      <Link href="/">
        <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300">
          Volver al Inicio
        </button>
      </Link>
    </div>
  );
};

export default PasswordChanged;
