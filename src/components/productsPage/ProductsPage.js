import { Button, Col, Row } from "react-bootstrap";

import "./ProductsPage.css";

import { useAPI } from "../../services/apiContext/api.context";
import useProducts from "../../custom/useAPIMethods/useProducts";
import Products from "../products/Products";

import { Link } from "react-router-dom";

const ProductsPage = () => {
  const { productsFiltered } = useAPI();

  useProducts();

  return (
    <div className="DashBoard">
      <Row className="DashBoard"></Row>
      <br />
      <Products products={productsFiltered} />
    </div>
  );
};

export default ProductsPage;
