import { createContext, useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { generateResponse } from "../api/gemini-ai";
import { defaultSuggestions } from "../data/defaultPrompts";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  // tracks the selected chat or prompt
  const [activeItem, setActiveItem] = useState(null);

  // holds AI-generated prompt cards.
  const [promptSuggestions, setPromptSuggestions] = useState([]);

  /// flag for loading spinner
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(true);

  // State to manage chat history dynamically
  // loads saved chats from localStorage or starts empty
  const [chatHistory, setChatHistory] = useState(() => {
    const savedChats = localStorage.getItem("chatHistory");
    return savedChats ? JSON.parse(savedChats) : [];
  });

  // On every update it saves the latest chat history.
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const addChat = (newChat) => {
    setChatHistory((prevHistory) => [...prevHistory, newChat]);
  };

  const deleteChat = (chatId) => {
    setChatHistory((prevHistory) =>
      prevHistory.filter((chat) => chat.id !== chatId)
    );
  };

  const renameChat = (chatId, newTitle) => {
    setChatHistory((prevHistory) =>
      prevHistory.map((chat) =>
        chat.id === chatId ? { ...chat, title: newTitle } : chat
      )
    );
  };

  // function to generate prompt suggestion cards
  const fetchPromptSuggestions = async () => {
    if (promptSuggestions.length > 0) return;
    setIsLoadingPrompts(true);

    try {
      const promptRequest =
        "Give me five prompt ideas of any topic, to see what you're capable of. Prompts must be only text generation-related. Must be a sentence long (not more than 10-12 words). Each prompt should be separated by a hyphen. Go straight to the point.";
      const botResponseContent = await generateResponse(promptRequest, []);
      const arrayPrompts = botResponseContent
        .split("-")
        .filter((p) => p.trim() !== "");
      const promptCards = arrayPrompts.map((suggestion) => ({
        icon: <Sparkles className="prompt-card__icon" />,
        title: suggestion.trim(),
      }));
      setPromptSuggestions(promptCards);
    } catch (error) {
      console.error("Failed to generate prompt suggestion:", error);
      setPromptSuggestions(defaultSuggestions);
    } finally {
      setIsLoadingPrompts(false);
    }
  };

  const value = {
    activeItem,
    setActiveItem,
    chatHistory,
    addChat,
    deleteChat,
    renameChat,
    promptSuggestions,
    isLoadingPrompts,
    fetchPromptSuggestions,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export { ChatContext, ChatProvider };
