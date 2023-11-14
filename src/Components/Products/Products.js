import ProductItem from "../productItem/ProductItem";
import { PRODUCTS } from "../productsPage/ProductsPage";
import { memo } from "react";
import "./Products.css";

const Products = memo(({ products }) => {
  console.log("In Books");
  const productMapped = PRODUCTS.map((products, index) => (
    <ProductItem
      key={products.id}
      instrument={products.instrument}
      price={products.price}
      seller={products.seller}
    />
  ));

  return (
    <div className="product">
      {productMapped.length > 0 ? productMapped : <h3>no</h3>}
    </div>
  );
});

export default Products;
