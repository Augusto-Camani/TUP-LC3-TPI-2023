import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import useCatchRejectedFetch from "../../custom/useCatchRejectedFetch/useCatchRejectedFetch";

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

  const loginHandler = async (email, password) => {
    await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error(
            "No se encontró un usuario con las credenciales proporcionadas"
          );
      }, useCatchRejectedFetch)
      .then((response) => {
        Cookies.set("accessToken", response.accessToken);
        Cookies.set("refreshToken", response.refreshToken);
        setAccessToken(response.accessToken);
        const currentUser = {
          id: response.id,
          email: response.email,
          userType: response.userType,
          createdAt: response.createdAt,
        };
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      });
  };

  const logoutHandler = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("user");
  };

  const registerHandler = async (email, password) => {
    await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        userType: "user",
      }),
    }).then((response) => {
      if (response.ok) return response.json();
      else {
        throw new Error("No se pudo registrar su usuario. Intentelo de nuevo");
      }
    }, useCatchRejectedFetch);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
        loginHandler,
        logoutHandler,
        registerHandler,
        accessToken,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
