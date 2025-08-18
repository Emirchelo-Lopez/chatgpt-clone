import { createContext, useState } from "react";
import { generateResponse } from "../api/gemini-ai";
import { Sparkles, Mail, FileText, Share2 } from "lucide-react";
import { defaultSuggestions } from "../data/defaultPrompts";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [promptSuggestions, setPromptSuggestions] = useState([]);
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(true);

  const chatHistory = [
    {
      id: 1,
      title: "React Best Practices",
      isActive: false,
    },
    {
      id: 2,
      title: "SASS vs CSS Modules",
      isActive: true,
    },
    {
      id: 3,
      title: "JavaScript Async/Await",
      isActive: false,
    },
    {
      id: 4,
      title: "Node.js Performance Tips",
      isActive: false,
    },
  ];

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
    promptSuggestions,
    isLoadingPrompts,
    fetchPromptSuggestions,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export { ChatContext, ChatProvider };
