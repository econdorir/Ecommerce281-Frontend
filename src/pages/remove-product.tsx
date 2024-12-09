import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import axios from "axios";
import { API_URL } from "@/libs/constants";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaUserCircle, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MdCircle, MdDirectionsCar } from "react-icons/md";

// Interfaces de datos
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
  
  interface Resenia {
    id_resenia: number;
    id_producto: number;
    id_usuario: number;
    descripcion_resenia: string;
    fecha_resenia: string;
    calificacion_resenia: string;
  }
  
  interface Product {
    id_producto: number;
    id_artesano: number;
    id_promocion: number;
    nombre_producto: string;
    precio_producto: string;  // Lo cambié a string para representar valores monetarios con decimales
    descripcion_producto: string;
    stock_producto: string;  // Esto también puede ser un número si prefieres manejar cantidades
    categoria_producto: string;
    peso_producto: string;
    largo_producto: string;
    ancho_producto: string;
    alto_producto: string;
    envio_gratuito: number;  // Puede ser -1 si no aplica o 1 si es gratuito
    calificacion: number;
    cantidad_calificacion: number;
    imagen: Image[];
    resenia: Resenia[];
  }
  
  const Remove_Product = () => {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [userRol, setUserRol] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [artesanoProducts, setArtesanoProducts] = useState<Product[]>([]);
    const [editProduct, setEditProduct] = useState<Product | null>(null); // Para editar el producto
  
    useEffect(() => {
      const userDataLocal = localStorage.getItem("userData");
      const userId = userDataLocal ? JSON.parse(userDataLocal).id_usuario : null;
      const rol = userDataLocal ? JSON.parse(userDataLocal).tipo_usuario : null;
      setUserRol(rol);
  
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${API_URL}/${rol}/${userId}`);
          setUserData(response.data);
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        } finally {
          setLoading(false);
        }
      };
  
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`${API_URL}/producto`);
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
          (product) => product.id_artesano === userData.id_usuario && product.stock_producto !== "0"
        );
        setArtesanoProducts(filteredProducts);
      }
    }, [products, userData]);
  
    const handleUpdateStock = async (id_producto: number) => {
      const confirmUpdate = window.confirm("¿Estás seguro de ELIMINAR este producto?");
      if (confirmUpdate) {
        try {
          await axios.patch(`${API_URL}/producto/${id_producto}`, {
            stock_producto: "0",
          });
          setArtesanoProducts((prev) =>
            prev.filter((product) => product.id_producto !== id_producto)
          );
          alert("Producto actualizado exitosamente.");
        } catch (error) {
          console.error("Error al actualizar el producto:", error);
          alert("Error al actualizar el producto. Intenta nuevamente.");
        }
      }
    };
  
    const handleEditProduct = (product: Product) => {
      setEditProduct(product); // Establecemos el producto para editar
    };
  
    const handleSaveChanges = async () => {
      if (editProduct) {
        try {
          await axios.patch(`${API_URL}/producto/${editProduct.id_producto}`, {
            nombre_producto: editProduct.nombre_producto,
            precio_producto: editProduct.precio_producto,
            descripcion_producto: editProduct.descripcion_producto,
            stock_producto: editProduct.stock_producto,
            categoria_producto: editProduct.categoria_producto,
            peso_producto: editProduct.peso_producto,
            largo_producto: editProduct.largo_producto,
            ancho_producto: editProduct.ancho_producto,
            alto_producto: editProduct.alto_producto,
          });
          alert("Producto actualizado exitosamente.");
          setEditProduct(null); // Cerramos el formulario de edición
          // Actualizamos la lista de productos
          const response = await axios.get(`${API_URL}/producto`);
          setProducts(response.data);
        } catch (error) {
          console.error("Error al guardar los cambios:", error);
          alert("Error al guardar los cambios. Intenta nuevamente.");
        }
      }
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
          <div className="h-auto flex flex-col items-center justify-center my-28 pt-8 font-mono">
            <div className=" bg-buttonpagecolor2 max-w-[628px] shadow-lg rounded-lg p-6 w-full sm:w-4/5">
              {userRol === "artesano" && (
                <>
                  <h1 className="text-white text-2xl font-light font-mono text-center uppercase tracking-widest">
                    Mis Productos
                  </h1>
                  <div className="mt-4">
                    {artesanoProducts.length > 0 ? (
                      artesanoProducts
                        .filter((product) => product.stock_producto > "0") // Filtrar productos con stock > 0
                        .map((product) => (
                          <div
                            key={product.id_producto}
                            className="flex flex-col border p-4 mb-2 justify-between items-center"
                          >
                            <div className="flex flex-col items-center">
                              {product.imagen.length > 0 && (
                                <img
                                  src={product.imagen[0].url_imagen}
                                  alt={product.nombre_producto}
                                  className="w-32 h-32 my-5 object-cover rounded-lg mr-4"
                                />
                              )}
                              <div className="text-white my-5">
                                <h2 className="text-lg font-semibold">{product.nombre_producto}</h2>
                                <p>Precio: ${product.precio_producto}</p>
                                <p>Descripción: {product.descripcion_producto}</p>
                                <p>Stock: {product.stock_producto}</p>
                              </div>
                            </div>
                            <div className="flex space-x-4">
                              <button
                                onClick={() => handleEditProduct(product)} // Al hacer clic en "Modificar", mostramos el formulario
                                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                              >
                                Modificar
                              </button>
                              <button
                                onClick={() => handleUpdateStock(product.id_producto)}
                                className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                              >
                                Eliminar
                              </button>
                            </div>
      
                            {/* Si estamos editando este producto, mostramos el formulario dentro de la tarjeta */}
                            {editProduct?.id_producto === product.id_producto && (
                              <div className="mt-4 bg-gray-800 p-4 rounded-lg text-white">
                                <h3 className="text-xl font-semibold">Modificar Producto</h3>
                                <div className="mt-2">
                                  <label>Nombre Producto:</label>
                                  <input
                                    type="text"
                                    value={editProduct.nombre_producto}
                                    onChange={(e) => setEditProduct({ ...editProduct, nombre_producto: e.target.value })}
                                    className="w-full p-2 mt-1 text-black"
                                  />
                                </div>
                                <div className="mt-2">
                                  <label>Precio:</label>
                                  <input
                                    type="text"
                                    value={editProduct.precio_producto}
                                    onChange={(e) => setEditProduct({ ...editProduct, precio_producto: e.target.value })}
                                    className="w-full p-2 mt-1 text-black"
                                  />
                                </div>
                                <div className="mt-2">
                                  <label>Descripción:</label>
                                  <textarea
                                    value={editProduct.descripcion_producto}
                                    onChange={(e) => setEditProduct({ ...editProduct, descripcion_producto: e.target.value })}
                                    className="w-full p-2 mt-1 text-black"
                                  />
                                </div>
                                <div className="mt-2">
                                  <label>Stock:</label>
                                  <input
                                    type="number"
                                    value={editProduct.stock_producto}
                                    onChange={(e) => setEditProduct({ ...editProduct, stock_producto: e.target.value })}
                                    className="w-full p-2 mt-1 text-black"
                                  />
                                </div>
                                <div className="mt-2">
                                  <label>Categoría:</label>
                                  <input
                                    type="text"
                                    value={editProduct.categoria_producto}
                                    onChange={(e) => setEditProduct({ ...editProduct, categoria_producto: e.target.value })}
                                    className="w-full p-2 mt-1 text-black"
                                  />
                                </div>
                                <div className="mt-2">
                                  <label>Peso (kg):</label>
                                  <input
                                    type="text"
                                    value={editProduct.peso_producto}
                                    onChange={(e) => setEditProduct({ ...editProduct, peso_producto: e.target.value })}
                                    className="w-full p-2 mt-1 text-black"
                                  />
                                </div>
                                <div className="mt-2">
                                  <label>Largo (cm):</label>
                                  <input
                                    type="text"
                                    value={editProduct.largo_producto}
                                    onChange={(e) => setEditProduct({ ...editProduct, largo_producto: e.target.value })}
                                    className="w-full p-2 mt-1 text-black"
                                  />
                                </div>
                                <div className="mt-2">
                                  <label>Ancho (cm):</label>
                                  <input
                                    type="text"
                                    value={editProduct.ancho_producto}
                                    onChange={(e) => setEditProduct({ ...editProduct, ancho_producto: e.target.value })}
                                    className="w-full p-2 mt-1 text-black"
                                  />
                                </div>
                                <div className="mt-2">
                                  <label>Alto (cm):</label>
                                  <input
                                    type="text"
                                    value={editProduct.alto_producto}
                                    onChange={(e) => setEditProduct({ ...editProduct, alto_producto: e.target.value })}
                                    className="w-full p-2 mt-1 text-black"
                                  />
                                </div>
                                <button
                                  onClick={handleSaveChanges}
                                  className="mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-700"
                                >
                                  Guardar Cambios
                                </button>
                              </div>
                            )}
                          </div>
                        ))
                    ) : (
                      <div className="text-center text-white">No hay productos disponibles con stock</div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      );
    }      
  export default Remove_Product;
  