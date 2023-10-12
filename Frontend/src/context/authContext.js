import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  let token = localStorage.getItem("access_token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const contextValue = { isAuthenticated, setIsAuthenticated };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
