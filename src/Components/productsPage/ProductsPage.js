import { Button, Col, Row } from "react-bootstrap";

import "./ProductsPage.css";

import { useAPI } from "../../services/apiContext/api.context";
import { useGetProducts } from "../../custom/useAPIMethods/useAPIMethods";
import Products from "../products/Products";

const ProductsPage = () => {
  const { productsFiltered } = useAPI();

  useGetProducts();

  return (
    <div className="DashBoard">
      <Row className="DashBoard"></Row>
      <br />
      <Products products={productsFiltered} />
    </div>
  );
};

export default ProductsPage;
