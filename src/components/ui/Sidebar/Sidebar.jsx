import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Settings, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Button from "../Button/Button";
import ChatSaved from "../ChatSaved/ChatSaved";
import Profile from "../Profile/Profile";
import useAuth from "../../../hooks/useAuth";
import useChat from "../../../hooks/useChat";
import "./sidebar.scss";

const Sidebar = () => {
  const { user, userInfo, fetchUserInfo } = useAuth();
  const { activeItem, setActiveItem, chatHistory, deleteChat, renameChat } =
    useChat();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  // Fetch the user info to render it on sidebar
  useEffect(() => {
    if (user) {
      // It's good practice to ensure there's a user before fetching
      fetchUserInfo();
    }
  }, [user, fetchUserInfo]);

  // Function to set item as active and redirects to the page
  const handleItemSelect = (itemId, path) => {
    setActiveItem(itemId);
    navigate(path);
  };

  // Function to: delete chat + redirect to home page
  const handleDeleteChat = (chatId) => {
    deleteChat(chatId);

    if (activeItem === chatId) {
      navigate("/start");
    }
  };

  // Flag function to expand/collapse sidebar
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="sidebar">
      <div className={`sidebar isSidebarCollapsed ? "sidebar--collapsed" : ""`}>
        {/* Header */}
        <div className="sidebar__header">
          <div className="sidebar__header-content">
            <div className="sidebar__logo">
              <div className="sidebar__logo-icon">
                <span>⚡</span>
              </div>
              {!isSidebarCollapsed && (
                <span className="sidebar__logo-text">Geminisito</span>
              )}
            </div>
            <button className="sidebar__collapse-btn" onClick={toggleSidebar}>
              {isSidebarCollapsed ? (
                <PanelLeftOpen size={16} />
              ) : (
                <PanelLeftClose size={16} />
              )}
            </button>
          </div>
          {!isSidebarCollapsed && (
            <button className="sidebar__new-chat-btn">
              <Plus size={16} />
              <span>Start New Chat</span>
            </button>
          )}
        </div>
        {/* Chat History */}
        {!isSidebarCollapsed && (
          <div className="sidebar__chat-history">
            <div className="sidebar__chat-history-header"></div>
            <div className="sidebar__chat-history-list">
              {chatHistory &&
                chatHistory.map((chat) => (
                  <ChatSaved
                    key={chat.id}
                    chat={chat}
                    isActive={activeItem === chat.id}
                    onSelect={() =>
                      handleItemSelect(chat.id, `/chat/${chat.id}`)
                    }
                    onDelete={() => handleDeleteChat(chat.id)}
                    onRename={(newTitle) => renameChat(chat.id, newTitle)}
                  />
                ))}
            </div>
          </div>
        )}
        {/* Footer */}
        <div className="sidebar__footer">
          <Button
            onClick={() => handleItemSelect("settings", "/settings")}
            className={`sidebar__settings-btn ${
              activeItem === "settings" ? "sidebar__settings-btn--active" : ""
            }`}
            title={isSidebarCollapsed ? "Settings" : ""}
          >
            <Settings size={16} />
            {!isSidebarCollapsed && <span>Settings</span>}
          </Button>
          {!isSidebarCollapsed && (
            <Profile
              name={userInfo?.first_name || user?.first_name || "User"}
              className="sidebar__profile-avatar"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
