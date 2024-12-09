import React, { useState } from "react";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai"; // Import the necessary modules

interface Message {
  text: string;
  sender: string;
}

const genAI = new GoogleGenerativeAI(`${process.env.NEXT_PUBLIC_APIKEY_GEMINI_AI}`);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const productDataStringForAI = JSON.stringify([
  {
    nombre_producto: "Canasta Palma Sunkha Mediano",
    precio_producto: 25,
    descripcion_producto:
      "Este quiboro es una pieza única tejida a mano por artesanas de Vallegrande, utilizando fibra natural de palma zunjka. Su diseño artesanal y su material natural lo convierten en un objeto decorativo y funcional. Con medidas de 36 cm x 5 cm, es perfecto para llevar pequeños objetos o como elemento decorativo.",
    stock_producto: 10,
    categoria_producto: "Decoración",
  },
  {
    nombre_producto: "Bandeja Tallada con alas Misionales",
    precio_producto: 100,
    descripcion_producto:
      "Elegante bandeja tallada a mano en madera de cedro, una obra de arte única creada por artesanos de San Miguel de Velasco.",
    stock_producto: 20,
    categoria_producto: "Muebles",
  },
  {
    nombre_producto: "Arbol toborochi con base, tamaño mediano",
    precio_producto: 160,
    descripcion_producto:
      "Toborochi con base, tallado en madera cedro y pintado a mano.",
    stock_producto: 5,
    categoria_producto: "Decoración",
  },
  {
    nombre_producto: "Baul Pintado Pequeño",
    precio_producto: 85,
    descripcion_producto:
      "Baul Pintado en madera y recuerda que todas las creaciones de Artecampo son piezas únicas debido a la naturaleza de nuestro proceso de producción.",
    stock_producto: 15,
    categoria_producto: "Muebles",
  },
  {
    nombre_producto: "Muñeca de chala Crucenia",
    precio_producto: 35,
    descripcion_producto: "Muñeca realizada en chala de maíz teñida.",
    stock_producto: 10,
    categoria_producto: "Juguetes",
  },
  {
    nombre_producto: "Adorno Tallado 3 Modelos De Pajaritos.",
    precio_producto: 155,
    descripcion_producto: "Adorno tallado en madera cedro y pintado a mano.",
    stock_producto: 20,
    categoria_producto: "Decoración",
  },
  {
    nombre_producto: "Angel Tallado Redondo Pequeño",
    precio_producto: 50,
    descripcion_producto: "Adorno tallado en madera cedro y pintado a mano.",
    stock_producto: 11,
    categoria_producto: "Decoración",
  },
  {
    nombre_producto: "Azucarera Cerámica Tentayape mediano",
    precio_producto: 36,
    descripcion_producto:
      "Piezas de cerámica realizadas con la técnica prehispánica de los rollos de arcilla y decoradas con pigmentos naturales.",
    stock_producto: 12,
    categoria_producto: "Cerámica",
  },
  {
    nombre_producto: "Bombonera de cerámica",
    precio_producto: 100,
    descripcion_producto: "Bombonera de cerámica pintada a mano.",
    stock_producto: 14,
    categoria_producto: "Cerámica",
  },
  {
    nombre_producto: "Bombonera Jipijapa tapa de madera Mediana",
    precio_producto: 95,
    descripcion_producto: "Bombonera Tejido en palma Jipijapa tapa de madera.",
    stock_producto: 11,
    categoria_producto: "Artesanía",
  },
]);

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true); // Activar carga

    const message = `De la siguiente data ${productDataStringForAI}, necesito que me recomiendes productos con las siguientes caracteristicas que te daré.`;
    
    let fullPrompt = "";
    
    if (isFirstMessage) {
      fullPrompt = message + input;
    } else {
      fullPrompt = input;
    }

    try {
      const response = await model.generateContent(fullPrompt);
      const botMessage = response.response.text();
      console.log(botMessage);

      setMessages((prev: any) => [
        ...prev,
        {
          text: botMessage,
          sender: "bot",
        },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Lo siento, algo salió mal.", sender: "bot" },
      ]);
    } finally {
      setLoading(false); // Desactivar carga
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-buttonpagecolor text-white rounded-full shadow-lg hover:bg-opacity-90 transition"
      >
        Chat
      </button>

      {isOpen && (
        <div className="flex flex-col w-80 p-4 border rounded-lg shadow-lg bg-white mt-2">
          <div className="flex-1 overflow-y-auto mb-4 max-h-60">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`my-2 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
            {loading && <div className="text-center">Cargando...</div>}{" "}
            {/* Indicador de carga */}
          </div>
          <div className="flex">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l-lg focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
            />
            <button
              onClick={handleSend}
              className="p-2 bg-buttonpagecolor text-white rounded-r-lg hover:bg-buttonpagecolor2"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
