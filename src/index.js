import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { AuthenticationContextProvider } from "./services/authenticationContext/authentication.context";
import { APIContextProvider } from "./services/apiContext/API.Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <APIContextProvider>
    <React.StrictMode>
      <AuthenticationContextProvider>
        <App />
      </AuthenticationContextProvider>
    </React.StrictMode>
  </APIContextProvider>
);
