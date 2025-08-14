import { X } from "lucide-react";
import "./chat-saved.scss";

const ChatSaved = ({ chat, isActive, onSelect }) => {
  return (
    <div
      onClick={onSelect}
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
