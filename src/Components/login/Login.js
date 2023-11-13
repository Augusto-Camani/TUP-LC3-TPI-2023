import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";

import "./Login.css";

import { useAuth } from "../../services/authenticationContext/authentication.context";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { handleLogin } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await handleLogin(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser((prevUser) => ({ ...prevUser, [name]: value }));

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (!user.email) return setError("Write an email to reset password");
    try {
      //await resetPassword(user.email);
      setError("We sent you an email. Check your inbox");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Group>
        <Button type="submit">Sign In</Button>
        <a href="#!" onClick={handleResetPassword}>
          Forgot Password?
        </a>
      </Form>
      <p>
        Don't have an account?
        <Link to="/register">Register</Link>
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
