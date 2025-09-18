// Temporary test component
// src/components/TestChatPage.jsx
import { useParams } from "react-router-dom";

const TestChatPage = () => {
  const { chatId } = useParams();

  return (
    <div>
      <h1>Test Chat Page</h1>
      <p>Chat ID: {chatId}</p>
    </div>
  );
};

export default TestChatPage;
