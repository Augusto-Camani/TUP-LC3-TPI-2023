import { useCallback, useEffect } from "react";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router";
import NewProduct from "../NewProduct/NewProduct";
import Products from "../Products/Products";

import "./ProductsPage.css";

export const PRODUCTS = [
  {
    id: 1,
    instrument: "bateria",
    price: 420,
    seller: "Baterias S.A",
  },
  {
    id: 2,
    instrument: "trompeta",
    price: 840,
    seller: "Trompetas S.A",
  },
  {
    id: 3,
    instrument: "guitarra",
    price: 1200,
    seller: "Guitarras S.R.L",
  },
];

const ProductsPage = () => {
  const [productSelected, setProductSelected] = useState("");
  const [products, setProducts] = useState(PRODUCTS);
  const [ProductsFilter, setProductsFilter] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products", {
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

  return (
    <div className="DashBoard">
      <>
        <Row className="DashBoard"></Row>
        <br />
        <Products products={ProductsFilter} />
      </>
    </div>
  );
};

export default ProductsPage;
