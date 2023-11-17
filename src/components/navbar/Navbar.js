import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

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
            {["sysadmin", "admin"].includes(
              user ? user.userType : "unsigned"
            ) && (
              <NavDropdown title="Administrar" id="navbarScrollingDropdown">
                {user.userType === "admin" ? (
                  <NavDropdown.Item as={Link} to="/products">
                    Productos
                  </NavDropdown.Item>
                ) : (
                  user.userType === "sysadmin" && (
                    <>
                      <NavDropdown.Item as={Link} to="/manageProducts">
                        Productos
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/manageUsers">
                        Usuarios
                      </NavDropdown.Item>
                      {/* <NavDropdown.Item as={Link} to="/manageSales">
                        Ventas
                      </NavDropdown.Item> */}
                    </>
                  )
                )}
              </NavDropdown>
            )}
            <NavDropdown title="Cuenta" id="navbarScrollingDropdown">
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
          <Nav.Link as={Link} to="/cart">
            Ver el carrito
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
