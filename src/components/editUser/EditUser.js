import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import { useAPI } from "../../services/apiContext/api.context";
import { useAuth } from "../../services/authenticationContext/authentication.context";

const EditUser = ({ user, handleIsEditing }) => {
  const { putUser } = useAPI();
  const { accessToken } = useAuth();
  const userObject = { ...user };
  const [updatedUser, setUpdatedUser] = useState(userObject);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isValid =
        updatedUser.email !== "" &&
        updatedUser.password !== "" &&
        updatedUser.userType !== "";
      setFormValid(isValid);
    }, 300);
    return () => clearTimeout(timer);
  }, [updatedUser]);

  const editHandler = () => handleIsEditing();

  const changeHandler = ({ target: { name, value } }) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const addChangeHandler = () => {
    putUser({ ...user, ...updatedUser, id: user.id }, accessToken());
    setUpdatedUser(userObject);
    editHandler();
  };

  return (
    <div className="container w-50">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Ingrese el nuevo nombre del usuario:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={updatedUser.email}
            onChange={changeHandler}
            placeholder={user.email}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ingrese la nueva contraseña:</Form.Label>
          <Form.Control
            type="text"
            name="password"
            value={updatedUser.password}
            onChange={changeHandler}
            placeholder={user.password}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ingrese el nuevo tipo de usuario :</Form.Label>
          <Form.Control
            type="text"
            name="userType"
            value={updatedUser.userType}
            onChange={changeHandler}
            placeholder={user.userType}
          />
        </Form.Group>
        <Form.Group>
          <Button onClick={editHandler}>Cancelar</Button>
          <Button disabled={!formValid} onClick={addChangeHandler}>
            Editar usuario
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditUser;
