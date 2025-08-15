import { createContext, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [activeChatId, setActiveChatId] = useState(null);

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

  const value = {
    activeChatId,
    setActiveChatId,
    chatHistory,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export { ChatContext, ChatProvider };
