import { useState } from "react";
import { createOrder } from "../services/OrderService";
import { useAppContext } from "@/context";
import { QRCodeCanvas } from "qrcode.react";

const PaymentForm = ({ onClose, cartItems, totalPrice }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [message, setMessage] = useState("");
  const { setCart } = useAppContext();
  const [paymentLink, setPaymentLink] = useState(""); // Estado para el enlace de pago
  const [showQRCode, setShowQRCode] = useState(false); // Estado para controlar la visualización del QR

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalAmount = totalPrice;

    const storedUserData = localStorage.getItem("userData");
    const userData = storedUserData ? JSON.parse(storedUserData) : {};


    const orderData = {
      id_carrito: userData.id_carrito,
      fecha_pedido: new Date().toISOString(),
      estado_pedido: "pendiente",
      monto_pago: parseInt(totalAmount),
      tipo_de_pedido: "rapido",
    };

    try {
      await createOrder(orderData);
      setMessage("Pago procesado con éxito. ¡Gracias por tu compra!");
      setCart([]);
      setTimeout(onClose, 3000);

      // Generar enlace de pago para el QR
      const generatedPaymentLink = `https://pago-ejemplo.com/pagar?monto=${totalAmount}`;
      setPaymentLink(generatedPaymentLink);
    } catch (error) {
      setMessage("Error al procesar el pedido. Inténtalo de nuevo.");
    }
  };

  const handleGenerateQRCode = () => {
    const generatedPaymentLink = `https://pago-ejemplo.com/pagar?monto=${totalPrice}`;
    setPaymentLink(generatedPaymentLink);
    setShowQRCode(true); // Mostrar el QR
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full flex">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4">Formulario de Pago</h2>
          {message ? (
            <div className="text-green-500 font-semibold text-center mb-4">
              {message}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Número de Tarjeta
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  className="border rounded w-full px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Nombre en la Tarjeta
                </label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  required
                  className="border rounded w-full px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Fecha de Expiración
                </label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                  className="border rounded w-full px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">CVC</label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  required
                  className="border rounded w-full px-3 py-2"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mr-2"
                >
                  Pagar
                </button>
                <button
                  type="button"
                  onClick={handleGenerateQRCode}
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                  Generar QR
                </button>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 w-full text-red-500 hover:underline"
              >
                Cancelar
              </button>
            </form>
          )}
        </div>

        {/* Código QR se muestra aquí */}
        {(showQRCode && paymentLink) && (
          <div className="ml-4 flex-shrink-0 text-center">
            <h3 className="font-semibold mb-2">Código QR para el pago:</h3>
            <QRCodeCanvas value={paymentLink} size={128} />
            <p className="mt-2 text-sm text-gray-600">Escanea el código QR para pagar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
