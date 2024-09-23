import React from "react";
import Link from "next/link";

const VerificationSent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        ¡Correo de Verificación Enviado!
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        Hemos enviado un correo de verificación a la cuenta que ingresaste. Por
        favor, revisa tu bandeja de entrada y sigue las instrucciones para
        verificar tu cuenta.
      </p>
      <Link href="/" passHref>
        <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300">
          Regresar a Inicio
        </button>
      </Link>
    </div>
  );
};

export default VerificationSent;
