import "./ProductItem.css";
import { useAPI } from "../../services/apiContext/api.context";

const ProductItem = ({ product }) => {
  const { setCart } = useAPI();

  const addToCartHandler = () => {
    setCart((prevCart) => [
      ...prevCart,
      prevCart.includes({ id: product.id })
        ? {}
        : {
            id: product.id,
            instrument: product.instrument,
            price: product.price,
            quantity: 1,
          },
    ]);
  };

  return (
    <div className="product-item-container">
      <h1>{product.instrument}</h1>
      <h2>Precio: {product.price}</h2>
      <h3>Disponibilidad: {product.stock}</h3>
      <button onClick={addToCartHandler}>Agregar al carrito</button>
    </div>
  );
};

export default ProductItem;
