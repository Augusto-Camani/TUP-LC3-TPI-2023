import "./NewProduct.css";

import { useAPI } from "../../services/apiContext/api.context";
import { useGetProducts } from "../../custom/useAPIMethods/useAPIMethods";
import ProductForm from "../productForm/ProductForm";

const NewProduct = () => {
  const { postProducts } = useAPI();
  const saveProductHandler = (product) => {
    postProducts(product);
  };

  useGetProducts();

  return (
    <div className="new-product">
      <ProductForm onSaveProduct={saveProductHandler} />
    </div>
  );
};

export default NewProduct;
