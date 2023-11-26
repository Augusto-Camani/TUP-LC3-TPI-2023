import React, { useState } from "react";
import { Table } from "react-bootstrap";

import "./accountSettings.css";

import { useAuth } from "../../services/authenticationContext/authentication.context";
import { useAPI } from "../../services/apiContext/api.context";

const AccountSettings = () => {
  const { user, accessToken } = useAuth();
  const { toggleLoading, putUser } = useAPI();
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [newUser, setNewUser] = useState({ ...user });

  const getPurchaseHistory = async (id) => {
    if (purchaseHistory.length > 0) return;
    await fetch("http://localhost:8000/sales", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken()}`,
      },
    })
      .then(
        (response) => {
          if (response.ok) return response.json();
          else
            throw new Error(
              "Hubo un problema. Si el problema persiste contacte a soporte"
            );
        },
        () => {
          throw new Error("Error de servidor. Intentelo de nuevo más tarde");
        }
      )
      .then((salesData) => {
        setPurchaseHistory(salesData.filter((s) => s.userID === id));
      });
  };

  const ChangeSettingsHandler = async () => {
    try {
      if (
        (newUser.email === user.email && newUser.password === user.password) ||
        (!newUser.email.length > 0 && !newUser.password.length > 0)
      )
        throw new Error("Complete alguno de los campos");
      if (newUser.email.length > 0) {
        if (!/\S+@\S+\.\S+/.test(newUser.email))
          throw new Error("Ingrese un E-Mail");
      }
      if (newUser.password.length > 0) {
        if (
          newUser.password.length < 6 ||
          !/\p{Lu}/u.test(newUser.password) ||
          !/\d/.test(newUser.password)
        ) {
          throw new Error(
            "La contraseña debe contener al menos 6 caracteres, 1 mayúscula y 1 número"
          );
        }
      }
      toggleLoading(true);
      await putUser(
        {
          id: newUser.id,
          email: newUser.email.length > 0 ? newUser.email : user.email,
          password:
            newUser.password.length > 0 ? newUser.password : user.password,
          userType: newUser.userType,
          createdAt: newUser.createdAt,
        },
        accessToken
      );
      setNewUser({ ...user });
      alert("Ajustes guardados correctamente");
    } catch (error) {
      alert(error.message);
    } finally {
      toggleLoading(false);
    }
  };

  const changeHandler = ({ target: { value, name } }) =>
    setNewUser((prevNewUser) => ({ ...prevNewUser, [name]: value }));

  return (
    <div>
      <div className="AccountSettings">
        <h2>Ajustes de cuenta</h2>
        <div>
          <label>
            <b>Nuevo email:</b>
          </label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={changeHandler}
            placeholder={user.email}
          />
        </div>
        <div>
          <label>
            <b>Nueva contraseña:</b>
          </label>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={changeHandler}
            placeholder={user.password}
          />
        </div>
        <button onClick={ChangeSettingsHandler}>
          <b>Guardar ajustes</b>
        </button>
      </div>
      <div>
        <h2>Historial de compras</h2>
        <button
          onClick={() => {
            getPurchaseHistory();
          }}
        >
          Mostrar compras
        </button>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>id de Venta</th>
              <th>instrumento</th>
              <th>precio</th>
              <th>cantidad</th>
            </tr>
          </thead>
          <tbody>
            {purchaseHistory.map((sale) =>
              sale.content.map((item, index) => (
                <tr key={index}>
                  <td>{sale.id}</td>
                  <td>{item.instrument}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AccountSettings;
