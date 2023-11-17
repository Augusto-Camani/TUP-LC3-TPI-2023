import "./Products.css";

import { useAPI } from "../../services/apiContext/api.context";
import useProducts from "../../custom/useAPIMethods/useProducts";
import ProductItem from "../productItem/ProductItem";

const Products = () => {
  const { products } = useAPI();

  useProducts();

  const productsMapped = products.map((product) => (
    <ProductItem product={product} />
  ));

  return (
    <div className="Dashboard d-flex flex-wrap">
      {productsMapped.length > 0 ? (
        productsMapped
      ) : (
        <h3>No se encontraron productos</h3>
      )}
    </div>
  );
};

export default Products;
