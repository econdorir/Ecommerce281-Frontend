import { useEffect, useState } from "react";
import CartItem from "@/components/CartItem";
import Navbar from "@/components/Navbar";
import PaymentForm from "@/components/PaymentForm";
import { useAppContext } from "@/context";

const Cart = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para la carga
  const { cart, setCart, setNumberOfProductsInCart } = useAppContext();
  useEffect(() => {
    const fetchProducts = async () => {
      const storedUserData: any = localStorage.getItem("userData");
      const userData = JSON.parse(storedUserData);

      //TODO hacer get del carrito del cliente con data de localstorage
      const response = await fetch(
        `http://localhost:5000/api/v1/carrito/cliente/${userData.id_usuario}`
      );
      const data = await response.json();
      const productsList = data.producto.map((item) => {
        return {
          ...item.producto,
          cantidad: item.cantidad,
        };
      });
      setNumberOfProductsInCart(productsList.length);
      setCart(productsList);
      setLoading(false);
    };
    
    fetchProducts();
  }, []);
  
  const totalPrice = cart.length
  
  return (
    <>
      <Navbar />
      <div className="max-w-2xl w-3/4 mx-auto mt-10 p-4 pt-28">
        <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          {loading ? (
            <p className="text-center text-gray-600">Cargando...</p>
          ) : cart.length === 0 ? (
            <p className="text-center text-gray-600">Tu carrito está vacío</p>
          ) : (
            cart.map((item, index) => (
              <CartItem key={index} item={item} />
            ))
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

      {showPaymentForm && (
        <PaymentForm
          onClose={() => setShowPaymentForm(false)}
          cartItems={cart}
        />
      )}
    </>
  );
};

export default Cart;
