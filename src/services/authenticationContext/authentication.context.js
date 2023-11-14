import { createContext, useContext, useState } from "react";

const AuthenticationContext = createContext();

const userValue = JSON.parse(localStorage.getItem("user"));

export const useAuth = () => {
  const context = useContext(AuthenticationContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(userValue);

  const handleLogin = (email) => {
    localStorage.setItem("user", JSON.stringify({ ...user, email }));
    setUser(email);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, setUser, handleLogin, handleLogout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
