import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PromptCard from "../../components/ui/PromptCard/PromptCard";
import ChatInput from "../../components/ui/ChatInput/ChatInput";
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import useChat from "../../hooks/useChat";
import { defaultSuggestions } from "../../data/defaultPrompts";
import "./home-page.scss";

const HomePage = () => {
  // Get all needed functions from useChat hook
  const {
    promptSuggestions,
    isLoadingPrompts,
    fetchPromptSuggestions,
    setActiveItem,
    createNewChat, // Make sure this is included
    error,
    clearError,
  } = useChat();

  // State to handle the input field's value
  const [userInput, setUserInput] = useState("");

  // Navigation initialized
  const navigate = useNavigate();

  useEffect(() => {
    fetchPromptSuggestions();
  }, [fetchPromptSuggestions]);

  // Clear any existing errors when component mounts
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [error, clearError]);

  // When sending the message from home page
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    try {
      // createNewChat now returns a promise, so we await it
      await createNewChat(navigate, userInput);
      setUserInput(""); // Clear input after successful creation
    } catch (error) {
      console.error("Failed to create new chat:", error);
      // Fallback: create a temporary chat ID and navigate
      const tempChatId = `chat-${Date.now()}`;
      setActiveItem(tempChatId);
      navigate(`/chat/${tempChatId}`, { state: { firstMessage: userInput } });
    }
  };

  // Handle prompt card clicks
  const handlePromptClick = (promptTitle) => {
    setUserInput(promptTitle);
  };

  // If prompt suggestions fetched correctly will be shown, otherwise, default prompts will be rendered to avoid loading empty page
  const suggestionsToShow =
    isLoadingPrompts && promptSuggestions.length === 0
      ? defaultSuggestions
      : promptSuggestions;

  return (
    <div className="chatgpt-clone">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Error Banner */}
        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
            <button onClick={clearError}>✕</button>
          </div>
        )}

        {/* Welcome Section */}
        <div className="main-content__welcome-section">
          <div className="main-content__welcome-container">
            {/* Welcome Message */}
            <h1 className="main-content__welcome-title">Hey there 👋</h1>
            <h2 className="main-content__welcome-subtitle">
              What can I help with?
            </h2>

            {/* Description */}
            <p className="main-content__description">
              I handcrafted these prompts just for you! Premium, top-shelf
              stuff! Use them wisely or recklessly. No judgment! 😊
            </p>

            {/* Prompt Suggestions Grid */}
            <div className="main-content__prompts-grid">
              {suggestionsToShow.slice(0, 4).map((prompt, index) => (
                <PromptCard
                  key={index}
                  icon={prompt.icon}
                  title={prompt.title}
                  onClick={() => handlePromptClick(prompt.title)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="main-content__chat-input-section">
          <div className="main-content__chat-input-container">
            <ChatInput
              placeholder="Message Geminisito"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onSend={handleSendMessage}
            />
            <p className="main-content__footer-text">
              Geminisito can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
