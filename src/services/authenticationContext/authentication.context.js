import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import useCatchRejectedFetch from "../../custom/useCatchRejectedFetch/useCatchRejectedFetch";

const AuthenticationContext = createContext();

const userValue = JSON.parse(localStorage.getItem("user"));
const accessValue = Cookies.get("accessToken");
const refreshValue = Cookies.get("refreshToken");

export const useAuth = () => {
  const context = useContext(AuthenticationContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(userValue);
  const [accessToken, setAccessToken] = useState(accessValue);
  const [refreshToken, setRefreshToken] = useState(refreshValue);

  const refresh = async () => {
    if (refreshToken) {
      await fetch("http://localhost:8000/refresh-token", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token: refreshToken,
        }),
      })
        .then((response) => {
          if (response.ok) return response.json();
          if (response.status === 400)
            throw new Error("El token de actualización ha expirado");
        }, useCatchRejectedFetch)
        .then((response) => {
          Cookies.set("accessToken", response.accessToken);
          Cookies.set("refreshToken", response.refreshToken);
          setAccessToken(response.accessToken);
          setRefreshToken(response.refreshToken);
        })
        .catch(() => logoutHandler());
    }
  };

  useEffect(() => {
    if (accessToken) {
      refresh();
      setInterval(refresh, 3600000);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        logoutHandler,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
