import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ChatInput from "../../components/ui/ChatInput/ChatInput";
import ChatHeader from "../../components/ui/ChatHeader/ChatHeader";
import ChatMessage from "../../components/ui/ChatMessage/ChatMessage";
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import { generateResponseService } from "../../api/geminiService";
import { getMeUserService } from "../../api/userService";
import useChat from "../../hooks/useChat";
import "./chat-page.scss";

export default function ChatPage() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    chatHistory,
    currentMessages,
    isLoadingMessages,
    loadMessages,
    addMessage,
    addChat,
    createNewChat,
    error,
    clearError,
  } = useChat();

  const promptSentRef = useRef(false);
  const [userInput, setUserInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Find current chat
  const currentChat = chatHistory.find((chat) => chat.id === chatId);

  // Load messages when chat changes
  useEffect(() => {
    if (chatId && currentChat) {
      loadMessages(chatId);
    }
  }, [chatId, currentChat, loadMessages]);

  // Handle first message from navigation state
  useEffect(() => {
    const firstMessage = location.state?.firstMessage;

    if (
      firstMessage &&
      currentMessages.length === 0 &&
      !promptSentRef.current
    ) {
      handleSendMessage(firstMessage);
      promptSentRef.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [
    location.state,
    currentMessages.length,
    navigate,
    handleSendMessage,
    location.pathname,
  ]);

  // Load user data
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

  // Clear error when component mounts
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [error, clearError]);

  // handleSendMessage outside useEffect dependencies
  const handleSendMessage = useCallback(
    async (contentToSend) => {
      const messageText = contentToSend || userInput;
      if (!messageText.trim()) return;

      setIsLoading(true);
      if (!contentToSend) {
        setUserInput("");
      }

      try {
        let conversationId = chatId;

        if (!currentChat) {
          const newChat = await addChat(
            messageText.length > 25
              ? `${messageText.substring(0, 25)}...`
              : messageText
          );
          conversationId = newChat.id;
          navigate(`/chat/${conversationId}`, { replace: true });
        }

        await addMessage(conversationId, messageText, "user");

        const apiHistory = [
          ...currentMessages,
          {
            role: "user",
            content: messageText,
          },
        ].map((msg) => ({
          role: msg.role === "assistant" ? "model" : msg.role,
          parts: [{ text: msg.content }],
        }));

        const botResponseContent = await generateResponseService(
          messageText,
          apiHistory
        );

        await addMessage(conversationId, botResponseContent, "assistant");
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      userInput,
      currentMessages,
      addMessage,
      chatId,
      currentChat,
      addChat,
      navigate,
    ]
  );

  //   const handleNewChat = () => {
  //     promptSentRef.current = false;
  //     createNewChat(navigate);
  //   };

  // Show loading state while messages are loading
  if (isLoadingMessages && currentMessages.length === 0) {
    return (
      <div className="chatgpt-clone">
        <Sidebar />
        <div className="main-content">
          <ChatHeader title="Loading..." />
          <div className="chat-messages">
            <div className="chat-messages__container">
              <div>Loading messages...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chatgpt-clone">
      <Sidebar />
      <div className="main-content">
        <ChatHeader title={currentChat?.title || "New Chat"} />

        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
            <button onClick={clearError}>✕</button>
          </div>
        )}

        <div className="chat-messages">
          <div className="chat-messages__container">
            {currentMessages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                name={userData?.first_name}
                timestamp={message.timestamp}
                content={message.content}
                onNewChat={() => createNewChat(navigate)}
                navigate={navigate}
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
              onNewChat={() => createNewChat(navigate)}
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
