import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { ChangePasswordService } from "@/services/ChangePasswordService"; // Asegúrate de crear este servicio
import { useAppContext } from "@/context";
import { useRouter } from "next/router"; // Importa useRouter

export default function ChangePasswordForm() {
  const {
    username,
    setUsername,
    email,
    setEmail,
    role,
    setRole,
    isLoggedIn,
    setIsLoggedIn,
  } = useAppContext();
  const router = useRouter(); // Inicializa el router
  const { query } = router; // Obtén la query de la ruta
  const { token } = query; // Extrae el token de la query

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Estado para el mensaje de error

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError(""); // Resetea el error antes de iniciar

    try {
      const result = await ChangePasswordService(
        token,
        email,
        newPassword,
        role
      );
      console.log(result);
      // Maneja la respuesta como prefieras (redirección, mensaje, etc.)
      router.push('/password-changed')
    } catch (error) {
      setError("Error al cambiar la contraseña. Inténtalo de nuevo.");
      console.error("Error during password change:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      setError(
        "Token no encontrado. Asegúrate de que estás usando un enlace válido."
      );
    }
  }, [token]);
  return (
    <div className="flex flex-col md:flex-row w-full max-w-screen-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      {/* Left Side */}
      <div className="md:w-1/2 bg-teal-300 relative flex items-center justify-center p-4">
        {/* Puedes personalizar el SVG aquí o usar uno diferente */}
        <div className="sm:w-64 sm:h-64 sm:bg-orange-400 sm:rounded-full sm:absolute sm:top-1/2 sm:transform sm:-translate-y-1/2 sm:rotate-[-30deg] sm:flex sm:items-center sm:justify-center">
          <Image
            className="sm:rounded-full"
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
          Cambiar Contraseña
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleChangePasswordSubmit}
        >
          <label htmlFor="email" className="text-sm text-gray-700">
            Correo
          </label>
          <input
            type="email"
            id="email"
            placeholder="Ingresa tu correo"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg text-sm"
          />

          <label htmlFor="newPassword" className="text-sm text-gray-700">
            Nueva Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Ingresa tu nueva contraseña"
              required
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          <label htmlFor="confirmNewPassword" className="text-sm text-gray-700">
            Confirmar Nueva Contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmNewPassword"
            placeholder="Confirma tu nueva contraseña"
            required
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg text-sm"
          />

          <label htmlFor="role" className="text-sm text-gray-700">
            Rol
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg text-sm"
          >
            <option value="" disabled>
              Selecciona tu rol
            </option>
            <option value="cliente">Cliente</option>
            <option value="artesano">Artesano</option>
            <option value="delivery">Delivery</option>
          </select>

          <button
            type="submit"
            className="py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-lg text-lg cursor-pointer"
          >
            Cambiar Contraseña
          </button>
        </form>

        <p className="text-sm text-gray-700 mt-4">
          ¿Recordaste tu contraseña?{" "}
          <Link href="/login" className="text-orange-400 hover:underline">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
