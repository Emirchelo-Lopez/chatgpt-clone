import {
  Plus,
  Search,
  Home,
  MessageSquare,
  Settings,
  Sparkles,
  Mail,
  FileText,
  Share2,
  Paperclip,
  RotateCcw,
  Send,
} from "lucide-react";
import TextArea from "../../components/ui/TextArea/TextArea";
import Button from "../../components/ui/Button/Button";
import PromptCard from "../../components/ui/PromptCard/PromptCard";
import ChatInput from "../../components/ui/ChatInput/ChatInput";

const HomePage = () => {
  const promptSuggestions = [
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

  return (
    <div className="chatgpt-clone">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Header */}
        <div className="sidebar__header">
          <div className="sidebar__logo">
            <div className="sidebar__logo-icon">
              <span>⚡</span>
            </div>
          </div>
          <Button className="sidebar__new-chat-btn">
            <Plus size={16} />
            <span>Start New Chat</span>
          </Button>
        </div>

        {/* Navigation */}
        <div className="sidebar__nav">
          <nav className="sidebar__nav-list">
            <Button className="sidebar__nav-item">
              <Search size={16} />
              <span>Search</span>
            </Button>
            <Button className="sidebar__nav-item sidebar__nav-item--active">
              <Home size={16} />
              <span>Home</span>
            </Button>
            <Button className="sidebar__nav-item">
              <MessageSquare size={16} />
              <span>Chat History</span>
            </Button>
          </nav>
        </div>

        {/* Footer */}
        <div className="sidebar__footer">
          <Button className="sidebar__settings-btn">
            <Settings size={16} />
            <span>Settings</span>
          </Button>

          <div className="sidebar__profile">
            <div className="sidebar__profile-avatar">
              <span>V</span>
            </div>
            <span className="sidebar__profile-name">Vamshi</span>
          </div>
        </div>
      </div>

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
              {promptSuggestions.map((prompt, index) => (
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
            <ChatInput placeholder="Message ChatGPT" />
            <p className="main-content__footer-text">
              ChatGPT can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
