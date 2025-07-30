import "./chat-message.scss";
import MessageAvatar from "../MessageAvatar/MessageAvatar";
import MessageContent from "../MessageContent/MessageContent";

const ChatMessage = ({ id, role, name, timestamp, content }) => {
  return (
    <div key={id} className={`message message--${role}`}>
      <MessageAvatar role={role} name={name} />
      <MessageContent role={role} timestamp={timestamp} content={content} />
    </div>
  );
};

export default ChatMessage;
