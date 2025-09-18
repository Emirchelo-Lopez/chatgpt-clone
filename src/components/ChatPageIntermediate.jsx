// src/pages/ChatPage/ChatPageIntermediate.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import useChat from "../hooks/useChat";
import Sidebar from "./ui/Sidebar/Sidebar";
import ChatHeader from "./ui/ChatHeader/ChatHeader";

const ChatPageIntermediate = () => {
  const { chatId } = useParams();

  // ✅ Always call hooks first
  const chatContext = useChat();
  const [contextError, setContextError] = useState(null);

  console.log("ChatPageIntermediate rendering with chatId:", chatId);

  // ✅ Use useEffect to handle context validation
  useEffect(() => {
    if (!chatContext) {
      console.error("ChatPageIntermediate: Chat context is null");
      setContextError("Chat context not available");
    } else {
      console.log("ChatPageIntermediate: useChat successful");
      setContextError(null);
    }
  }, [chatContext]);

  // ✅ Destructure with defaults
  const {
    chatHistory = [],
    currentMessages = [],
    isLoadingMessages = false,
    loadMessages,
    addMessage,
    createNewChat,
    error,
    clearError,
  } = chatContext || {};

  // ✅ Find current chat
  const currentChat = useMemo(() => {
    return Array.isArray(chatHistory)
      ? chatHistory.find((chat) => chat?.id === chatId)
      : null;
  }, [chatHistory, chatId]);

  // ✅ Memoize safe messages
  const safeCurrentMessages = useMemo(() => {
    return Array.isArray(currentMessages) ? currentMessages : [];
  }, [currentMessages]);

  // ✅ Load messages when component mounts
  useEffect(() => {
    console.log("🔍 useEffect for loadMessages triggered");
    console.log("🔍 Conditions:", {
      chatId: !!chatId,
      currentChat: !!currentChat,
      loadMessages: !!loadMessages,
      contextError: !!contextError,
    });

    if (chatId && currentChat && loadMessages && !contextError) {
      console.log(
        "✅ All conditions met, calling loadMessages for chat:",
        chatId
      );

      loadMessages(chatId)
        .then((result) => {
          console.log("✅ loadMessages resolved successfully:", result);
          console.log("✅ Result type:", typeof result);
          console.log("✅ Is array:", Array.isArray(result));
          if (Array.isArray(result)) {
            console.log("✅ Messages loaded count:", result.length);
          }
        })
        .catch((error) => {
          console.error("❌ loadMessages rejected with error:", error);
          console.error("❌ Error details:", {
            message: error.message,
            stack: error.stack,
            name: error.name,
          });
        });
    } else {
      console.log("❌ Conditions not met for loadMessages");
      console.log("❌ Missing:", {
        chatId: !chatId ? "chatId" : null,
        currentChat: !currentChat ? "currentChat" : null,
        loadMessages: !loadMessages ? "loadMessages function" : null,
        contextError: contextError ? `contextError: ${contextError}` : null,
      });
    }
  }, [chatId, currentChat, loadMessages, contextError]);

  // ✅ Conditional rendering after hooks
  if (!chatId) {
    return (
      <div className="chatgpt-clone">
        <Sidebar />
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>Invalid Chat</h2>
          <p>No chat ID provided in the URL.</p>
        </div>
      </div>
    );
  }

  if (contextError) {
    return (
      <div className="chatgpt-clone">
        <Sidebar />
        <div style={{ padding: "20px" }}>
          <h2>Context Error</h2>
          <p>Error: {contextError}</p>
        </div>
      </div>
    );
  }

  if (!loadMessages || !addMessage || !createNewChat) {
    return (
      <div className="chatgpt-clone">
        <Sidebar />
        <div style={{ padding: "20px" }}>
          <h2>Loading Error</h2>
          <p>Required functions not available</p>
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
          <div
            style={{
              padding: "10px",
              margin: "10px",
              backgroundColor: "#fee",
              border: "1px solid #fcc",
              borderRadius: "4px",
            }}
          >
            ⚠️ {error}
            <button onClick={clearError} style={{ marginLeft: "10px" }}>
              ✕
            </button>
          </div>
        )}

        <div style={{ padding: "20px" }}>
          <h2>Intermediate Chat Page</h2>
          <p>
            <strong>Chat ID:</strong> {chatId}
          </p>
          <p>
            <strong>Chat Title:</strong> {currentChat?.title || "No title"}
          </p>
          <p>
            <strong>Loading Messages:</strong>{" "}
            {isLoadingMessages ? "Yes" : "No"}
          </p>
          <p>
            <strong>Messages Count:</strong> {safeCurrentMessages.length}
          </p>

          {/* Show messages if any */}
          {safeCurrentMessages.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h3>Messages:</h3>
              {safeCurrentMessages.map((message, index) => (
                <div
                  key={message.id || index}
                  style={{
                    padding: "10px",
                    margin: "5px 0",
                    backgroundColor:
                      message.role === "user" ? "#e3f2fd" : "#f3e5f5",
                    borderRadius: "8px",
                  }}
                >
                  <strong>{message.role === "user" ? "You" : "AI"}:</strong>
                  <p>{message.content}</p>
                  <small>Time: {message.timestamp}</small>
                </div>
              ))}
            </div>
          )}

          {isLoadingMessages && (
            <div style={{ marginTop: "20px" }}>Loading messages...</div>
          )}

          {/* Debug info */}
          <details style={{ marginTop: "20px" }}>
            <summary>Debug Info</summary>
            <pre
              style={{
                background: "#f5f5f5",
                padding: "10px",
                fontSize: "12px",
              }}
            >
              {JSON.stringify(
                {
                  chatId,
                  currentChatFound: !!currentChat,
                  currentChatTitle: currentChat?.title,
                  messagesCount: safeCurrentMessages.length,
                  isLoadingMessages,
                  error,
                },
                null,
                2
              )}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
};

export default ChatPageIntermediate;
