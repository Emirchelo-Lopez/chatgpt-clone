import { useEffect, useState } from "react";
import ChatInput from "../../components/ui/ChatInput/ChatInput";
import ChatHeader from "../../components/ui/ChatHeader/ChatHeader";
import ChatMessage from "../../components/ui/ChatMessage/ChatMessage";
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import { generateResponse } from "../../api/gemini-ai";
import { getMeUserService } from "../../api/userService";
import "./chat-page.scss";

export default function ChatPage() {
  // Use hardcoded chat history for the sidebar for now
  //   const chatHistoryForSidebar = [
  //     { id: 1, title: "React Best Practices", isActive: false },
  //     { id: 2, title: "SASS vs CSS Modules", isActive: true },
  //   ];

  // State for messages, input, and loading status
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [userInput, setUserInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getMeUserService();
        setUserData(data);
      } catch (error) {
        console.error("Error at fetching user data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (!userInput.trim()) return; // Don't send empty messages

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Add user message to the chat and show loading state
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    const currentInput = userInput;
    setUserInput(""); // Clear the input field

    // Prepare history for the API call, mapping "assistant" to "model".
    const apiHistory = updatedMessages.map((msg) => ({
      // If the role is 'assistant', change it to 'model' for the API. Otherwise, keep it.
      role: msg.role === "assistant" ? "model" : msg.role,
      parts: [{ text: msg.content }],
    }));

    // Get AI response
    const botResponseContent = await generateResponse(currentInput, apiHistory);

    const botMessage = {
      id: `bot-${Date.now()}`,
      role: "assistant",
      content: botResponseContent,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Add AI response to the chat and hide loading state
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setIsLoading(false);
  };

  const handleNewChat = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  return (
    <div className="chatgpt-clone">
      <Sidebar />
      <div className="main-content">
        <ChatHeader title="New Chat" />
        <div className="chat-messages">
          <div className="chat-messages__container">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                name={userData?.first_name} // You can make this dynamic
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
              placeholder="Message ChatGPT"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onSend={handleSendMessage}
              onNewChat={handleNewChat}
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
