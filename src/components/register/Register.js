import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";

import { useAuth } from "../../services/authenticationContext/authentication.context";

const Register = () => {
  const errors = [
    "Ingrese un E-Mail",
    "La contraseña debe contener al menos 6 caracteres, 1 mayúscula y 1 número",
  ];
  const { registerHandler } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const changeHandler = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!/\S+@\S+\.\S+/.test(user.email)) throw new Error(errors[0]);
      if (
        user.password.length < 6 ||
        !/\p{Lu}/u.test(user.password) ||
        !/\d/.test(user.password)
      )
        throw new Error(errors[1]);
      await registerHandler(user.email, user.password);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container w-50">
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={changeHandler}
            placeholder="email"
          />
          <Form.Text className="text-muted">
            Nunca compartiremos su dirección de correo electrónico.
          </Form.Text>
          <Alert variant="danger" show={errors[0].isError}>
            {errors[0].text}
          </Alert>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={changeHandler}
            placeholder="contraseña"
          />
          <Alert className="Alert" show={errors[1].isError} variant="danger">
            {errors[1].text}
          </Alert>
        </Form.Group>
        <Button className="mb-1" type="submit">
          Registrarse
        </Button>
      </Form>
      <p className="mb-3">
        ¿Ya tiene una cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
      {error && (
        <Alert className="Alert" variant="danger">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default Register;
