import { useState } from "react";
import ChatInput from "../../components/ui/ChatInput/ChatInput";
import ChatHeader from "../../components/ui/ChatHeader/ChatHeader";
import ChatMessage from "../../components/ui/ChatMessage/ChatMessage";
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import { generateResponse } from "../../api/gemini-ai"; // Import the function
import "./chat-page.scss";

export default function ChatPage() {
  // Use hardcoded chat history for the sidebar for now
  const chatHistoryForSidebar = [
    { id: 1, title: "React Best Practices", isActive: false },
    { id: 2, title: "SASS vs CSS Modules", isActive: true },
  ];

  // State for messages, input, and loading status
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (!userInput.trim()) return; // Don't send empty messages

    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: userInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Add user message to the chat and show loading state
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    const currentInput = userInput;
    setUserInput(""); // Clear the input field

    // Prepare history for the API call, mapping "assistant" to "model".
    const apiHistory = messages.map((msg) => ({
      // If the role is 'assistant', change it to 'model' for the API. Otherwise, keep it.
      role: msg.role === "assistant" ? "model" : msg.role,
      parts: [{ text: msg.content }],
    }));

    // Get AI response
    const botResponseContent = await generateResponse(currentInput, apiHistory);

    const botMessage = {
      id: messages.length + 2,
      role: "assistant",
      content: botResponseContent,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Add AI response to the chat and hide loading state
    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="chatgpt-clone">
      <Sidebar chatHistory={chatHistoryForSidebar} />
      <div className="main-content">
        <ChatHeader title="SASS vs CSS Modules" />
        <div className="chat-messages">
          <div className="chat-messages__container">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                name="Emir" // You can make this dynamic
                timestamp={message.timestamp}
                content={message.content}
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
              placeholder="Message ChatGPT"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onSend={handleSendMessage}
            />
            <p className="main-content__footer-text">
              ChatGPT can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
