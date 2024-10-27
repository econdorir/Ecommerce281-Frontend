import React, { useState } from "react";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai"; // Import the necessary modules

interface Message {
  text: string;
  sender: string;
}

if (!process.env.NEXT_PUBLIC_APIKEY_GEMINI_AI) {
  console.log(
    "API HERE :DDDDDDDDDDDDDDDDDDDDDDDDd",
    process.env.NEXT_PUBLIC_APIKEY_GEMINI_AI
  );
  throw new Error("API key is not defined in the environment variables.");
}

console.log(
  ":OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO"
);
console.log(
  "API HERE :DDDDDDDDDDDDDDDDDDDDDDDDd",
  process.env.NEXT_PUBLIC_APIKEY_GEMINI_AI
);

const genAI = new GoogleGenerativeAI("AIzaSyDFbyuvbBT0SU8Vy4o2MvYFp0Z9HGJHw1U");

const schema = {
  description: "Product",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      nombre_producto: {
        type: SchemaType.STRING,
        description: "Nombre del producto",
        nullable: false,
      },
      precio: {
        type: SchemaType.STRING,
        description: "Precio del producto",
        nullable: false,
      },
      stock: {
        type: SchemaType.STRING,
        description: "Stock del producto",
        nullable: false,
      },
      descripcion: {
        type: SchemaType.STRING,
        description: "Descripcion del producto",
        nullable: false,
      },
      url_image: {
        type: SchemaType.STRING,
        description: "URL de la imagen del producto",
        nullable: false,
      },
    },
    required: ["recipeName"],
  },
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-001",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Nuevo estado para carga

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true); // Activar carga

    const message =
      "Dame una lista de productos con los atributos de nombre, precio, descripcion, stock e una url de imagen de producto sacada de una free api, el rpdocuto que pido es el siguiente";
    const fullPrompt = message + input;

    try {
      const response = await model.generateContent(fullPrompt);
      const botMessage = response.response.text();
      console.log(botMessage);

      setMessages((prev: any) => [...prev, botMessage]);
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
        className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
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
              className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
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
