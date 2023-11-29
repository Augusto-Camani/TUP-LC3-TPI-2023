import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";

import { useAuth } from "../../services/authenticationContext/authentication.context";
import { useAPI } from "../../services/apiContext/api.context";

const AccountSettings = () => {
  const { user, accessToken } = useAuth();
  const { toggleLoading, purchaseHistory, setPurchaseHistory, putUser } =
    useAPI();
  const [newUser, setNewUser] = useState({ ...user });
  const [showPassword, setShowPassword] = useState(false);

  const getPurchaseHistory = async () => {
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
        console.log(salesData);
        setPurchaseHistory(salesData.filter((s) => s.userID === user.id));
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
      if (
        newUser.password.length < 6 ||
        !/\p{Lu}/u.test(newUser.password) ||
        !/\d/.test(newUser.password)
      ) {
        throw new Error(
          "La contraseña debe contener al menos 6 caracteres, 1 mayúscula y 1 número"
        );
      }
      toggleLoading(true);
      await putUser(
        {
          id: newUser.id,
          email: newUser.email.length > 0 ? newUser.email : user.email,
          password: newUser.password,
          userType: newUser.userType,
          createdAt: newUser.createdAt,
        },
        accessToken()
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
    <Container fluid>
      <Row className="justify-content-center">
        <Col sm={5} className="my-3 p-3" style={{ minWidth: "20rem" }}>
          <div className="container m-auto" style={{ maxWidth: "25rem" }}>
            <h3 className="mb-5">Ajustes de cuenta</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nuevo email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={changeHandler}
                  placeholder="new email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nueva contraseña:</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={newUser.password}
                    onChange={changeHandler}
                    placeholder="password/new password"
                  />
                  <Button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Eye size="1.25rem" />
                    ) : (
                      <EyeSlash size="1.25rem" />
                    )}
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Button className="m-auto p-2" onClick={ChangeSettingsHandler}>
                  Guardar ajustes
                </Button>
              </Form.Group>
            </Form>
          </div>
        </Col>
        <Col sm={5} className="my-3 p-3" style={{ minWidth: "25rem" }}>
          <div className="container d-flex flex-column m-auto">
            <div className="d-flex justify-content-around mb-2">
              <h2>Historial de compras</h2>
              <Button
                className="my-auto p-2"
                onClick={() => getPurchaseHistory()}
              >
                Mostrar historial de compras
              </Button>
            </div>
            {purchaseHistory.length > 0 && (
              <Table
                striped
                bordered
                hover
                size="sm"
                className="align-self-center w-auto"
                style={{ minWidth: "25rem" }}
              >
                <thead className="text-center">
                  <tr className="align-middle">
                    <th>
                      N° de
                      <br />
                      compra
                    </th>
                    <th className="w-auto">Instrumento</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseHistory.map((sale) =>
                    sale.content.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center">{sale.id}</td>
                        <td className="text-break w-auto">{item.instrument}</td>
                        <td className="text-end">${item.price}</td>
                        <td className="text-end">{item.quantity}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountSettings;
