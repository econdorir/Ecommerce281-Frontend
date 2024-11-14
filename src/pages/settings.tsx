import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

interface UserData {
  id_usuario: number;
  nombre_usuario: string;
  email_usuario: string;
  celular: number;
  tipo_usuario: string;
  fecha_registro: string;
  nro_compras: number;
  especialidad: string;
  calificacion: number;
  id_comunidad: number;
  comunidad: {
    id_comunidad: number;
    nombre_comunidad: string;
    id_municipio: number;
    municipio: {
      id_municipio: number;
      nombre_municipio: string;
      id_provincia: number;
    };
  };
  estado_delivery: string;
}

interface Comunidad {
  id_comunidad: number;
  nombre_comunidad: string;
}

const Settings = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRol, setUserRol] = useState<string | null>(null);
  const [comunidades, setComunidades] = useState<Comunidad[]>([]);

  useEffect(() => {
    const userDataLocal = localStorage.getItem("userData");
    const userId = userDataLocal ? JSON.parse(userDataLocal).id_usuario : null;
    const rol = userDataLocal ? JSON.parse(userDataLocal).tipo_usuario : null;
    setUserRol(rol);

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/${rol}/${userId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchComunidades = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/comunidad`
        );
        setComunidades(response.data); // Asegúrate de que la estructura sea un array
      } catch (error) {
        console.error("Error al obtener comunidades:", error);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      console.error("ID de usuario no encontrada en localStorage");
      setLoading(false);
    }

    fetchComunidades();
  }, []);

  const handleUpdate = async () => {
    try {
      const userId = userData?.id_usuario;
      const rol = userRol;

      if (userId) {
        const updatedData = {
          nombre_usuario: userData.nombre_usuario,
          email_usuario: userData.email_usuario,
          celular: userData.celular,
          ...(rol === "artesano" && { id_comunidad: userData.id_comunidad }),
          ...(rol === "delivery" && {
            estado_delivery: userData.estado_delivery,
          }),
        };

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/${rol}/${userId}`,
          updatedData
        );
        console.log("Datos actualizados:", response.data);

        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Datos actualizados correctamente.",
          confirmButtonText: "Aceptar",
        });
      } else {
        console.error("ID de usuario no encontrado.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "ID de usuario no encontrado.",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al actualizar los datos. Inténtalo de nuevo más tarde.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleChangePassword = () => {
    router.push("/recovery");
  };

  const viewOrders = () => {
    router.push("/orders");
  };

  const viewDeliveries = () => {
    router.push("/deliveries");
  };

  const addProduct = () => {
    router.push("/productForm");
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!userData) {
    return <div>No se encontraron datos del usuario.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-20">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-screen-xl w-full">
          <h1 className="text-2xl font-semibold text-center">Configuración</h1>

          <div className="mt-4">
            <label className="block text-gray-500 text-sm">Nombre</label>
            <input
              type="text"
              value={userData.nombre_usuario}
              minLength={3}
              maxLength={50}
              onChange={(e) =>
                setUserData({ ...userData, nombre_usuario: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm transition-all duration-300 ease-in-out transform hover:border-blue-500 hover:scale-105 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-500 text-sm">Email</label>
            <input
              type="email"
              value={userData.email_usuario}
              onChange={(e) =>
                setUserData({ ...userData, email_usuario: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm transition-all duration-300 ease-in-out transform hover:border-blue-500 hover:scale-105 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-500 text-sm">Celular</label>
            <input
              type="tel"
              value={userData.celular}
              minLength={8}
              maxLength={8}
              onChange={(e) =>
                setUserData({ ...userData, celular: parseInt(e.target.value) })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm transition-all duration-300 ease-in-out transform hover:border-blue-500 hover:scale-105 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-500 text-sm">Tipo de Usuario</label>
            <input
              type="text"
              value={userData.tipo_usuario}
              readOnly
              className="mt-1 block w-full bg-gray-200 border-gray-300 rounded-md shadow-sm"
            />
          </div>

          {userRol === "cliente" && (
            <>
              <div className="mt-4">
                <label className="block text-gray-500 text-sm">
                  Fecha de Registro
                </label>
                <input
                  type="text"
                  value={userData.fecha_registro}
                  readOnly
                  className="mt-1 block w-full bg-gray-200 border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-500 text-sm">
                  Número de Compras
                </label>
                <input
                  type="text"
                  value={userData.nro_compras}
                  readOnly
                  className="mt-1 block w-full bg-gray-200 border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </>
          )}

          {userRol === "artesano" && (
            <>
              <div className="mt-4">
                <label className="block text-gray-500 text-sm">Especialidad</label>
                <input
                  type="text"
                  value={userData.especialidad}
                  onChange={(e) =>
                    setUserData({ ...userData, especialidad: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm transition-all duration-300 ease-in-out transform hover:border-blue-500 hover:scale-105 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-500 text-sm">Calificación</label>
                <input
                  type="text"
                  value={userData.calificacion}
                  readOnly
                  className="mt-1 block w-full bg-gray-200 border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-500 text-sm">Comunidad</label>
                <select
                  value={userData.comunidad.nombre_comunidad}
                  onChange={(e) => {
                    const selectedComunidad = comunidades.find(
                      (comunidad) =>
                        comunidad.nombre_comunidad === e.target.value
                    );
                    if (selectedComunidad) {
                      setUserData({
                        ...userData,
                        id_comunidad: selectedComunidad.id_comunidad,
                        comunidad: {
                          ...userData.comunidad,
                          nombre_comunidad: selectedComunidad.nombre_comunidad,
                        },
                      });
                    }
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm transition-all duration-300 ease-in-out transform hover:border-blue-500 hover:scale-105 focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                  <option value="">Selecciona una comunidad</option>
                  {comunidades.map((comunidad) => (
                    <option
                      key={comunidad.id_comunidad}
                      value={comunidad.nombre_comunidad}
                    >
                      {comunidad.nombre_comunidad}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {userRol === "delivery" && (
            <div className="mt-4">
              <label className="block text-gray-500 text-sm">Estado de Delivery</label>
              <select
                value={userData.estado_delivery}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    estado_delivery: e.target.value,
                  });
                }}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm transition-all duration-300 ease-in-out transform hover:border-blue-500 hover:scale-105 focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="">Selecciona un estado de delivery</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
                <option value="En camino">En Camino</option>
              </select>
            </div>
          )}

          <button
            onClick={handleUpdate}
            className="mt-6 w-full bg-blue-600 text-white rounded-md py-5 hover:bg-blue-700"
          >
            Actualizar Datos
          </button>

          <button
            onClick={handleChangePassword}
            className="mt-4 w-full bg-red-600 text-white rounded-md py-5 hover:bg-red-700"
          >
            Cambiar Contraseña
          </button>
          {userRol === "cliente" && (
            <button
              onClick={viewOrders}
              className="mt-4 w-full bg-green-600 text-white rounded-md py-5 hover:bg-green-700"
            >
              Ver Mis Pedidos
            </button>
          )}
          {userRol === "delivery" && (
            <button
              onClick={viewDeliveries}
              className="mt-4 w-full bg-green-600 text-white rounded-md py-5 hover:bg-green-700"
            >
              Ver Mis Entregas
            </button>
          )}
          {userRol === "artesano" && (
            <button
              onClick={addProduct}
              className="mt-4 w-full bg-green-600 text-white rounded-md py-5 hover:bg-green-700"
            >
              Añadir Producto
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
