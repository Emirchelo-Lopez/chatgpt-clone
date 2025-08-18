import { Sparkles, Mail, FileText, Share2 } from "lucide-react";
import { useEffect } from "react";
import PromptCard from "../../components/ui/PromptCard/PromptCard";
import ChatInput from "../../components/ui/ChatInput/ChatInput";
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import useChat from "../../hooks/useChat";
import "./home-page.scss";

const HomePage = () => {
  const { promptSuggestions, isLoadingPrompts, fetchPromptSuggestions } =
    useChat();

  useEffect(() => {
    fetchPromptSuggestions();
  }, [fetchPromptSuggestions]);

  const defaultSuggestions = [
    {
      icon: <Sparkles className="prompt-card__icon" />,
      title: "Create a step-by-step plan for launching a new product",
    },
    {
      icon: <Mail className="prompt-card__icon" />,
      title: "Write a polite email to decline an invitation to a Webinar",
    },
    {
      icon: <FileText className="prompt-card__icon" />,
      title: "Summarize this blog post in a few key points",
    },
    {
      icon: <Share2 className="prompt-card__icon" />,
      title: "Explain blockchain in simple terms, assume I am a 5 YO",
    },
  ];

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
                />
              ))}
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="main-content__chat-input-section">
          <div className="main-content__chat-input-container">
            <ChatInput placeholder="Message Geminisito" />
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
