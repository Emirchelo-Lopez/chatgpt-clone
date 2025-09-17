// src/api/geminiService.js

import axiosInstance from "./axios";

/**
 * Sends a message and conversation history to the backend to get an AI response.
 * @param {string} message - The user's message.
 * @param {Array} history - The chat history in the format expected by the backend.
 * @returns {Promise<string>} The AI-generated response.
 */
export const generateResponseService = async (message, history) => {
  try {
    const response = await axiosInstance.post("/api/chat/generate", {
      message,
      history,
    });
    return response.data.response;
  } catch (error) {
    console.error("Failed to generate AI response from backend:", error);
    throw new Error("Sorry, I encountered an error. Please try again.");
  }
};
