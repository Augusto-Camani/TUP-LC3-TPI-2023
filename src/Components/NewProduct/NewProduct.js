import ProductForm from "../ProductForm/ProductForm";
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
