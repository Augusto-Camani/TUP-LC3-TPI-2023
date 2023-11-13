import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Register = () => {
  //const { signup } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [errors, setErrors] = useState([
    { text: "Ingrese un E-Mail", isError: false },
    {
      text: "La contraseña debe contener al menos 6 caracteres, 1 mayúscula y 1 número",
      isError: false,
    },
  ]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = [...errors];

    setError("");
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors[0].isError = true;
      setErrors(newErrors);
    } else {
      newErrors[0].isError = false;
      setErrors(newErrors);
    }
    if (
      user.password.length < 6 ||
      !/\p{Lu}/u.test(user.password) ||
      !/\d/.test(user.password)
    ) {
      newErrors[1].isError = true;
      setErrors(newErrors);
    } else {
      newErrors[1].isError = false;
      setErrors(newErrors);
    }
    if (errors[0].isError || errors[1].isError) {
      return;
    }
    try {
      //await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  return (
    <div>
      <Form className="registerForm" onSubmit={handleSubmit}>
        <Form.Group class="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Alert variant="danger" show={errors[0].isError}>
            {errors[0].text}
          </Alert>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <Alert className="Alert" show={errors[1].isError} variant="danger">
            {errors[1].text}
          </Alert>
        </Form.Group>
        <Button type="submit">Register</Button>
      </Form>
      <p>
        Already have an Account?
        <Link to="/login">Login</Link>
      </p>
      <Alert className="Alert" show={error} variant="danger">
        {error}
      </Alert>
    </div>
  );
};

export default Register;
