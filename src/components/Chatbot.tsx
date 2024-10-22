import React, { useState } from "react";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai"; // Import the necessary modules

interface Message {
  text: string;
  sender: string;
}

const genAI = new GoogleGenerativeAI("");

const schema = {
  description: "List of messages",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      text: {
        type: SchemaType.STRING,
        description: "Message content",
        nullable: false,
      },
    },
    required: ["text"],
  },
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);

    // Define a message variable to add extra context to the prompt
    const message = "Tengo Canasta Palma Sunkha Median ste quiboro es una pieza única tejida a mano por artesanas de Vallegrande, utilizando fibra natural de palma zunjka. Su diseño artesanal y su material natural lo convierten en un objeto decorativo y funcional. Con medidas de 36 cm x 5 cm, es perfecto para llevar pequeños objetos o como elemento decorativo. Bandeja Tallada con alas Misiona ";
    const fullPrompt = message + input; // Combine the extra context with user input

    try {
      const response = await model.generateContent(fullPrompt);
      const botMessage = { text: response.response.text(), sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [...prev, { text: "Sorry, something went wrong.", sender: "bot" }]);
    }

    setInput("");
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
              <div key={index} className={`my-2 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                <span className={`inline-block p-2 rounded-lg ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l-lg focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
