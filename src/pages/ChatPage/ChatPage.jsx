import ChatInput from "../../components/ui/ChatInput/ChatInput";
import ChatHeader from "../../components/ui/ChatHeader/ChatHeader";
import ChatMessage from "../../components/ui/ChatMessage/ChatMessage";
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import "./chat-page.scss";

export default function ChatPage() {
  const chatHistory = [
    {
      id: 1,
      title: "React Best Practices",
      isActive: false,
    },
    {
      id: 2,
      title: "SASS vs CSS Modules",
      isActive: true,
    },
    {
      id: 3,
      title: "JavaScript Async/Await",
      isActive: false,
    },
    {
      id: 4,
      title: "Node.js Performance Tips",
      isActive: false,
    },
  ];

  const messages = [
    {
      id: 1,
      role: "user",
      content: "Can you explain the benefits of using SASS over regular CSS?",
      timestamp: "2:30 PM",
    },
    {
      id: 2,
      role: "assistant",
      content: `SASS (Syntactically Awesome Style Sheets) offers several advantages over regular CSS:

  **1. Variables**
  You can define reusable values for colors, fonts, and other properties:
  \`\`\`scss
  $primary-color: #3498db;
  $font-size-large: 1.5rem;
  \`\`\`

  **2. Nesting**
  Write more organized and readable code by nesting selectors:
  \`\`\`scss
  .navbar {
    background: $primary-color;

    &__item {
      padding: 1rem;

      &:hover {
        background: darken($primary-color, 10%);
      }
    }
  }
  \`\`\`

  **3. Mixins**
  Create reusable chunks of CSS:
  \`\`\`scss
  @mixin button-style($bg-color) {
    padding: 0.5rem 1rem;
    background: $bg-color;
    border-radius: 4px;
  }
  \`\`\`

  **4. Functions and Operations**
  Perform calculations and manipulate values:
  \`\`\`scss
  width: percentage(5/7);
  color: lighten($primary-color, 20%);
  \`\`\`

  These features make your stylesheets more maintainable, organized, and powerful!`,
      timestamp: "2:31 PM",
    },
    {
      id: 3,
      role: "user",
      content:
        "That's great! Can you show me how to implement BEM methodology with SASS?",
      timestamp: "2:35 PM",
    },
    {
      id: 4,
      role: "assistant",
      content: `BEM (Block Element Modifier) works beautifully with SASS. Here's how to implement it:

  **BEM Structure:**
  - **Block**: Standalone component (\`.card\`)
  - **Element**: Part of a block (\`.card__title\`)
  - **Modifier**: Variation of block/element (\`.card--large\`)

  **SASS Implementation:**
  \`\`\`scss
  .card {
    padding: 1rem;
    border-radius: 8px;
    background: white;

    // Element
    &__title {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    &__content {
      color: #666;
      line-height: 1.6;
    }

    &__button {
      padding: 0.5rem 1rem;
      background: $primary-color;
      color: white;
      border: none;
      border-radius: 4px;

      // Element modifier
      &--secondary {
        background: $secondary-color;
      }
    }

    // Block modifier
    &--large {
      padding: 2rem;

      .card__title {
        font-size: 2rem;
      }
    }

    &--dark {
      background: #333;
      color: white;

      .card__content {
        color: #ccc;
      }
    }
  }
  \`\`\`

  **Benefits:**
  - Clear component structure
  - Easy to maintain and scale
  - Prevents CSS conflicts
  - Works great with component-based frameworks

  This approach keeps your styles organized and predictable!`,
      timestamp: "2:36 PM",
    },
  ];

  return (
    <div className="chatgpt-clone">
      {/* Sidebar */}
      <Sidebar chatHistory={chatHistory} />

      {/* Main Content */}
      <div className="main-content">
        {/* Chat Header */}
        <ChatHeader title="SASS vs CSS Modules" />

        {/* Chat Messages */}
        <div className="chat-messages">
          <div className="chat-messages__container">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                name="Emir"
                timestamp={message.timestamp}
                content={message.content}
              />
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="main-content__chat-input-section">
          <div className="main-content__chat-input-container">
            <ChatInput placeholder="Message ChatGPT" />

            <p className="main-content__footer-text">
              ChatGPT can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
