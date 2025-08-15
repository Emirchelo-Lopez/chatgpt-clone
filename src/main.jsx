import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";
import App from "./App.jsx";
import "./assets/styles/main.scss";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ChatProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ChatProvider>
  </AuthProvider>
);
