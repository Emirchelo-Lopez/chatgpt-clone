// src/context/AppContext.jsx - Main provider
import { AuthProvider } from "./AuthContext";
import { ChatProvider } from "./ChatContext";
import useAuth from "../hooks/useAuth";

export const AppProvider = ({ children }) => {
  const { user, token } = useAuth();
  return (
    <AuthProvider>
      <ChatProvider user={user} token={token}>
        {children}
      </ChatProvider>
    </AuthProvider>
  );
};
