import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import { useAPI } from "../../services/apiContext/api.context";

const NewUser = ({ token, handleIsAdding }) => {
  const { postUser } = useAPI();
  const userObject = { email: "", password: "", userType: "" };
  const [user, setUser] = useState(userObject);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isValid =
        user.email !== "" && user.password !== "" && user.userType !== "";
      setFormValid(isValid);
    }, 300);
    return () => clearTimeout(timer);
  }, [user]);

  const addHandler = () => handleIsAdding();

  const changeHandler = ({ target: { value, name } }) =>
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

  const saveNewHandler = () => {
    postUser(user, token);
    setUser(userObject);
    addHandler();
  };

  return (
    <div className="container w-50">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Correo electronico</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={user.email}
            onChange={changeHandler}
            placeholder="ejemplo: pepito@gmail.com"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="text"
            name="password"
            value={user.password}
            onChange={changeHandler}
            placeholder="ejemplo: Pepito1234"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo de usuario</Form.Label>
          <Form.Control
            type="text"
            name="userType"
            value={user.userType}
            onChange={changeHandler}
            placeholder="user/admin/sysadmin"
          />
        </Form.Group>
        <Form.Group>
          <Button onClick={addHandler}>Cancelar</Button>
          <Button disabled={!formValid} onClick={saveNewHandler}>
            Agregar Usuario
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewUser;
