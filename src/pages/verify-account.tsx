import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { LoginService } from "@/services/LoginService";
import { useAppContext } from "@/context";
import { API_URL } from "@/libs/constants";

const VerifyAccount = () => {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { role,setUsername, setEmail, setRole, setPassword, setIsLoggedIn } =
    useAppContext();

  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, [token]);

  const verifyToken = async (token) => {
    const tipo_usuario = role; // Asegúrate de obtener este valor
  
    if (!token) {
      setError("Token no proporcionado.");
      return;
    }
  
    setError("");
    setStatus("");
    try {
      const res = await axios.post(`${API_URL}/auth/verify`, { token, tipo_usuario });
      setStatus(res.data.message);
    } catch (err) {
      const message =
        err.response?.data?.message || "Error al verificar la cuenta.";
      setError(message);
    }
  };
  

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let userDataString = localStorage.getItem("userData");
      let userData = userDataString ? JSON.parse(userDataString) : null;

      if (!userData || !userData.email_usuario || !userData.password_usuario) {
        setError("Datos de usuario incompletos.");
        return;
      }

      const result = await LoginService(
        userData.email_usuario,
        userData.password_usuario,
        userData.tipo_usuario
      );

      setUsername(result.nombre_usuario);
      setEmail(result.email_usuario);
      setPassword(result.password_usuario);
      setRole(result.tipo_usuario);
      setIsLoggedIn(false);
      router.push("/products");
    } catch (error) {
      setError("Error en el inicio de sesión. Verifica tus credenciales.");
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Verificar Cuenta</h1>
      <div className="text-center mb-4">
        {status && <p className="text-lg text-green-600">{status}</p>}
        {error && <p className="text-lg text-red-600">{error}</p>}
      </div>
      <button
        disabled={isLoading}
        className={`px-4 py-2 text-white bg-blue-600 rounded ${
          isLoading ? "opacity-50" : "hover:bg-blue-700"
        } transition duration-300`}
        onClick={handleLoginSubmit}
      >
        {isLoading ? "Verificando..." : "Verificar"}
      </button>
    </div>
  );
};

export default VerifyAccount;
