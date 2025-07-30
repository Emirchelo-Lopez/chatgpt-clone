import { MessageSquare, Plus, Settings, User, LogOut } from "lucide-react";
import Button from "../Button/Button";
import "./sidebar.scss";
import Profile from "../Profile/Profile";

const Sidebar = ({ chatHistory }) => {
  return (
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
          <Button className="sidebar__nav-item">
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

        <Profile name="Emir" className="sidebar__profile-avatar" />
      </div>
    </div>
  );
};

export default Sidebar;
