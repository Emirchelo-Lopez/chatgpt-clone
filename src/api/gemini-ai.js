// Get the API key from environment variables
const GOOGLE_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GOOGLE_API_KEY}`;

/**
 * Generates a response from the Gemini API.
 * @param {string} userMsg - The user's message.
 * @param {Array<object>} chatHistory - The existing chat history.
 * @returns {Promise<string>} The AI's response text.
 */

// Make API call and generate the bot's response
export const generateResponse = async (userMsg, chatHistory) => {
  // Format the history and the new user message for the API
  const conversation = [
    ...chatHistory,
    {
      role: "user",
      parts: [{ text: userMsg }],
    },
  ];

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
    // Extract the text from the response
    const botMessage = data.candidates[0].content.parts[0].text;
    return botMessage;
  } catch (error) {
    console.error("Failed to generate AI response:", error);
    // Return a user-friendly error message
    return "Sorry, I encountered an error. Please try again.";
  }
};
