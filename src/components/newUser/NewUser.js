import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import { useAPI } from "../../services/apiContext/api.context";
import { useAuth } from "../../services/authenticationContext/authentication.context";

const NewUser = ({ handleIsAdding }) => {
  const { toggleLoading, users, setUsers } = useAPI();
  const { accessToken } = useAuth();
  const userObject = { email: "", password: "", userType: "" };
  const [user, setUser] = useState(userObject);
  const [formValid, setFormValid] = useState(false);

  const postUser = async () => {
    const newUser = { id: users[users.length - 1].id + 1, ...user };
    await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken()}`,
      },
      body: JSON.stringify(newUser),
    })
      .then(
        (response) => {
          if (response.ok) return response.json();
          else
            throw new Error(
              "No se pudo agregar el usuario. Intentelo de nuevo"
            );
        },
        () => {
          throw new Error("Error de servidor. Intentelo de nuevo más tarde");
        }
      )
      .then(() => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
      });
  };

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

  const saveNewHandler = async () => {
    try {
      toggleLoading(true);
      await postUser();
      setUser(userObject);
      addHandler();
    } catch (error) {
      alert(error.message);
    } finally {
      toggleLoading(false);
    }
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
