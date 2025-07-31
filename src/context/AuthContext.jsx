import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedToken ? jwtDecode(storedToken) : null);
  const [token, setToken] = useState(storedToken);

  //   useEffect(() => {
  //     try {
  //       const decodedToken = jwtDecode(token);

  //       setUser(decodedToken);
  //     } catch (error) {
  //       console.error("Invalid token", error);
  //       localStorage.removeItem("token");
  //       setToken(null);
  //     }
  //   }, [token]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(jwtDecode(storedToken));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const contextValue = {
    user,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
