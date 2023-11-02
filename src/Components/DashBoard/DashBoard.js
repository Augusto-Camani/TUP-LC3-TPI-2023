import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router";
import NewProduct from "../NewProduct/NewProduct";
import Products from "../Products/Products";

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

  const appProductsHandler = (product) => {
    setProducts((prevProducts) => [product, ...prevProducts]);
    setProductsFilter((prevProducts) => [product, ...prevProducts]);

    const newProductId = products[products.length - 1].id + 1;

    fetch("http://localhost:3000/Products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: newProductId,
        instrument: products.instrument,
        price: products.price,
        seller: products.seller,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error("The response had some errors");
        }
      })
      .then(() => {
        const newProductArray = [
          { ...products, id: newProductId },
          ...products,
        ];
        setProducts(newProductArray);
        setProductsFilter(newProductArray);
      })
      .catch((error) => console.log(error));
  };

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
      <NewProduct onProductSaved={appProductsHandler} />
      <Products
        instrumentSelected={productSelected}
        products={ProductsFilter}
      />
    </>
  );
};

export default Dashboard;
