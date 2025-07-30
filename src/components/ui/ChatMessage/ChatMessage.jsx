import "./chat-message.scss";
import MessageAvatar from "../MessageAvatar/MessageAvatar";
import MessageContent from "../MessageContent/MessageContent";

const ChatMessage = ({ role, name, timestamp, content }) => {
  return (
    <div className={`message message--${role}`}>
      <MessageAvatar role={role} name={name} />
      <MessageContent role={role} timestamp={timestamp} content={content} />
    </div>
  );
};

export default ChatMessage;
