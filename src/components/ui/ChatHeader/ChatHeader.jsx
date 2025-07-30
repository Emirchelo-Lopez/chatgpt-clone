import "./chat-header.scss";

const ChatHeader = ({ title }) => {
  return (
    <div className="chat-header">
      <div className="chat-header__info">
        <h1 className="chat-header__title">{title}</h1>
        <span className="chat-header__model">ChatGPT 4</span>
      </div>
    </div>
  );
};

export default ChatHeader;
