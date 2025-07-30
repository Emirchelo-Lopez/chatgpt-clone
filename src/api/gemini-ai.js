// API setup
const GOOGLE_API_KEY = "AIzaSyBcNliFriC_1UdQS65ad_auWX_b8JmUois";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GOOGLE_API_KEY}`;

let userMsg = "";
const chatHistory = [];

// Make the API  call and generate the bot's response
export const generateResponse = async () => {
  // Add user message to the chat history
  chatHistory.push({
    role: "user",
    parts: [{ text: userMsg }],
  });

  try {
    // Sent the chat history to the API to get a response
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: chatHistory }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error("HTTP request failed: ", data.error.message);
    return data;
  } catch (error) {
    console.log(error);
  }
};
