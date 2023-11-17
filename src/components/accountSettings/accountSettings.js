import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./accountSettings.css";
import { useAuth } from "../../services/authenticationContext/authentication.context";
import { useAPI } from "../../services/apiContext/api.context";

const AccountSettings = () => {
  const { user, accessToken } = useAuth();
  const { putUser, getPurchaseHistory, sales } = useAPI();
  const [newUser, setNewUser] = useState({ email: "", password: "" });
  const [clicked, setClicked] = useState(false);

  const showPurchasesHandler = () => {
    getPurchaseHistory(user.id, accessToken);
    setClicked(true);
  };

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
      accessToken
    );
    setNewUser({ email: "", password: "" });
  };

  const changeHandler = ({ target: { value, name } }) =>
    setNewUser((prevNewUser) => ({ ...prevNewUser, [name]: value }));

  return (
    <div>
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
      <div>
        <h2>Historial de compras</h2>
        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>id de Venta</th>
                <th>instrumento</th>
                <th>precio</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) =>
                sale.content.map((item, index) => (
                  <tr key={index}>
                    <td>{sale.id}</td>
                    <td>{item.instrument}</td>
                    <td>{item.price}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
        {!clicked && (
          <button onClick={showPurchasesHandler}>Mostrar compras</button>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
