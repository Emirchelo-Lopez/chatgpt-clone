// src/context/AppContext.jsx - Main provider
import { AuthProvider } from "./AuthContext";
import { ChatProvider } from "./ChatContext";
import useAuth from "../hooks/useAuth";

const ChatProviderWrapper = ({ children }) => {
  const { user, token } = useAuth(); // ✅ Get auth data here

  return (
    <ChatProvider user={user} token={token}>
      {children}
    </ChatProvider>
  );
};

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ChatProviderWrapper>{children}</ChatProviderWrapper>
    </AuthProvider>
  );
};
