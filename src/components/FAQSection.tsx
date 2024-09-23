import React, { useState } from "react";

const faqData = [
  {
    question: "¿Qué es una comunidad?",
    answer:
      "Una comunidad es un grupo de personas que comparten intereses, objetivos y valores comunes. Estas comunidades pueden formarse en torno a diversos temas, como pasatiempos, profesiones, causas sociales o intereses culturales. La interacción y el apoyo mutuo son clave para el desarrollo de relaciones significativas entre los miembros, lo que permite un entorno en el que se pueden intercambiar ideas y experiencias.",
  },
  {
    question: "¿Cómo puedo unirme a una comunidad?",
    answer:
      "Unirte a una comunidad es un proceso sencillo. Primero, debes registrarte en nuestra plataforma creando un perfil. Una vez que estés dentro, puedes explorar las diferentes comunidades disponibles. Cada comunidad tiene una breve descripción que te ayudará a decidir cuál es la más adecuada para ti. Solo tienes que hacer clic en 'Unirte' y podrás comenzar a interactuar con otros miembros de inmediato.",
  },
  {
    question: "¿Puedo crear mi propia comunidad?",
    answer:
      "¡Sí! Creando tu propia comunidad puedes reunir a personas con intereses similares. Simplemente necesitas seguir unos pasos sencillos en nuestra plataforma. Deberás proporcionar un nombre, una descripción y algunas normas básicas. Una vez que tu comunidad esté aprobada, podrás invitar a otros a unirse y empezar a organizar actividades y discusiones. Este es un gran modo de liderar y fomentar un espacio de aprendizaje y colaboración.",
  },
  {
    question: "¿Existen comunidades específicas para ciertos intereses?",
    answer:
      "Definitivamente. Nuestra plataforma alberga una variedad de comunidades que cubren una amplia gama de intereses, desde tecnología y ciencia hasta deportes, arte y bienestar. Cada comunidad está diseñada para proporcionar un espacio seguro y acogedor donde los miembros pueden compartir su pasión, aprender de otros y participar en actividades relacionadas con su interés específico.",
  },
  {
    question: "¿Cómo se comunican los miembros de una comunidad?",
    answer:
      "Los miembros pueden comunicarse de diversas maneras. Nuestra plataforma incluye foros de discusión donde se pueden publicar temas y responder a otros, así como opciones de chat en vivo para interacciones más directas. Además, se pueden organizar eventos virtuales, como seminarios web y talleres, donde los miembros pueden reunirse y discutir en tiempo real. Estas herramientas están diseñadas para facilitar la comunicación y el fortalecimiento de las relaciones entre los miembros.",
  },
  {
    question: "¿Puedo salir de una comunidad?",
    answer:
      "Sí, puedes abandonar cualquier comunidad en la que estés participando en cualquier momento. Para hacerlo, simplemente ve a la sección de comunidades en tu perfil, selecciona la comunidad de la que deseas salir y elige la opción de 'Abandonar'. Esto te permitirá salir de la comunidad sin afectar tu perfil ni tus interacciones en otras comunidades en las que puedas estar involucrado.",
  },
  {
    question: "¿Qué tipo de actividades se realizan en las comunidades?",
    answer:
      "Las comunidades organizan una variedad de actividades para fomentar la participación y el aprendizaje. Esto incluye discusiones temáticas, talleres prácticos, sesiones de preguntas y respuestas, y eventos en línea donde los miembros pueden compartir sus conocimientos y experiencias. Además, se pueden crear proyectos colaborativos donde los miembros trabajan juntos en iniciativas específicas. Estas actividades están diseñadas para enriquecer la experiencia de todos los miembros y ayudarles a crecer tanto personal como profesionalmente.",
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-4 mt-8 max-w-3xl">
      <h2 className="text-2xl font-semibold">Preguntas Frecuentes</h2>
      <div className="mt-4">
        {faqData.map((item, index) => (
          <div key={index} className="border-b py-2">
            <button
              onClick={() => toggleAnswer(index)}
              className="flex justify-between items-center w-full text-left focus:outline-none"
            >
              <span className="text-lg font-semibold">{item.question}</span>
              <span className="text-lg">{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && (
              <p className="text-gray-600 mt-1">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
