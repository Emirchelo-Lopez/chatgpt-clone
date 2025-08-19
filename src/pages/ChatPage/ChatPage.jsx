// src/pages/ChatPage/ChatPage.jsx

import { useEffect, useState, useCallback } from "react";
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
  // Pending prompt to send extracted from prompt suggestion card
  //   const { pendingPrompt, setPendingPrompt } = useChat();

  const { chatId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addChat, chatHistory } = useChat();

  // a ref to act as our "has been sent" flag
  //   const promptSentRef = useRef(false);

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentChat = chatHistory.find((chat) => chat.id === chatId);

  // Effect to load messages or reset when the chat ID changes
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chatMessages_${chatId}`);
    setMessages(savedMessages ? JSON.parse(savedMessages) : []);
  }, [chatId]);

  // Effect to save messages whenever they change
  useEffect(() => {
    localStorage.setItem(`chatMessages_${chatId}`, JSON.stringify(messages));
  }, [messages, chatId]);

  // Effect to fetch user data once
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

  // Function to send a message and receive an API response
  const handleSendMessage = useCallback(
    async (contentToSend) => {
      const messageText = contentToSend || userInput;
      if (!messageText.trim()) return;

      const userMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: messageText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsLoading(true);
      if (!contentToSend) {
        setUserInput("");
      }

      if (messages.length === 0) {
        const newChatTitle =
          messageText.length > 25
            ? `${messageText.substring(0, 25)}...`
            : messageText;
        addChat({ id: chatId, title: newChatTitle, isActive: true });
      }

      const apiHistory = updatedMessages.map((msg) => ({
        role: msg.role === "assistant" ? "model" : msg.role,
        parts: [{ text: msg.content }],
      }));

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

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    },
    [userInput, messages, addChat, chatId]
  );

  // Effect to handle the first message passed from HomePage
  useEffect(() => {
    const firstMessage = location.state?.firstMessage;
    if (firstMessage && messages.length === 0) {
      handleSendMessage(firstMessage);
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
