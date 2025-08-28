import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Settings,
  PanelLeftOpen,
  PanelLeftClose,
  Menu,
  X,
} from "lucide-react";
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
  const navigate = useNavigate();

  // State to toggle the sidebar on/off
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const savedState = localStorage.getItem("sidebarCollapsed");
    return savedState ? JSON.parse(savedState) : false;
  });

  // Mobile sidebar state (overlay mode)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Detect if we're on mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // Close mobile sidebar when switching to desktop
      if (!mobile) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Persist collapsed state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "sidebarCollapsed",
      JSON.stringify(isSidebarCollapsed)
    );
  }, [isSidebarCollapsed]);

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

    // Close mobile sidebar after navigation
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
  };

  // Function to: delete chat + redirect to home page
  const handleDeleteChat = (chatId) => {
    deleteChat(chatId);

    if (activeItem === chatId) {
      navigate("/start");
    }
  };

  // Function to expand or collapse sidebar (desktop only)
  const toggleSidebar = () => {
    if (!isMobile) {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  // Function to toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <Button
          className="mobile-menu-btn"
          onClick={toggleMobileSidebar}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </Button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileSidebarOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      <div
        className={`sidebar ${
          isSidebarCollapsed && !isMobile ? "sidebar--collapsed" : ""
        } ${isMobile ? "sidebar--mobile" : ""} ${
          isMobile && isMobileSidebarOpen ? "sidebar--mobile-open" : ""
        }`}
      >
        {/* Header */}
        <div className="sidebar__header">
          <div className="sidebar__header-content">
            <div className="sidebar__logo">
              <div className="sidebar__logo-icon">
                <span>⚡</span>
              </div>
              {(!isSidebarCollapsed || isMobile) && (
                <span className="sidebar__logo-text">Geminisito</span>
              )}
            </div>
            {/* Desktop collapse button */}
            {!isMobile && (
              <Button
                className="sidebar__collapse-btn"
                onClick={toggleSidebar}
                title={
                  isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                }
              >
                {isSidebarCollapsed ? (
                  <PanelLeftOpen size={18} />
                ) : (
                  <PanelLeftClose size={18} />
                )}
              </Button>
            )}
            {/* Mobile close button */}
            {isMobile && (
              <Button
                className="sidebar__mobile-close-btn"
                onClick={toggleMobileSidebar}
                aria-label="Close menu"
              >
                <X size={18} />
              </Button>
            )}
          </div>
          <Button
            className={`sidebar__new-chat-btn ${
              isSidebarCollapsed && !isMobile
                ? "sidebar__new-chat-btn--collapsed"
                : ""
            }`}
            onClick={() => handleItemSelect("new-chat", "/start")}
            title={isSidebarCollapsed && !isMobile ? "Start New Chat" : ""}
          >
            <Plus size={16} />
            {(!isSidebarCollapsed || isMobile) && <span>Start New Chat</span>}
          </Button>
        </div>

        {/* Chat History */}
        {(!isSidebarCollapsed || isMobile) && chatHistory.length > 0 && (
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
            title={isSidebarCollapsed && !isMobile ? "Settings" : ""}
          >
            <Settings size={16} />
            {(!isSidebarCollapsed || isMobile) && <span>Settings</span>}
          </Button>

          <Profile
            name={userInfo?.first_name || user?.first_name || "User"}
            className="sidebar__profile-avatar"
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
