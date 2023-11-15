import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";

import "./Login.css";

import { useAuth } from "../../services/authenticationContext/authentication.context";

const Login = () => {
  const { loginHandler } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await loginHandler(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.message)
        setError(
          "Fallo al iniciar sesión.\nPor favor intente de nuevo más tarde."
        );
      else setError(error.message);
    }
  };

  const changeHandler = ({ target: { value, name } }) =>
    setUser((prevUser) => ({ ...prevUser, [name]: value }));

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={changeHandler}
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            onChange={changeHandler}
            placeholder="Contraseña"
          />
        </Form.Group>
        <Button type="submit">Iniciar Sesión</Button>
      </Form>
      <p>
        ¿No tienes una cuenta?
        <Link to="/register">Registrarse</Link>
      </p>
      <Alert
        className="Alert"
        show={error}
        variant={
          error === "We sent you an email. Check your inbox"
            ? "primary"
            : "danger"
        }
      >
        {error}
      </Alert>
    </>
  );
};

export default Login;
