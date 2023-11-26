import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

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
              <NavDropdown title="Administrar" id="navbarScrollingDropdown">
                {(user.userType === "admin" ||
                  user.userType === "sysadmin") && (
                  <>
                    <NavDropdown.Item as={Link} to="/manageProducts">
                      Productos
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item as={Link} to="/manageSales">
                        Ventas
                      </NavDropdown.Item> */}
                    {user.userType === "sysadmin" && (
                      <NavDropdown.Item as={Link} to="/manageUsers">
                        Usuarios
                      </NavDropdown.Item>
                    )}
                  </>
                )}
              </NavDropdown>
            )}
          </Nav>
          <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link
              className="d-flex align-items-center"
              as={Link}
              to="/cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
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
