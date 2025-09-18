// src/pages/ChatPage/ChatPage.jsx
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
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

  // ✅ ALWAYS call hooks first (unconditionally)
  const promptSentRef = useRef(false);
  const [userInput, setUserInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initError, setInitError] = useState(null);

  // ✅ Always call useChat unconditionally
  const chatContext = useChat();

  // ✅ Check if chatContext is valid and set error state if needed
  useEffect(() => {
    if (!chatContext) {
      console.error("ChatPage: Chat context is null or undefined");
      setInitError("Unable to access chat context");
    } else {
      // Clear any previous init errors if context is now available
      setInitError(null);
    }
  }, [chatContext]);

  // ✅ Destructure with safety defaults
  const {
    chatHistory = [],
    currentMessages = [],
    isLoadingMessages = false,
    loadMessages,
    addMessage,
    addChat,
    createNewChat,
    error,
    clearError,
  } = chatContext || {};

  // ✅ Memoize currentChat
  const currentChat = useMemo(() => {
    return Array.isArray(chatHistory)
      ? chatHistory.find((chat) => chat?.id === chatId)
      : null;
  }, [chatHistory, chatId]);

  // ✅ Memoize safeCurrentMessages
  const safeCurrentMessages = useMemo(() => {
    return Array.isArray(currentMessages) ? currentMessages : [];
  }, [currentMessages]);

  // ✅ ALL useEffect hooks called unconditionally
  // Load messages when chat changes
  useEffect(() => {
    if (chatId && currentChat && loadMessages && !initError) {
      console.log("ChatPage: Loading messages for chat:", chatId);
      loadMessages(chatId).catch((error) => {
        console.error("ChatPage: Error loading messages:", error);
      });
    }
  }, [chatId, currentChat, loadMessages, initError]);

  // Handle first message from navigation state
  useEffect(() => {
    if (initError) return; // Skip if there's an initialization error

    const firstMessage = location.state?.firstMessage;

    if (
      firstMessage &&
      safeCurrentMessages.length === 0 &&
      !promptSentRef.current
    ) {
      console.log("ChatPage: Sending first message from navigation state");
      handleSendMessage(firstMessage);
      promptSentRef.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [
    location.state,
    safeCurrentMessages.length,
    navigate,
    handleSendMessage,
    location.pathname,
    initError,
  ]);

  // Load user data with error handling
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getMeUserService();
        setUserData(data);
      } catch (error) {
        console.error("ChatPage: Error fetching user data", error);
      }
    };

    if (!initError) {
      fetchUserData();
    }
  }, [initError]);

  // Clear error when component mounts
  useEffect(() => {
    if (error && clearError && !initError) {
      clearError();
    }
  }, [error, clearError, initError]);

  // ✅ Define handleSendMessage
  const handleSendMessage = useCallback(
    async (contentToSend) => {
      if (initError || !addMessage || !addChat) {
        console.error("ChatPage: Cannot send message due to missing functions");
        return;
      }

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
          ...safeCurrentMessages,
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
        console.error("ChatPage: Error sending message:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      userInput,
      safeCurrentMessages,
      addMessage,
      chatId,
      currentChat,
      addChat,
      navigate,
      initError,
    ]
  );

  // ✅ Conditional rendering AFTER all hooks

  // Check for missing chatId
  if (!chatId) {
    console.error("ChatPage: No chatId provided in URL params");
    return (
      <div className="chatgpt-clone">
        <Sidebar />
        <div className="main-content">
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Invalid Chat</h2>
            <p>No chat ID provided in the URL.</p>
            <button onClick={() => navigate("/start")}>Go to Home</button>
          </div>
        </div>
      </div>
    );
  }

  // Check for initialization errors
  if (initError) {
    return (
      <div className="chatgpt-clone">
        <Sidebar />
        <div className="main-content">
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Context Error</h2>
            <p>{initError}. Please refresh the page.</p>
            <button onClick={() => window.location.reload()}>
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check for missing required functions
  if (!loadMessages || !addMessage || !addChat || !createNewChat) {
    console.error("ChatPage: Required chat functions not available");
    return (
      <div className="chatgpt-clone">
        <Sidebar />
        <div className="main-content">
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Loading Error</h2>
            <p>Chat functions are not available. Please try again.</p>
            <button onClick={() => navigate("/start")}>Go to Home</button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state while messages are loading
  if (isLoadingMessages && safeCurrentMessages.length === 0) {
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

  // ✅ Normal render when everything is okay
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
            {safeCurrentMessages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                name={userData?.first_name}
                timestamp={message.timestamp}
                content={message.content}
                onNewChat={() => createNewChat && createNewChat(navigate)}
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
              onNewChat={() => createNewChat && createNewChat(navigate)}
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
