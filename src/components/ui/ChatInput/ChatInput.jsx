import { Paperclip, Send, RotateCcw } from "lucide-react";
import Button from "../../ui/Button/Button";
import TextArea from "../../ui/TextArea/TextArea";
import "./chat-input.scss";

const ChatInput = ({ value, onChange, onSend, placeholder }) => {
  // Function to handle Enter key press for sending the message
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents adding a new line
      onSend();
    }
  };

  return (
    <div className="chat-input">
      <div className="chat-input__container">
        <TextArea
          placeholder={placeholder}
          className="chat-input__textarea"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <div className="chat-input__actions">
          <Button className="chat-input__action-btn">
            <Paperclip size={20} />
          </Button>
          <Button className="chat-input__action-btn">
            <RotateCcw size={20} />
          </Button>
          <Button
            className="chat-input__action-btn chat-input__action-btn--send"
            onClick={onSend}
            disabled={!value || !value.trim()} // Disable button if input is empty or only whitespace
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
