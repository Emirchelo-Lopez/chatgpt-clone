import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getMeUserService } from "../api/userService";

const AuthContext = createContext();

// This helper function safely initializes the auth state from localStorage
const getInitialAuthState = () => {
  const storedToken = localStorage.getItem("token");

  if (storedToken) {
    try {
      // Try to decode the token
      const decodedUser = jwtDecode(storedToken);

      // Optional but recommended: Check if the token is expired
      if (decodedUser.exp * 1000 < Date.now()) {
        console.warn("Expired token found in storage.");
        localStorage.removeItem("token");
        return { user: null, token: null };
      }

      // If token is valid and not expired, return the user and token
      return { user: decodedUser, token: storedToken };
    } catch (error) {
      // If decoding fails, the token is invalid. Remove it.
      console.error("Invalid token found in storage. Removing it.", error);
      localStorage.removeItem("token");
      return { user: null, token: null };
    }
  }

  // If no token is found, return a null state
  return { user: null, token: null };
};

const AuthProvider = ({ children }) => {
  try {
    // Initialize state safely using our new function
    const initialAuthState = getInitialAuthState();
    const [user, setUser] = useState(initialAuthState.user);
    const [token, setToken] = useState(initialAuthState.token);
    const [userInfo, setUserInfo] = useState(null);

    const login = (newToken) => {
      try {
        // Also protect the login function in case of an invalid token from the API
        const decodedUser = jwtDecode(newToken);
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(decodedUser);
      } catch (error) {
        console.error("Failed to decode token on login:", error);
        // Clear out any potentially bad state
        logout();
      }
    };

    const logout = () => {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      setUserInfo(null); // Also clear user info on logout
    };

    const fetchUserInfo = async () => {
      // Prevent fetching if already have info or if there's no token
      if (userInfo || !token) return;

      try {
        const data = await getMeUserService();
        setUserInfo(data.data.user); // The user object is nested under response.data.data.user
      } catch (error) {
        console.error("Failed to fetch user data for context: ", error);
        // If fetching fails (e.g., token is actually invalid on the server), log the user out
        logout();
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
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );
  } catch (error) {
    console.error("Error in AuthProvider:", error);
    throw error;
  }
};

export { AuthContext, AuthProvider };
