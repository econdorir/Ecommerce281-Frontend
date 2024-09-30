"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "../components/ProductCard";

interface Product {
  id_producto: number;
  id_artesano: number;
  id_promocion: number;
  nombre_producto: string;
  precio_producto: string;
  descripcion_producto: string;
  stock_producto: string;
  url_producto: string;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cart, setCart] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>(""); // Estado para el filtro activo
  const [sortOrder, setSortOrder] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/api/v1/producto");
      const data: Product[] = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === "bajo-stock") {
      return matchesSearchTerm && parseInt(product.stock_producto) < 5;
    } else if (activeFilter === "alto-stock") {
      return matchesSearchTerm && parseInt(product.stock_producto) >= 5;
    } else if (activeFilter === "bajo-precio") {
      return matchesSearchTerm && parseFloat(product.precio_producto) < 50;
    } else if (activeFilter === "alto-precio") {
      return matchesSearchTerm && parseFloat(product.precio_producto) >= 50;
    }
    return matchesSearchTerm;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseFloat(a.precio_producto);
    const priceB = parseFloat(b.precio_producto);

    if (sortOrder === "asc") {
      return priceA - priceB; // Menor a mayor
    } else if (sortOrder === "desc") {
      return priceB - priceA; // Mayor a menor
    }
    return 0; // Sin orden específico
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 pt-56">
        <h1 className="text-2xl font-bold mb-4">Productos</h1>
        
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />

        <div className="mb-4">
          <button
            onClick={() => setActiveFilter("bajo-stock")}
            className={`p-2 rounded mr-2 ${activeFilter === "bajo-stock" ? "bg-blue-700" : "bg-blue-500"} text-white`}
          >
            Bajo Stock
          </button>
          <button
            onClick={() => setActiveFilter("alto-stock")}
            className={`p-2 rounded mr-2 ${activeFilter === "alto-stock" ? "bg-blue-700" : "bg-blue-500"} text-white`}
          >
            Alto Stock
          </button>
          <button
            onClick={() => setActiveFilter("bajo-precio")}
            className={`p-2 rounded mr-2 ${activeFilter === "bajo-precio" ? "bg-blue-700" : "bg-blue-500"} text-white`}
          >
            Bajo Precio
          </button>
          <button
            onClick={() => setActiveFilter("alto-precio")}
            className={`p-2 rounded mr-2 ${activeFilter === "alto-precio" ? "bg-blue-700" : "bg-blue-500"} text-white`}
          >
            Alto Precio
          </button>
          <button
            onClick={() => setActiveFilter("")}
            className="p-2 bg-gray-300 rounded"
          >
            Limpiar Filtros
          </button>
        </div>

        <div className="mb-4">
          <button onClick={() => setSortOrder("asc")} className="p-2 bg-green-500 text-white rounded mr-2">
            Precio: Menor a Mayor
          </button>
          <button onClick={() => setSortOrder("desc")} className="p-2 bg-red-500 text-white rounded">
            Precio: Mayor a Menor
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id_producto}
              title={product.nombre_producto}
              price={parseFloat(product.precio_producto)}
              imageUrl={product.url_producto}
              stock={product.stock_producto}
              description={product.descripcion_producto}
              onAddToCart={() => handleAddToCart(product)}
              onViewDetail={() =>
                console.log(`View details for product with id ${product.id_producto}`)
              }
            />
          ))}
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Carrito</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item.nombre_producto} - ${parseFloat(item.precio_producto).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
