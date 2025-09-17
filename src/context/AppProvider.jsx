// src/context/AppContext.jsx - Main provider
import { AuthProvider } from "./AuthContext";
import { ChatProvider } from "./ChatContext";

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ChatProvider>{children}</ChatProvider>
    </AuthProvider>
  );
};
