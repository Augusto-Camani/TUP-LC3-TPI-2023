import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import { AuthenticationContextProvider } from "./services/authenticationContext/authentication.context";
import { APIContextProvider } from "./services/apiContext/api.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <APIContextProvider>
        <App />
      </APIContextProvider>
    </AuthenticationContextProvider>
  </React.StrictMode>
);
