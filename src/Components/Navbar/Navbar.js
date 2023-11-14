import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

import { useAuth } from "../../services/authenticationContext/authentication.context";

const NavBar = () => {
  const { user } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/home">
          TuxGuitars
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/products">
              Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Carrito
            </Nav.Link>
            <NavDropdown title="Cuenta" id="navbarScrollingDropdown">
              <NavDropdown.Item disabled={!user} as={Link} to="/login">
                Cambiar contraseña
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to={user ? "/logout" : "/login"}>
                {user ? "Cerrar sesión" : "Iniciar sesión"}
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link to="#" disabled>
                Link
              </Nav.Link> */}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
