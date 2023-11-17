import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";

import { useAuth } from "../../services/authenticationContext/authentication.context";

const Login = () => {
  const { loginHandler } = useAuth();
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await loginHandler(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const changeHandler = ({ target: { value, name } }) =>
    setUser((prevUser) => ({ ...prevUser, [name]: value }));

  return (
    <div className="container w-50">
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={changeHandler}
            placeholder="Email"
          />
          <br />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            onChange={changeHandler}
            placeholder="Contraseña"
          />
        </Form.Group>
        <Button className="mb-1" type="submit">
          Iniciar Sesión
        </Button>
      </Form>
      <p className="mb-3">
        ¿No tiene una cuenta? <Link to="/register">Registrarse</Link>
      </p>
      {error && (
        <Alert className="Alert" variant="danger">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default Login;
