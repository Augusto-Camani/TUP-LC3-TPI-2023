import React, { useState } from "react";
import "./accountSettings.css";
import { useAuth } from "../../services/authenticationContext/authentication.context";

const AccountSettings = () => {
  const { user, putUser } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const ChangeSettingsHandler = () => {
    putUser({ email: newEmail, password: newPassword }, user.accessToken);
    setNewPassword("");
    setNewEmail("");
  };

  return (
    <div className="AccountSettings">
      <h2>Ajustes de cuenta</h2>
      <div>
        <label>
          <b>Nueva contraseña:</b>
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label>
          <b>Nuevo email:</b>
        </label>
        <input
          type="text"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </div>
      <button onClick={ChangeSettingsHandler}>
        <b>Guardar ajustes</b>
      </button>
    </div>
  );
};

export default AccountSettings;
