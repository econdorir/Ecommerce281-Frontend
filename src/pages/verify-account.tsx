import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { LoginService } from "@/services/LoginService";
import { useAppContext } from "@/context";
import { API_URL } from "@/libs/constants";

const VerifyAccount = () => {
  const router = useRouter();
  const { token } = router.query; // Obtener el token de la URL
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const { setUsername, setEmail, setRole, setPassword, setIsLoggedIn } =
    useAppContext();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setError(""); // Resetea el error antes de iniciar

    try {
      let userDataString = localStorage.getItem("userData");
      let userData = userDataString ? JSON.parse(userDataString) : {};


      let username = userData.nombre_usuario; // Accede a username
      let email = userData.email_usuario; // Accede a email
      let password = userData.password_usuario; // Accede a password
      let role = userData.tipo_usuario; // Accede a role

      const result = await LoginService(email, password, role);

      setUsername(result.nombre_usuario);
      setPassword(result.password_usuario);
      setRole(result.tipo_usuario);
      setIsLoggedIn(true);
      router.push("/products");
      // Aquí puedes manejar la respuesta, como redirigir al usuario o almacenar el token
    } catch (error) {
      setError("Error en el inicio de sesión. Verifica tus credenciales.");
      console.error("Error during login:", error);
    }
  };

  const verifyToken = async (token) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        token,
      });

      // Asumiendo que el servidor retorna un mensaje en la respuesta
      setStatus(res.data.message);
    } catch (err) {
      // Manejo de errores, capturando el mensaje de error del servidor
      const message =
        err.response?.data?.message || "Error al verificar la cuenta";
      setError(message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Verificar Cuenta
      </h1>
      <div className="text-center mb-4">
        {status && <p className="text-lg text-green-600">{status}</p>}
        {error && <p className="text-lg text-red-600">{error}</p>}
      </div>
      <button
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
        onClick={handleLoginSubmit}
      >
        Verificar
      </button>
    </div>
  );
};

export default VerifyAccount;
