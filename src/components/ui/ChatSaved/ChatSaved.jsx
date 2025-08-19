import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./chat-saved.scss";

const ChatSaved = ({ chat, isActive, onSelect, onDelete, onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);

  const handleRename = () => {
    if (title.trim()) {
      onRename(title.trim());
    } else {
      setTitle(chat.title); // Revert if the title is empty
    }
    setIsEditing(false);
  };

  const handleSelect = () => {
    if (!isEditing) {
      onSelect();
    }
  };

  return (
    <div
      onClick={handleSelect}
      className={`sidebar__chat-item ${
        isActive ? "sidebar__chat-item--active" : ""
      }`}
    >
      {isEditing ? (
        <Input
          type="text"
          value={title}
          className="sidebar__chat-item-input"
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleRename}
          onKeyPress={(e) => e.key === "Enter" && handleRename()}
          autoFocus
        />
      ) : (
        <span className="sidebar__chat-item-title">{chat.title}</span>
      )}
      <div className="sidebar__chat-item-actions">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          className="sidebar__chat-item-menu"
        >
          <Edit size={14} />
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="sidebar__chat-item-menu"
        >
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
  );
};

export default ChatSaved;
