import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Settings, X } from "lucide-react";
import Button from "../Button/Button";
import ChatSaved from "../ChatSaved/ChatSaved";
import Profile from "../Profile/Profile";
import useAuth from "../../../hooks/useAuth";
import useChat from "../../../hooks/useChat";
import "./sidebar.scss";

const Sidebar = () => {
  const { user, userInfo, fetchUserInfo } = useAuth();
  const { activeItem, setActiveItem, chatHistory } = useChat();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // It's good practice to ensure there's a user before fetching
      fetchUserInfo();
    }
  }, [user, fetchUserInfo]);

  const handleItemSelect = (itemId, path) => {
    setActiveItem(itemId);
    navigate(path);
  };

  return (
    <div className="sidebar">
      {/* Header */}
      <div className="sidebar__header">
        <div className="sidebar__logo">
          <div className="sidebar__logo-icon">
            <span>⚡</span>
          </div>
        </div>
        <Button
          onClick={() => handleItemSelect("new-chat", "/start")}
          className="sidebar__new-chat-btn"
        >
          <Plus size={16} />
          <span>Start New Chat</span>
        </Button>
      </div>

      {/* Chat History */}
      <div className="sidebar__chat-history">
        <div className="sidebar__chat-history-header"></div>
        <div className="sidebar__chat-history-list">
          {chatHistory &&
            chatHistory.map((chat) => (
              <ChatSaved
                key={chat.id}
                chat={chat}
                isActive={activeItem === chat.id}
                onSelect={() => handleItemSelect(chat.id, "/chat")}
              />
            ))}
        </div>
      </div>

      {/* Navigation */}
      {/* <div className="sidebar__nav">
        <nav className="sidebar__nav-list">
          <Button onClick={() => navigate("/chat") className="sidebar__nav-item">
            <MessageSquare size={16} />
            <span>Chat History</span>
          </Button>
        </nav>
      </div> */}

      {/* Footer */}
      <div className="sidebar__footer">
        <Button
          onClick={() => handleItemSelect("settings", "/settings")}
          className={`sidebar__settings-btn ${
            activeItem === "settings" ? "sidebar__settings-btn--active" : ""
          }`}
        >
          <Settings size={16} />
          <span>Settings</span>
        </Button>

        <Profile
          name={userInfo?.first_name || user?.first_name || "User"}
          className="sidebar__profile-avatar"
        />
      </div>
    </div>
  );
};

export default Sidebar;
