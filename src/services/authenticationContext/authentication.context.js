import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthenticationContext = createContext();

const userValue = JSON.parse(localStorage.getItem("user"));

export const useAuth = () => {
  const context = useContext(AuthenticationContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(userValue);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const storedAccessToken = Cookies.get("accessToken");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  const logoutHandler = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        logoutHandler,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
