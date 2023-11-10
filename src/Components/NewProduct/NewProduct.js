import { Link } from "react-router-dom";
import ProductForm from "../productForm/ProductForm";
import "./NewProduct.css";

const NewProduct = ({ onProductSaved }) => {
  const saveProductHandler = ({ product }) => {
    onProductSaved(product);
  };
  return (
    <div className="new-book">
      <ProductForm onSaveProduct={saveProductHandler} />
    </div>
  );
};

export default NewProduct;
