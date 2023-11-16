import React, { useState } from "react";
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
    <div>
      <h2>Ajustes de cuenta</h2>
      <div>
        <label>Nueva contraseña:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Nuevo email:</label>
        <input
          type="text"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </div>
      <button onClick={ChangeSettingsHandler}>Guardar ajustes</button>
    </div>
  );
};

export default AccountSettings;
