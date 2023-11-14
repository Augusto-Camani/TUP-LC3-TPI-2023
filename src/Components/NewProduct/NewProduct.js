import { memo } from "react";

import ProductForm from "../ProductForm/ProductForm";

import "./NewProduct.css";

const NewProduct = memo(({ onProductSaved }) => {
  const saveProductHandler = (product) => {
    onProductSaved(product);
  };
  return (
    <div className="new-product">
      <ProductForm onSaveProduct={saveProductHandler} />
    </div>
  );
});

export default NewProduct;
