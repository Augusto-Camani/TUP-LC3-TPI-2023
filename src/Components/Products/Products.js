import "./Products.css";

import ProductItem from "../productItem/ProductItem";

const Products = ({ products }) => {
  const productsMapped = products.map((products) => (
    <ProductItem
      instrument={products.instrument}
      price={products.price}
      stock={products.stock}
    />
  ));

  return (
    <div className="product">
      {productsMapped.length > 0 ? (
        productsMapped
      ) : (
        <h3>No se encontraron productos</h3>
      )}
    </div>
  );
};

export default Products;
