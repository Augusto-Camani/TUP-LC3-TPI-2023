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

  const loginHandler = async (email, password) => {
    await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error(
            "No se encontró un usuario con las credenciales proporcionadas"
          );
        }
      })
      .then((response) => {
        const currentUser = {
          id: response.id,
          email: response.email,
          userType: response.userType,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        };
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      });
  };

  const logoutHandler = () => {
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
    })
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error("The response had some errors");
        }
      })
      .then((response) => {
        const currentUser = {
          id: response.id,
          email: response.email,
          userType: response.userType,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        };
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, setUser, loginHandler, logoutHandler, registerHandler }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
