import "./message-content.scss";
import Button from "../Button/Button";
import { Copy, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";

const MessageContent = ({ role, timestamp, content, onNewChat }) => {
  return (
    <div className="message__content">
      <div className="message__header">
        <span className="message__sender">
          {role === "user" ? "You" : "ChatGPT"}
        </span>
        <span className="message__timestamp">{timestamp}</span>
      </div>
      <div className="message__text">
        <ReactMarkdown
          components={{
            // Custom styling for code blocks
            code: ({ inline, className, children, ...props }) => {
              return !inline ? (
                <pre className="message__code-block">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className="message__inline-code" {...props}>
                  {children}
                </code>
              );
            },
            // Custom styling for paragraphs
            p: ({ children }) => (
              <p className="message__paragraph">{children}</p>
            ),
            // Custom styling for headings
            h1: ({ children }) => (
              <h1 className="message__heading">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="message__heading">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="message__heading">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="message__heading">{children}</h4>
            ),
            h5: ({ children }) => (
              <h5 className="message__heading">{children}</h5>
            ),
            h6: ({ children }) => (
              <h6 className="message__heading">{children}</h6>
            ),
            // Custom styling for lists
            ul: ({ children }) => <ul className="message__list">{children}</ul>,
            ol: ({ children }) => <ol className="message__list">{children}</ol>,
            li: ({ children }) => (
              <li className="message__list-item">{children}</li>
            ),
            // Custom styling for blockquotes
            blockquote: ({ children }) => (
              <blockquote className="message__blockquote">
                {children}
              </blockquote>
            ),
            // Custom styling for links
            a: ({ href, children }) => (
              <a
                href={href}
                className="message__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            // Custom styling for strong/bold text
            strong: ({ children }) => (
              <strong className="message__bold">{children}</strong>
            ),
            // Custom styling for emphasis/italic text
            em: ({ children }) => (
              <em className="message__italic">{children}</em>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
      {role === "assistant" && (
        <div className="message__actions">
          <Button className="message__action-btn">
            <Copy size={16} />
          </Button>
          <Button className="message__action-btn">
            <ThumbsUp size={16} />
          </Button>
          <Button className="message__action-btn">
            <ThumbsDown size={16} />
          </Button>
          <Button onClick={onNewChat} className="message__action-btn">
            <RotateCcw size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MessageContent;
