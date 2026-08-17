import { useState } from "react";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
