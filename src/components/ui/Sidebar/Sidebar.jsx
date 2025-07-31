import { Plus, Settings } from "lucide-react";
import Button from "../Button/Button";
import "./sidebar.scss";
import Profile from "../Profile/Profile";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ chatHistory }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
          onClick={() => navigate("/chat")}
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
              <div
                key={chat.id}
                className={`sidebar__chat-item ${
                  chat.isActive ? "sidebar__chat-item--active" : ""
                }`}
              >
                <span className="sidebar__chat-item-title">{chat.title}</span>
              </div>
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
        <Button className="sidebar__settings-btn">
          <Settings size={16} />
          <span>Settings</span>
        </Button>

        <Profile
          name={user.first_name || "User"}
          className="sidebar__profile-avatar"
        />
      </div>
    </div>
  );
};

export default Sidebar;
