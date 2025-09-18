// src/hooks/useChat.js
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const useChat = () => {
  try {
    const context = useContext(ChatContext);

    if (!context) {
      console.error("useChat must be used within a ChatProvider");
      // Return a safe default object instead of throwing
      return {
        chatHistory: [],
        currentMessages: [],
        isLoadingMessages: false,
        error: "Chat context not available",
        // Add other expected properties with safe defaults
        loadMessages: () => Promise.resolve([]),
        addMessage: () => Promise.resolve({}),
        addChat: () => Promise.resolve({}),
        createNewChat: () => Promise.resolve(),
        clearError: () => {},
        // ... other functions with safe defaults
      };
    }

    return context;
  } catch (error) {
    console.error("Error in useChat hook:", error);
    // Return safe defaults on any error
    return {
      chatHistory: [],
      currentMessages: [],
      isLoadingMessages: false,
      error: "Failed to initialize chat",
      loadMessages: () => Promise.resolve([]),
      addMessage: () => Promise.resolve({}),
      addChat: () => Promise.resolve({}),
      createNewChat: () => Promise.resolve(),
      clearError: () => {},
    };
  }
};

export default useChat;
