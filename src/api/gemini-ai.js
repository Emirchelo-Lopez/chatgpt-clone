// src/api/gemini-ai.js

// Obtén la clave de la API de las variables de entorno
const GOOGLE_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`;

// Realiza la llamada a la API y genera la respuesta del bot
export const generateResponse = async (userMsg, chatHistory) => {
  // Si el historial de chat (chatHistory) tiene contenido, lo usamos.
  // Si está vacío (como en el caso de las sugerencias de prompts),
  // creamos una nueva conversación usando el mensaje del usuario (userMsg).
  const conversation =
    chatHistory && chatHistory.length > 0
      ? chatHistory
      : [{ role: "user", parts: [{ text: userMsg }] }];

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: conversation }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`HTTP request failed: ${errorData.error.message}`);
    }

    const data = await res.json();
    // Extrae el texto de la respuesta
    const botMessage = data.candidates[0].content.parts[0].text;
    return botMessage;
  } catch (error) {
    console.error("Failed to generate AI response:", error);
    // Devuelve un mensaje de error amigable para el usuario
    return "Sorry, I encountered an error. Please try again.";
  }
};
