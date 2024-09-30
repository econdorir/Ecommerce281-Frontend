import { useEffect, useState } from 'react';
import CartItem from "@/components/CartItem";
import Navbar from "@/components/Navbar";
import PaymentForm from "@/components/PaymentForm";

const Cart = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Inicializa el estado para los productos del carrito
  const [loading, setLoading] = useState(true); // Estado para la carga

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('/api/carrito'); // Asegúrate de que esta ruta sea correcta
        if (!response.ok) {
          throw new Error('Error al cargar los productos del carrito');
        }
        const data = await response.json();
        setCartItems(data); // Establece los productos del carrito
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Cambia el estado de carga
      }
    };

    fetchCartItems();
  }, []); // Se ejecuta solo una vez al montar el componente

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.precio_producto * (item.cantidad || 1),
    0
  );

  return (
    <>
      <Navbar />
      <div className="max-w-2xl w-3/4 mx-auto mt-10 p-4 pt-28">
        <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          {loading ? (
            <p className="text-center text-gray-600">Cargando...</p>
          ) : cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Tu carrito está vacío</p>
          ) : (
            cartItems.map((item) => <CartItem key={item.id_producto} item={item} />)
          )}
          <div className="mt-4 flex justify-between font-semibold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button 
            onClick={() => setShowPaymentForm(true)} 
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Finalizar Compra
          </button>
        </div>
      </div>

      {showPaymentForm && <PaymentForm onClose={() => setShowPaymentForm(false)} cartItems={cartItems} />}
    </>
  );
};

export default Cart;
