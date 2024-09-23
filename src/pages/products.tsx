import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "@/components/footer";

// Definimos la interfaz para un producto
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cart, setCart] = useState<Product[]>([]);

  // Simulación de obtener productos desde una API
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data: Product[] = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <img
                src={product.image}
                alt={product.title}
                className="h-32 w-full object-cover mb-2"
              />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-700">${product.price}</p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-orange-400 hover:bg-orange-500 text-white py-1 px-3 rounded"
                >
                  Añadir al carrito
                </button>
                <Link href={`/product/${product.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">
                    Ver
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Carrito</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item.title} - ${item.price}
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
