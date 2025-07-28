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
          {/* <button className="sidebar__new-chat-btn">
            <Plus size={16} />
            <span>Start New Chat</span>
          </button> */}
        </div>

        {/* Navigation */}
        <div className="sidebar__nav">
          <nav className="sidebar__nav-list">
            <button className="sidebar__nav-item">
              <Search size={16} />
              <span>Search</span>
            </button>
            <button className="sidebar__nav-item sidebar__nav-item--active">
              <Home size={16} />
              <span>Home</span>
            </button>
            <button className="sidebar__nav-item">
              <MessageSquare size={16} />
              <span>Chat History</span>
            </button>
          </nav>
        </div>

        {/* Footer */}
        <div className="sidebar__footer">
          <button className="sidebar__settings-btn">
            <Settings size={16} />
            <span>Settings</span>
          </button>

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
                <div key={index} className="prompt-card">
                  <div className="prompt-card__content">
                    {prompt.icon}
                    <p className="prompt-card__text">{prompt.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="main-content__chat-input-section">
          <div className="main-content__chat-input-container">
            <div className="chat-input">
              <div className="chat-input__container">
                <TextArea
                  placeholder="Message ChatGPT"
                  className="chat-input__textarea"
                />
                <div className="chat-input__actions">
                  <button className="chat-input__action-btn">
                    <Paperclip size={20} />
                  </button>
                  <button className="chat-input__action-btn">
                    <RotateCcw size={20} />
                  </button>
                  <button className="chat-input__action-btn chat-input__action-btn--send">
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>

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
