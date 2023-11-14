import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeContextProvider } from "./services/themeContext/theme.context";
import { AuthenticationContextProvider } from "./services/authenticationContext/authentication.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </AuthenticationContextProvider>
  </React.StrictMode>
);
