import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getMeUserService } from "../api/userService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");

  // user tokens
  const [user, setUser] = useState(storedToken ? jwtDecode(storedToken) : null);
  const [token, setToken] = useState(storedToken);

  // user info state
  const [userInfo, setUserInfo] = useState(null);

  // Login function
  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(jwtDecode(token));
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  // Fetching the user info
  const fetchUserInfo = async () => {
    if (userInfo) return;
    try {
      const data = await getMeUserService();
      setUserInfo(data);
    } catch (error) {
      console.error("Failed to fetch user data for context: ", error);
    }
  };

  const contextValue = {
    user,
    token,
    login,
    logout,
    userInfo,
    fetchUserInfo,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
