import "./Products.css";

import { useAPI } from "../../services/apiContext/api.context";
import useProducts from "../../custom/useAPIMethods/useProducts";
import ProductItem from "../productItem/ProductItem";

const Products = () => {
  const { productsFiltered } = useAPI();

  useProducts();

  const productsMapped = productsFiltered.map((product) => (
    <ProductItem
      id={product.id}
      instrument={product.instrument}
      price={product.price}
      stock={product.stock}
    />
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
