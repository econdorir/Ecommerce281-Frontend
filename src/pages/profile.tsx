import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import axios from "axios";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserCircle,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { MdCircle, MdDirectionsCar } from "react-icons/md";
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

interface Image {
  id_imagen: number;
  url_imagen: string;
  id_producto: number;
}

interface Product {
  id_producto: number;
  id_artesano: number;
  id_promocion: number;
  nombre_producto: string;
  precio_producto: number;
  descripcion_producto: string;
  stock_producto: string;
  imagen: Image[];
}

const Profile = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRol, setUserRol] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]); // Estado para productos
  const [artesanoProducts, setArtesanoProducts] = useState<Product[]>([]); // Productos del artesano

  useEffect(() => {
    const userDataLocal = localStorage.getItem("userData");
    const userId = userDataLocal ? JSON.parse(userDataLocal).id_usuario : null;
    const rol = userDataLocal ? JSON.parse(userDataLocal).tipo_usuario : null;
    setUserRol(rol);

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/${rol}/${userId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/producto"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      console.error("ID de usuario no encontrada en localStorage");
      setLoading(false);
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (userData) {
      const filteredProducts = products.filter(
        (product) => product.id_artesano === userData.id_usuario
      );
      setArtesanoProducts(filteredProducts);
    }
  }, [products, userData]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!userData) {
    return <div>No se encontraron datos del usuario.</div>;
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gray-100 mt-20 font-mono">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-screen-xl w-full">
          <hr className="my-4 border-gray-300" />
          <h1 className="text-2xl font-light font-mono text-center uppercase tracking-widest">
            {userData.tipo_usuario}
          </h1>
          <h1 className="text-2xl font-semibold text-center">
            {userData.nombre_usuario}
          </h1>

          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gray-300">
              <FaUserCircle className="h-16 w-16 text-gray-600" />
            </div>
          </div>

          <hr className="my-4 border-gray-300" />

          {userRol === "cliente" && (
            <>
              <div className="mt-4 flex items-center justify-between">
                <h1 className="text-xl font-light font-mono uppercase tracking-widest">
                  Miembro desde
                </h1>
                <h1 className="text-xl text-right capitalize">
                  {formatDate(userData.fecha_registro)}
                </h1>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <h1 className="text-xl font-light font-mono uppercase tracking-widest">
                  Número de compras
                </h1>
                <h1 className="text-xl text-right capitalize">
                  {userData.nro_compras} compras
                </h1>
              </div>
            </>
          )}

          {userRol === "artesano" && (
            <>
              <div className="mt-4 flex items-center justify-between">
                <h1 className="text-xl font-light font-mono uppercase tracking-widest">
                  Especialidad
                </h1>
                <h1 className="text-xl text-right capitalize">
                  {userData.especialidad}
                </h1>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <h1 className="text-xl font-light font-mono uppercase tracking-widest">
                  Calificación
                </h1>
                <div className="flex items-center text-xl text-right capitalize">
                  {/* Aquí se muestran las estrellas */}
                  {Array.from({ length: 5 }, (v, i) => {
                    if (i < Math.floor(userData.calificacion)) {
                      return (
                        <FaStar key={i} className="text-blue-600 h-5 w-5" />
                      );
                    } else if (i < userData.calificacion) {
                      return (
                        <FaStarHalfAlt
                          key={i}
                          className="text-blue-600 h-5 w-5"
                        />
                      );
                    } else {
                      return (
                        <FaStar key={i} className="text-gray-300 h-5 w-5" />
                      );
                    }
                  })}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="h-6 w-6 text-gray-600 mr-2" />
                  <h1 className="text-xl font-light font-mono tracking-widest">
                    Comunidad
                  </h1>
                </div>
                <h1 className="text-xl text-right capitalize">
                  {userData.comunidad.nombre_comunidad}
                </h1>
              </div>
            </>
          )}

          {userRol === "delivery" && (
            <div className="mt-4 flex items-center justify-between">
              <h1 className="text-xl font-light font-mono uppercase tracking-widest">
                Estado
              </h1>
              <div className="flex items-center text-xl text-right capitalize">
                {userData.estado_delivery === "Activo" && (
                  <>
                    <MdCircle className="text-green-500" />
                    <span className="ml-2">{userData.estado_delivery}</span>
                  </>
                )}
                {userData.estado_delivery === "Inactivo" && (
                  <>
                    <MdCircle className="text-gray-400" />
                    <span className="ml-2">{userData.estado_delivery}</span>
                  </>
                )}
                {userData.estado_delivery === "En camino" && (
                  <>
                    <MdDirectionsCar className="text-yellow-500" />
                    <span className="ml-2">{userData.estado_delivery}</span>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <FaEnvelope className="h-6 w-6 text-gray-600 mr-2" />
              <h1 className="text-xl font-light font-mono tracking-widest">
                Email
              </h1>
            </div>
            <h1 className="text-xl text-right capitalize">
              {userData.email_usuario}
            </h1>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <FaPhone className="h-6 w-6 text-gray-600 mr-2" />
              <h1 className="text-xl font-light font-mono tracking-widest">
                Celular
              </h1>
            </div>
            <h1 className="text-xl text-right capitalize">
              {userData.celular}
            </h1>
          </div>
          <hr className="my-4 border-gray-300" />
          {userRol === "artesano" && (
            <>
              <h1 className="text-2xl font-light font-mono text-center uppercase tracking-widest">
                Mis Productos
              </h1>
              <div className="mt-4">
                {artesanoProducts.length > 0 ? (
                  artesanoProducts.map((product) => (
                    <div
                      key={product.id_producto}
                      className="border p-4 mb-2 flex"
                    >
                      {product.imagen.length > 0 && (
                        <img
                          src={product.imagen[0].url_imagen}
                          alt={product.nombre_producto}
                          className="w-32 h-32 object-cover rounded-lg mr-4"
                        />
                      )}
                      <div>
                        <h2 className="text-lg font-semibold">
                          {product.nombre_producto}
                        </h2>
                        <p>Precio: ${product.precio_producto}</p>
                        <p className="text-justify">
                          Descripción: {product.descripcion_producto}
                        </p>
                        <p>Stock: {product.stock_producto}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No tienes productos disponibles.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
