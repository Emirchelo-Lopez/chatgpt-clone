import { X } from "lucide-react";
import "./chat-saved.scss";
import { useNavigate } from "react-router-dom";

const ChatSaved = ({ chat, isActive, onSelect }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onSelect();
    navigate("/chat");
  };

  return (
    <div
      onClick={handleClick}
      className={`sidebar__chat-item ${
        isActive ? "sidebar__chat-item--active" : ""
      }`}
    >
      <span className="sidebar__chat-item-title">{chat.title}</span>
      <button className="sidebar__chat-item-menu">
        <X size={14} />
      </button>
    </div>
  );
};

export default ChatSaved;
