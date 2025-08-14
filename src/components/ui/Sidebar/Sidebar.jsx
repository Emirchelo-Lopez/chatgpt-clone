import { useState, useEffect } from "react";
import { Plus, Settings, X } from "lucide-react";
import Button from "../Button/Button";
import "./sidebar.scss";
import Profile from "../Profile/Profile";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getMeUserService } from "../../../api/userService";
import ChatSaved from "../ChatSaved/ChatSaved";

const Sidebar = ({ chatHistory }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const data = await getMeUserService();
          setUserData(data);
        } catch (error) {
          console.error("Failed to fetch user data for sidebar", error);
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleChatSelect = (chatId) => {
    setActiveChatId(chatId === activeChatId ? null : chatId);
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
          onClick={() => navigate("/start")}
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
                isActive={activeChatId === chat.id}
                onSelect={() => handleChatSelect(chat.id)}
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
          onClick={() => navigate("/settings")}
          className="sidebar__settings-btn"
        >
          <Settings size={16} />
          <span>Settings</span>
        </Button>

        <Profile
          name={userData?.first_name || user?.first_name || "User"}
          className="sidebar__profile-avatar"
        />
      </div>
    </div>
  );
};

export default Sidebar;
