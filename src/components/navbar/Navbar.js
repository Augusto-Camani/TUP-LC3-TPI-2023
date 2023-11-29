import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { CartFill } from "react-bootstrap-icons";

import { useAuth } from "../../services/authenticationContext/authentication.context";

const NavBar = () => {
  const { user } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/home" className="col-md-auto">
          TuxGuitars
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} to="/products">
              Productos
            </Nav.Link>
            {["sysadmin", "admin"].includes(
              user ? user.userType : "unsigned"
            ) && (
              <>
                <Nav.Link as={Link} to="/sales">
                  Ventas
                </Nav.Link>
                <NavDropdown title="Administrar" id="navbarScrollingDropdown">
                  {(user.userType === "admin" ||
                    user.userType === "sysadmin") && (
                    <>
                      <NavDropdown.Item as={Link} to="/manageProducts">
                        Productos
                      </NavDropdown.Item>
                      {user.userType === "sysadmin" && (
                        <NavDropdown.Item as={Link} to="/manageUsers">
                          Usuarios
                        </NavDropdown.Item>
                      )}
                    </>
                  )}
                </NavDropdown>
              </>
            )}
          </Nav>
          <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link className="d-flex" disabled={!user} as={Link} to="/cart">
              <CartFill size="1.5rem" />
            </Nav.Link>
            <NavDropdown
              title="Cuenta"
              id="navbarScrollingDropdown"
              align="end"
            >
              <NavDropdown.Item
                disabled={!user}
                as={Link}
                to="/accountSettings"
              >
                Ajustes
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to={user ? "/logout" : "/login"}>
                {user ? "Cerrar sesión" : "Iniciar sesión"}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
