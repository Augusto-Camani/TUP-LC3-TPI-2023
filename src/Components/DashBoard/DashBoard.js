import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router";
import NewProduct from "../NewProduct/NewProduct";
import Products from "../Products/Products";
import ToggleTheme from "../../ui/toggleTheme/ToggleTheme";

export const PRODUCTS = [
  {
    instrument: "bateria",
    price: 420,
    seller: "Baterias S.A",
  },
  {
    instrument: "trompeta",
    price: 840,
    seller: "Trompetas S.A",
  },
  {
    instrument: "guitarra",
    price: 1200,
    seller: "Guitarras S.R.L",
  },
];

const Dashboard = ({ onLogout }) => {
  const [productSelected, setProductSelected] = useState("");
  const [products, setProducts] = useState(PRODUCTS);
  const [ProductsFilter, setProductsFilter] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/Products", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((productsData) => {
        setProducts(productsData);
        setProductsFilter(productsData);
      })
      .catch((error) => console.log(error));
  }, []);
  const navigate = useNavigate();

  const handlerLogout = () => {
    onLogout();
    navigate("/login");
  };
  return (
    <>
      <Row>
        <Col>
          <h1>APP de instrumentos musicales</h1>
        </Col>
        <Col>
          <Button onClick={handlerLogout}>Cerrar sesión</Button>
        </Col>
      </Row>
      <br />
      <Col>
        <ToggleTheme />
      </Col>
      <Products
        instrumentSelected={productSelected}
        products={ProductsFilter}
      />
    </>
  );
};

export default Dashboard;
