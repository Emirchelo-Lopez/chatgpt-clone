// src/pages/ChatPage/ChatPageMinimal.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useChat from "../../hooks/useChat";
import Sidebar from "../../components/ui/Sidebar/Sidebar";

const ChatPageMinimal = () => {
  const { chatId } = useParams();

  // ✅ ALWAYS call hooks first, unconditionally
  const chatContext = useChat();
  const [contextError, setContextError] = useState(null);

  console.log("ChatPageMinimal rendering with chatId:", chatId);

  // ✅ Use useEffect to handle context validation
  useEffect(() => {
    if (!chatContext) {
      console.error("ChatPageMinimal: Chat context is null");
      setContextError("Chat context not available");
    } else {
      console.log("ChatPageMinimal: useChat successful", !!chatContext);
      setContextError(null);
    }
  }, [chatContext]);

  // ✅ Destructure with defaults AFTER calling the hook
  const {
    chatHistory = [],
    currentMessages = [],
    loadMessages,
    addMessage,
    createNewChat,
    error,
  } = chatContext || {};

  // ✅ Now we can do conditional rendering
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

  return (
    <div className="chatgpt-clone">
      <Sidebar />
      <div style={{ padding: "20px" }}>
        <h1>Minimal Chat Page</h1>
        <p>
          <strong>Chat ID:</strong> {chatId}
        </p>
        <p>
          <strong>Chat History Length:</strong> {chatHistory.length}
        </p>
        <p>
          <strong>Current Messages Length:</strong> {currentMessages.length}
        </p>
        <p>
          <strong>Context Available:</strong> {chatContext ? "Yes" : "No"}
        </p>
        <p>
          <strong>Has loadMessages:</strong> {loadMessages ? "Yes" : "No"}
        </p>
        <p>
          <strong>Has addMessage:</strong> {addMessage ? "Yes" : "No"}
        </p>
        <p>
          <strong>Has createNewChat:</strong> {createNewChat ? "Yes" : "No"}
        </p>
        <p>
          <strong>Context Error:</strong> {error || "None"}
        </p>

        {/* Debug info */}
        <details style={{ marginTop: "20px" }}>
          <summary>Debug Info</summary>
          <pre
            style={{ background: "#f5f5f5", padding: "10px", fontSize: "12px" }}
          >
            {JSON.stringify(
              {
                chatId,
                contextAvailable: !!chatContext, // ✅ Keep this one since we want boolean in JSON
                chatHistoryCount: chatHistory.length,
                currentMessagesCount: currentMessages.length,
                functionsAvailable: {
                  loadMessages: !!loadMessages, // ✅ Keep these for boolean JSON values
                  addMessage: !!addMessage,
                  createNewChat: !!createNewChat,
                },
              },
              null,
              2
            )}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default ChatPageMinimal;
