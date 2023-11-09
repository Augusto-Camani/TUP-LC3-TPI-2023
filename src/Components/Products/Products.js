import ProductItem from "../productItem/ProductItem";
import { PRODUCTS } from "../DashBoard/DashBoard";
import "./Product.css";

const Products = ({ Products }) => {
  const productMapped = PRODUCTS.map((Products, index) => (
    <ProductItem
      key={Products.id}
      instrument={Products.instrument}
      price={Products.price}
      seller={Products.seller}
    />
  ));

  return <div className="product">{productMapped}</div>;
};

export default Products;
