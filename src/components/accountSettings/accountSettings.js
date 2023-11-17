import React, { useState } from "react";
import "./accountSettings.css";
import { useAuth } from "../../services/authenticationContext/authentication.context";
import { useAPI } from "../../services/apiContext/api.context";

const AccountSettings = () => {
  const { user } = useAuth();
  const { putUser } = useAPI();
  const [newUser, setNewUser] = useState({ email: "", password: "" });

  const ChangeSettingsHandler = () => {
    putUser(
      {
        id: user.id,
        email: newUser.email.length > 0 ? newUser.email : user.email,
        password:
          newUser.password.length > 0 ? newUser.password : user.password,
        userType: user.userType,
        ...newUser,
        createdAt: user.createdAt,
      },
      user.accessToken
    );
    setNewUser({ email: "", password: "" });
  };

  const changeHandler = ({ target: { value, name } }) =>
    setNewUser((prevNewUser) => ({ ...prevNewUser, [name]: value }));

  return (
    <div className="AccountSettings">
      <h2>Ajustes de cuenta</h2>
      <div>
        <label>
          <b>Nueva contraseña:</b>
        </label>
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={changeHandler}
        />
      </div>
      <div>
        <label>
          <b>Nuevo email:</b>
        </label>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={changeHandler}
        />
      </div>
      <button onClick={ChangeSettingsHandler}>
        <b>Guardar ajustes</b>
      </button>
    </div>
  );
};

export default AccountSettings;
