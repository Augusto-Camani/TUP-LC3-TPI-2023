import { useAPI } from "../../services/apiContext/api.context";
import { useProducts } from "../../custom/useAPIMethods/useAPIMethods";
import ProductItem from "../productItem/ProductItem";

const Products = () => {
  const { products } = useAPI();

  useProducts();

  const productsMapped = products.map((product, index) => (
    <ProductItem
      key={index}
      product={{
        id: product.id,
        instrument: product.instrument,
        price: product.price,
        stock: product.stock,
      }}
    />
  ));

  return (
    <div className="d-flex flex-wrap justify-content-center p-1">
      {productsMapped.length > 0 ? (
        productsMapped
      ) : (
        <h3>No se encontraron productos</h3>
      )}
    </div>
  );
};

export default Products;
