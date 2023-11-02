import ProductItem from "../productItem/ProductItem";
import { PRODUCTS } from "../DashBoard/DashBoard";

const Products = ({ Products }) => {
  const productMapped = PRODUCTS.map((Products, index) => (
    <ProductItem
      key={Products.id}
      instrument={Products.instrument}
      price={Products.price}
      seller={Products.seller}
    />
  ));

  return <div className="books">{productMapped}</div>;
};

export default Products;
