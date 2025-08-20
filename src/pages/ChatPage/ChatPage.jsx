// src/pages/ChatPage/ChatPage.jsx

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ChatInput from "../../components/ui/ChatInput/ChatInput";
import ChatHeader from "../../components/ui/ChatHeader/ChatHeader";
import ChatMessage from "../../components/ui/ChatMessage/ChatMessage";
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import { generateResponse } from "../../api/gemini-ai";
import { getMeUserService } from "../../api/userService";
import useChat from "../../hooks/useChat";
import "./chat-page.scss";

export default function ChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addChat, chatHistory } = useChat();

  // We use useRef as a "Has been sent" flag so don't duplicate AI responses
  const promptSentRef = useRef(false);

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Se busca el chat actual en el historial
  const currentChat = chatHistory.find((chat) => chat.id === chatId);

  useEffect(() => {
    const savedMessages = localStorage.getItem(`chatMessages_${chatId}`);
    setMessages(savedMessages ? JSON.parse(savedMessages) : []);
  }, [chatId]);

  useEffect(() => {
    localStorage.setItem(`chatMessages_${chatId}`, JSON.stringify(messages));
  }, [messages, chatId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getMeUserService();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);

  const handleSendMessage = useCallback(
    async (contentToSend) => {
      const messageText = contentToSend || userInput;
      if (!messageText.trim()) return;

      // 1. Inicia la carga y limpia el input.
      setIsLoading(true);
      if (!contentToSend) {
        setUserInput("");
      }

      const userMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: messageText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // 2. Prepara el historial para la API con el nuevo mensaje.
      const apiHistory = [...messages, userMessage].map((msg) => ({
        role: msg.role === "assistant" ? "model" : msg.role,
        parts: [{ text: msg.content }],
      }));

      // Crea un nuevo chat si es el primer mensaje.
      if (!currentChat) {
        const newChatTitle =
          messageText.length > 25
            ? `${messageText.substring(0, 25)}...`
            : messageText;
        addChat({ id: chatId, title: newChatTitle, isActive: true });
      }

      // 3. Llama a la API.
      const botResponseContent = await generateResponse(
        messageText,
        apiHistory
      );

      const botMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: botResponseContent,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // 4. Actualiza el estado UNA SOLA VEZ con ambos mensajes.
      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
      setIsLoading(false);
    },
    [userInput, messages, addChat, chatId, currentChat]
  );

  useEffect(() => {
    const firstMessage = location.state?.firstMessage;
    if (firstMessage && messages.length === 0 && !promptSentRef.current) {
      handleSendMessage(firstMessage);
      promptSentRef.current = true; // Establish flag to true after sending
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [
    location.state,
    location.pathname,
    messages.length,
    handleSendMessage,
    navigate,
  ]);

  const handleNewChat = () => {
    // Reestablish flag to create new chat
    promptSentRef.current = false;
    navigate(`/chat/chat-${Date.now()}`);
  };

  return (
    <div className="chatgpt-clone">
      <Sidebar />
      <div className="main-content">
        <ChatHeader title={currentChat?.title || "New Chat"} />
        <div className="chat-messages">
          <div className="chat-messages__container">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                name={userData?.first_name}
                timestamp={message.timestamp}
                content={message.content}
                onNewChat={handleNewChat}
              />
            ))}
            {isLoading && (
              <ChatMessage role="assistant" name="⚡" content="Thinking..." />
            )}
          </div>
        </div>
        <div className="main-content__chat-input-section">
          <div className="main-content__chat-input-container">
            <ChatInput
              placeholder="Message Geminisito"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onSend={() => handleSendMessage()}
              onNewChat={handleNewChat}
            />
            <p className="main-content__footer-text">
              Geminisito can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
