import Image from "next/image";
import Link from "next/link";
import { RegisterService } from "@/services/RegisterService";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAppContext } from "@/context";

export default function SignupForm() {
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

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const [showPassword, setShowPassword] = useState(false);
  const [cellphone,setCellphone] = useState("");
  const router = useRouter();
  const currentDate = new Date();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError("");

    try {
      const result = await RegisterService(
        username,
        email,
        password,
        role,
        currentDate,
        cellphone
      );
      setIsLoggedIn(true);
      setUsername(result.nombre_usuario);
      setEmail(result.email_usuario);
      setPassword(result.password_usuario);
      setCellphone(result.cellphone);
      console.log(result)
      router.push("/verification-sent");

    } catch (error) {
      console.error("Error during registration:", error);
    
      // Verifica si el error tiene una propiedad 'response' (por ejemplo, un error de la API)
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Asigna el mensaje de error desde la respuesta de la API
      } else {
        // Si no hay mensaje en el error, se asigna un mensaje genérico
        setError("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
      }
    }
  };
  return (
    <div className="flex flex-col md:flex-row w-full max-w-screen-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      {/* Left Side */}
      <div className="md:w-1/2 bg-teal-300 relative flex items-center justify-center p-4">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#CBF3F0" transform="translate(80 70)">
            <animate
              attributeName="d"
              dur="15000ms"
              repeatCount="indefinite"
              values="M39,-58.5C49.7,-53.8,57,-41.6,61.1,-29C65.1,-16.4,65.8,-3.4,64,9.2C62.3,21.9,58,34.3,51.1,46.8C44.1,59.3,34.5,72,22.6,74.1C10.8,76.2,-3.3,67.8,-16.4,61.5C-29.5,55.1,-41.6,50.8,-51.1,42.7C-60.6,34.6,-67.6,22.7,-68.7,10.3C-69.8,-2,-65,-14.8,-58.5,-25.7C-52,-36.7,-43.6,-45.8,-33.6,-50.9C-23.5,-56,-11.8,-57.1,1.2,-58.9C14.1,-60.7,28.2,-63.3,39,-58.5Z;
                  M36.5,-51.4C50.3,-48,66.4,-42.8,76.7,-31.7C87,-20.5,91.6,-3.3,88.9,12.5C86.1,28.2,76,42.7,62.6,49.5C49.3,56.4,32.7,55.6,18.1,58.4C3.5,61.2,-9.1,67.5,-21.4,66.7C-33.7,65.9,-45.8,58,-52.1,47.2C-58.4,36.3,-58.8,22.4,-57.8,10.1C-56.7,-2.2,-54.2,-12.9,-51.1,-24.8C-48,-36.8,-44.3,-50,-35.7,-55.8C-27.1,-61.5,-13.5,-59.8,-1.1,-58.2C11.4,-56.5,22.8,-54.8,36.5,-51.4Z;
                  M39,-58.5C49.7,-53.8,57,-41.6,61.1,-29C65.1,-16.4,65.8,-3.4,64,9.2C62.3,21.9,58,34.3,51.1,46.8C44.1,59.3,34.5,72,22.6,74.1C10.8,76.2,-3.3,67.8,-16.4,61.5C-29.5,55.1,-41.6,50.8,-51.1,42.7C-60.6,34.6,-67.6,22.7,-68.7,10.3C-69.8,-2,-65,-14.8,-58.5,-25.7C-52,-36.7,-43.6,-45.8,-33.6,-50.9C-23.5,-56,-11.8,-57.1,1.2,-58.9C14.1,-60.7,28.2,-63.3,39,-58.5Z;"
            ></animate>
          </path>

          <path fill="#FFBF69" transform="translate(120 90)">
            <animate
              attributeName="d"
              dur="20000ms"
              repeatCount="indefinite"
              values="M35.8,-51.7C48.3,-47.7,61.6,-41,66.4,-30.4C71.1,-19.8,67.3,-5.3,61.9,6.5C56.5,18.4,49.5,27.6,43.3,40.8C37,54,31.5,71.2,19.9,80.4C8.3,89.6,-9.3,90.7,-23.6,84.6C-37.9,78.5,-48.9,65.2,-53.4,51.2C-58,37.2,-56.1,22.5,-59.4,7.8C-62.7,-6.9,-71.2,-21.7,-67.7,-31.6C-64.3,-41.6,-48.9,-46.8,-35.6,-50.4C-22.3,-54,-11.2,-56,0.3,-56.4C11.7,-56.8,23.3,-55.6,35.8,-51.7Z;
              M43,-67.9C54.8,-59.2,63.1,-45.9,67.5,-32C71.9,-18.2,72.5,-3.8,70.7,10.3C68.8,24.3,64.4,38.2,56.2,50.2C48.1,62.3,36.2,72.6,23.7,72.7C11.1,72.8,-2.1,62.6,-16.3,57.5C-30.4,52.4,-45.5,52.4,-51.3,44.9C-57.2,37.4,-53.8,22.3,-53.6,9.1C-53.3,-4.1,-56.1,-15.5,-55.1,-28.3C-54.1,-41,-49.3,-55.1,-39.4,-64.6C-29.6,-74.2,-14.8,-79.3,0.4,-79.9C15.5,-80.4,31.1,-76.5,43,-67.9Z;
              M38.6,-68C46.3,-55.1,46.3,-38.1,53,-24C59.8,-9.9,73.4,1.3,73.7,11.8C74,22.2,61.1,32,50.2,42C39.2,52,30.2,62.2,17.6,71C4.9,79.8,-11.4,87.1,-25.6,84.3C-39.8,81.5,-51.9,68.5,-63.5,55C-75.1,41.6,-86.3,27.8,-89.4,12.3C-92.4,-3.2,-87.4,-20.4,-79,-34.9C-70.5,-49.4,-58.7,-61.1,-44.9,-71.2C-31.2,-81.2,-15.6,-89.6,-0.1,-89.5C15.5,-89.4,30.9,-80.8,38.6,-68Z;
              M35.8,-51.7C48.3,-47.7,61.6,-41,66.4,-30.4C71.1,-19.8,67.3,-5.3,61.9,6.5C56.5,18.4,49.5,27.6,43.3,40.8C37,54,31.5,71.2,19.9,80.4C8.3,89.6,-9.3,90.7,-23.6,84.6C-37.9,78.5,-48.9,65.2,-53.4,51.2C-58,37.2,-56.1,22.5,-59.4,7.8C-62.7,-6.9,-71.2,-21.7,-67.7,-31.6C-64.3,-41.6,-48.9,-46.8,-35.6,-50.4C-22.3,-54,-11.2,-56,0.3,-56.4C11.7,-56.8,23.3,-55.6,35.8,-51.7Z;"
            ></animate>
          </path>

          <path fill="#FB923C" transform="translate(100 130)">
            <animate
              attributeName="d"
              dur="15000ms"
              repeatCount="indefinite"
              values="M36.7,-58.5C47.7,-50.1,56.6,-40,65.8,-27.7C75.1,-15.5,84.5,-1,81.7,11.1C78.9,23.1,63.8,32.6,51.9,43.2C40,53.7,31.3,65.2,20.7,66.3C10.2,67.4,-2,58,-12.4,51C-22.7,43.9,-31.2,39.1,-43.5,33.1C-55.9,27.1,-72.2,19.9,-80.7,7.3C-89.2,-5.3,-90,-23.4,-82.2,-36.4C-74.5,-49.3,-58.1,-57.2,-43,-63.7C-27.9,-70.1,-13.9,-75.2,-0.5,-74.4C12.9,-73.6,25.8,-66.9,36.7,-58.5Z;
              M47.3,-68C61.1,-64.6,72,-51.3,77.5,-36.3C83,-21.3,83,-4.7,77.9,9.2C72.7,23,62.4,34.1,51.1,40.6C39.8,47.1,27.3,48.9,16.3,49.5C5.2,50.1,-4.6,49.4,-14.3,47.2C-24,45,-33.7,41.3,-43.1,34.9C-52.4,28.4,-61.5,19.3,-63.4,8.8C-65.3,-1.6,-60.1,-13.3,-56,-26.9C-51.8,-40.4,-48.8,-55.8,-39.6,-61.3C-30.5,-66.8,-15.2,-62.5,0.7,-63.6C16.7,-64.8,33.4,-71.4,47.3,-68Z;
              M33.5,-57.6C42.1,-46.6,46.8,-35.1,52.7,-23.6C58.7,-12.2,65.9,-0.8,63.8,8.7C61.7,18.3,50.4,26.1,40.8,33.2C31.2,40.2,23.4,46.6,12.5,55.8C1.7,65,-12.2,77,-21.3,73.8C-30.5,70.6,-34.8,52.3,-43.5,39.3C-52.1,26.4,-65,18.8,-66.8,9.3C-68.6,-0.1,-59.3,-11.5,-53.5,-24.6C-47.7,-37.7,-45.5,-52.6,-37.2,-63.7C-28.9,-74.8,-14.4,-82.2,-1,-80.7C12.4,-79.1,24.9,-68.6,33.5,-57.6Z;
              M38.5,-60C48.8,-53.3,55.4,-40.8,61.8,-27.9C68.2,-15,74.4,-1.7,72.4,10.2C70.4,22.2,60.2,32.8,49.3,39.5C38.5,46.3,26.9,49.1,15.6,51.8C4.4,54.5,-6.6,57,-20.4,58.1C-34.2,59.2,-51,58.9,-60.9,50.9C-70.8,42.8,-73.8,26.9,-72.8,12.5C-71.7,-1.9,-66.5,-15,-60.1,-26.9C-53.8,-38.8,-46.4,-49.7,-36.2,-56.5C-26,-63.3,-13,-66,0.6,-66.9C14.1,-67.7,28.2,-66.7,38.5,-60Z;
              M31.4,-56.1C39.3,-43.7,43.6,-32.8,50.1,-21.9C56.7,-11,65.5,-0.1,64.9,9.8C64.3,19.8,54.1,29,45.4,39.8C36.7,50.5,29.4,62.9,18.7,68.1C7.9,73.3,-6.2,71.4,-21,68.4C-35.7,65.5,-51,61.4,-56.6,51.1C-62.2,40.9,-58.1,24.3,-60.2,8.8C-62.2,-6.8,-70.4,-21.3,-69.2,-34.8C-68.1,-48.3,-57.6,-60.8,-44.5,-70.9C-31.4,-80.9,-15.7,-88.6,-2,-85.5C11.7,-82.4,23.4,-68.5,31.4,-56.1Z;
              M36.7,-58.5C47.7,-50.1,56.6,-40,65.8,-27.7C75.1,-15.5,84.5,-1,81.7,11.1C78.9,23.1,63.8,32.6,51.9,43.2C40,53.7,31.3,65.2,20.7,66.3C10.2,67.4,-2,58,-12.4,51C-22.7,43.9,-31.2,39.1,-43.5,33.1C-55.9,27.1,-72.2,19.9,-80.7,7.3C-89.2,-5.3,-90,-23.4,-82.2,-36.4C-74.5,-49.3,-58.1,-57.2,-43,-63.7C-27.9,-70.1,-13.9,-75.2,-0.5,-74.4C12.9,-73.6,25.8,-66.9,36.7,-58.5Z;"
            ></animate>
          </path>
        </svg>
        <div className="sm:w-64 sm:h-64 sm:bg-orange-400 sm:rounded-full sm:absolute sm:top-1/2 sm:transform sm:-translate-y-1/2 sm:rotate-[-30deg] sm:flex sm:items-center sm:justify-center">
          <Image
            src="/images/telas.jpg"
            alt="Imagen de telas"
            layout="fill"
            objectFit="cover"
            className="sm:rounded-full"
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
          <label htmlFor="username" className="text-sm text-gray-700">
            Nombre Completo
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email here"
            required
            className="p-3 border border-gray-300 rounded-lg text-sm"
          />

          <label htmlFor="password" className="text-sm text-gray-700">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password here"
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm pr-10" // Añade pr-10 para espacio al ícono
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center" // Ajusta la posición
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          <label htmlFor="confirm-password" className="text-sm text-gray-700">
            Confirmar Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your Password here"
              required
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
          <label htmlFor="username" className="text-sm text-gray-700">
            Celular
          </label>
          <input
            type="text"
            id="cellphone"
            name="cellphone"
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value)}
            placeholder="Enter your Cellphone here"
            required
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
            onClick={handleSubmit}
            className="py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-lg text-lg cursor-pointer"
          >
            Crear Cuenta
          </button>
          {error && (
            <div
              className="error-message"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#fff",
                backgroundColor: "#ff4d4d", // Fondo rojo suave
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                fontWeight: "bold",
                fontSize: "16px",
                margin: "20px 0",
                maxWidth: "400px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <span style={{ marginRight: "10px", fontSize: "20px", lineHeight: "1" }}>⚠️</span>
              <span>{error}</span>
              <button
                onClick={() => setError("")} // Limpia el error al hacer clic
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontSize: "18px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                ✖️
              </button>
            </div>
          )}
        </form>
        <p className="text-sm text-gray-700 mt-4">
          Ya tienes una cuenta{" "}
          <a href="/login" className="text-orange-400 hover:underline">
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
