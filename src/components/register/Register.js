import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const Register = () => {
  const errors = [
    "Ingrese un E-Mail",
    "La contraseña debe contener al menos 6 caracteres, 1 mayúscula y 1 número",
  ];
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const registerHandler = async (email, password) => {
    await fetch("https://tuxguitarsapi.onrender.com/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        userType: "user",
      }),
    })
      .then(
        (response) => {
          if (response.ok) return;
          if (response.status === 400)
            throw new Error("Ese email ya se encuentra registrado");
          else {
            throw new Error(
              "No se pudo registrar su usuario. Intentelo de nuevo"
            );
          }
        },
        () => {
          throw new Error("Error de servidor. Intentelo de nuevo más tarde");
        }
      )
      .then((response) => {
        console.log(response);
      });
  };

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
      alert(error.message);
    }
  };

  return (
    <div
      className="container my-3 p-3"
      style={{ minWidth: "10rem", maxWidth: "25rem" }}
    >
      <h2 className="mb-5">Registrarse</h2>
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
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={changeHandler}
              placeholder="contraseña"
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
          Registrarse
        </Button>
      </Form>
      <p className="mb-3">
        ¿Ya tiene una cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
};

export default Register;
