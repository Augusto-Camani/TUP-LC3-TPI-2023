import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { useAPI } from "../apiContext/api.context";

const AuthenticationContext = createContext();

const userValue = JSON.parse(localStorage.getItem("user"));

export const useAuth = () => {
  const context = useContext(AuthenticationContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export const AuthenticationContextProvider = ({ children }) => {
  const { setCart } = useAPI();
  const [user, setUser] = useState(userValue);
  const accessToken = () => Cookies.get("accessToken");
  const setAccessToken = (value) =>
    Cookies.set("accessToken", value, {
      secure: true,
      expires: 1 / 24,
    });
  const refreshToken = () => Cookies.get("refreshToken");
  const setRefreshToken = (value) =>
    Cookies.set("refreshToken", value, { secure: true, expires: 1 });

  const refresh = async () => {
    if (!accessToken() && refreshToken()) {
      await fetch("https://tuxguitarsapi.onrender.com/refresh-token", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: refreshToken() }),
      })
        .then(
          (response) => {
            if (response.ok) return response.json();
            if (response.status === 400)
              throw new Error("El token de actualización ha expirado");
          },
          () => {
            throw new Error("Error de servidor. Intentelo de nuevo más tarde");
          }
        )
        .then((response) => {
          setAccessToken(response.accessToken);
          setRefreshToken(response.refreshToken);
        })
        .catch(() => logoutHandler());
    } else if (!refreshToken()) logoutHandler();
  };

  useEffect(() => {
    refresh();
    setInterval(refresh, 3600000);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
    setCart([]);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        setRefreshToken,
        logoutHandler,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
