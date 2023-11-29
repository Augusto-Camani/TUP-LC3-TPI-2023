import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";

import { useAuth } from "../../services/authenticationContext/authentication.context";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setAccessToken, setRefreshToken } = useAuth();
  const [userToLogin, setUserToLogin] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = async (email, password) => {
    await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then(
        (response) => {
          if (response.ok) return response.json();
          else
            throw new Error(
              "No se encontró un usuario con las credenciales proporcionadas"
            );
        },
        () => {
          throw new Error("Error de servidor. Intentelo de nuevo más tarde");
        }
      )
      .then((response) => {
        setAccessToken(response.accessToken);
        setRefreshToken(response.refreshToken);
        const currentUser = {
          id: response.id,
          email: response.email,
          userType: response.userType,
          createdAt: response.createdAt,
        };
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await loginHandler(userToLogin.email, userToLogin.password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const changeHandler = ({ target: { value, name } }) =>
    setUserToLogin((prevUser) => ({ ...prevUser, [name]: value }));

  return (
    <div
      className="container my-3 p-3"
      style={{ minWidth: "10rem", maxWidth: "25rem" }}
    >
      <h2 className="mb-5">Iniciar sesión</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userToLogin.email}
            onChange={changeHandler}
            placeholder="Email"
          />
          <br />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              value={userToLogin.password}
              onChange={changeHandler}
              placeholder="Contraseña"
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
        <Button className="mb-1" type="submit">
          Iniciar Sesión
        </Button>
      </Form>
      <p className="mb-3">
        ¿No tiene una cuenta? <Link to="/register">Registrarse</Link>
      </p>
    </div>
  );
};

export default Login;
