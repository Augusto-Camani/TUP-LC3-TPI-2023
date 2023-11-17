import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import { useAPI } from "../../services/apiContext/api.context";

const EditUser = ({ user, token, handleEdit }) => {
  const { putUser } = useAPI();
  const userObjet = { ...user };
  const [updatedUser, setUpdatedUser] = useState(userObjet);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isValid =
        updatedUser.instrument !== "" &&
        updatedUser.price !== 0 &&
        updatedUser.stock !== 0;
      setFormValid(isValid);
    }, 300);
    return () => clearTimeout(timer);
  }, [updatedUser]);

  const editHandler = () => handleEdit();

  const changeHandler = ({ target: { value, type, name } }) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const addChangeHandler = () => {
    putUser({ ...user, ...updatedUser, id: user.id }, token);
    setUpdatedUser(userObjet);
    editHandler();
  };

  return (
    <div className="container w-50">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Ingrese el nuevo nombre del usuario:</Form.Label>
          <Form.Control
            className="new-book-control"
            type="text"
            name="email"
            value={updatedUser.email}
            onChange={changeHandler}
            placeholder={user.email}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ingrese el nueva contraseña:</Form.Label>
          <Form.Control
            className="new-book-control"
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
            className="new-book-control"
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
            Cambiar usuario
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditUser;
