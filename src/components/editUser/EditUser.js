import React, { useEffect, useState } from "react";
import { useAPI } from "../../services/apiContext/api.context";
import { Button, Form } from "react-bootstrap";

const EditUser = ({ user, accessToken, handleEdit }) => {
  const { putUser } = useAPI;
  const userObjet = { ...user };
  const [updateUser, setUpdateUser] = useState(userObjet);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isValid =
        updateUser.instrument !== "" &&
        updateUser.price !== 0 &&
        updateUser.stock !== 0;
      setFormValid(isValid);
    });
  });

  const editHandler = () => handleEdit();

  const changeHandler = ({ target: { value, type, name } }) => {
    setUpdateUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const addChangeHandler = () => {
    putUser({ ...user, ...updateUser, id: user.id }, accessToken);
    setUpdateUser(userObjet);
    editHandler();
  };

  return (
    <div className="container w-50">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>ingrese el nuevo nombre del usuario:</Form.Label>
          <Form.Control
            className="new-book-control"
            type="text"
            name="email"
            value={updateUser.email}
            onChange={changeHandler}
            placeholder={user.email}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ingrese el nueva contraseña:</Form.Label>
          <Form.Control
            className="new-book-control"
            type="text"
            name="password"
            value={updateUser.password}
            onChange={changeHandler}
            placeholder={user.password}
            min="1"
            step="1"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ingrese el nuevo tipo de usuario :</Form.Label>
          <Form.Control
            className="new-book-control"
            type="text"
            name="userType"
            value={updateUser.userType}
            onChange={changeHandler}
            placeholder={user.userType}
            min="1"
            step="1"
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
