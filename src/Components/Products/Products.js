import { memo } from "react";

import "./Products.css";

import ProductItem from "../productItem/ProductItem";

const Products = memo(({ products }) => {
  const productsMapped = products.map((products) => (
    <ProductItem
      key={products.id}
      instrument={products.instrument}
      price={products.price}
      seller={products.seller}
    />
  ));

  return (
    <div className="product">
      {productsMapped.length > 0 ? productsMapped : <h3>no</h3>}
    </div>
  );
});

export default Products;
