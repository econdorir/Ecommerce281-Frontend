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
};

const idAccessors = {
  clientes: "id_usuario",
  artesanos: "id_usuario", // Adjust as necessary
  productos: "id_producto",
  reseñas: "id_resenia", // Adjust as necessary
  comunidades: "id_comunidad", // Adjust as necessary
  deliverys: "id_usuario", // Adjust as necessary
};

const AdminDashboard = () => {
  const [activeEndpoint, setActiveEndpoint] = useState("clientes");
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          accessor: key,
          header: key.charAt(0).toUpperCase() + key.slice(1),
        }))
      : [];

  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard de Administración</h1>
        <div className="mb-4">
          {Object.keys(endpoints).map((key) => (
            <button
              key={key}
              onClick={() => handleButtonClick(key)}
              className={`mr-2 p-2 border rounded ${
                activeEndpoint === key
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
        <DataTable
          data={data}
          columns={columns}
          onDelete={handleDelete}
          idAccessor={idAccessors[activeEndpoint]} // Pass the appropriate ID accessor
        />
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
