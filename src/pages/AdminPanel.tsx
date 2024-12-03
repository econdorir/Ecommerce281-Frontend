import { useState, useEffect } from "react";
import DataTable from "@/components/DataTable";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface Item {
  id_usuario?: number; // for clientes
  id_producto?: number; // for productos
  // Add other properties based on your API response
}

const endpoints = {
  clientes: "http://localhost:5000/api/v1/cliente",
  artesanos: "http://localhost:5000/api/v1/artesano",
  productos: "http://localhost:5000/api/v1/producto",
  reseñas: "http://localhost:5000/api/v1/resenia",
  comunidades: "http://localhost:5000/api/v1/comunidad",
  deliverys: "http://localhost:5000/api/v1/delivery",
  promociones: "http://localhost:5000/api/v1/promocion"
};
/*DEPLOY TODO, CAMBIAR ESTO AL BACKEND DE DEPLOY*/
const idAccessors = {
  clientes: "id_usuario",
  artesanos: "id_artesano", // Adjust as necessary
  productos: "id_producto",
  reseñas: "id_resenia", // Adjust as necessary
  comunidades: "id_comunidad", // Adjust as necessary
  deliverys: "id_delivery", // Adjust as necessary
  promociones: "id_promocion",
};

const AdminPanel = () => {
  const [activeEndpoint, setActiveEndpoint] = useState("clientes");
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(endpoints[activeEndpoint]);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: Item[] = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeEndpoint]);

  const handleButtonClick = (endpoint) => {
    setActiveEndpoint(endpoint);
    setSearchTerm(""); // Reset search term when changing endpoint
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${endpoints[activeEndpoint]}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setData((prevData) =>
        prevData.filter((d) => d[idAccessors[activeEndpoint]] !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredData = data.filter((item) => {
    return Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const columns =
    filteredData.length > 0
      ? Object.keys(filteredData[0]).map((key) => ({
          accessor: key,
          header: key.charAt(0).toUpperCase() + key.slice(1),
        }))
      : [];

  return (
    <SidebarProvider className="bg-buttonpagecolor2">
      <AdminSidebar />
      <div className="flex flex-col p-10 bg-black">
        <h1 className="text-2xl font-bold mb-4 text-buttonpagecolor">Panel de Administración</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded mb-4 bg-extrapagecolor2 text-black mr-2"
          />
          {Object.keys(endpoints).map((key) => (
            <button
              key={key}
              onClick={() => handleButtonClick(key)}
              className={`mr-2 p-2 border rounded ${
                activeEndpoint === key
                  ? "bg-buttonpagecolor text-white"
                  : "bg-buttonpagecolor2 text-white"
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <DataTable
            data={filteredData}
            columns={columns}
            onDelete={handleDelete}
            idAccessor={idAccessors[activeEndpoint]}
          />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPanel;
