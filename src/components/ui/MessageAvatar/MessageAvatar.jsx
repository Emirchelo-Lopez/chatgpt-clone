import "./message-avatar.scss";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";

const MessageAvatar = ({ role, name }) => {
  const isUser = role === "user";

  return (
    <div className="message__avatar">
      {isUser ? (
        <ProfileAvatar name={name} className="message__avatar-user" />
      ) : (
        <ProfileAvatar name="⚡" className="message__avatar-ai" />
      )}
    </div>
  );
};

export default MessageAvatar;
