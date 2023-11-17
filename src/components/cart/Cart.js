import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../../services/authenticationContext/authentication.context";
import { useAPI } from "../../services/apiContext/api.context";
import CartItem from "../cartItem/CartItem";

const Cart = () => {
  const { user, accessToken } = useAuth();
  const { products, cart, setCart, putProduct, postSale } = useAPI();
  const navigate = useNavigate();
  const [sale, setSale] = useState({ userID: user.id, content: cart });
  const [error, setError] = useState();

  useEffect(
    () => setSale((prevSale) => ({ ...prevSale, content: cart })),
    [cart]
  );

  const buyHandler = () => {
    try {
      postSale(sale, accessToken);
      cart.forEach((product) => {
        const editedProduct = products.find((p) => p.id === product.id);
        putProduct(
          {
            ...editedProduct,
            stock: product.stock - editedProduct.quantity,
          },
          accessToken
        );
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {cart.length > 0 ? (
        cart.map((product) => <CartItem product={product} setCart={setCart} />)
      ) : (
        <h1>No hay productos en el carrito</h1>
      )}
      <button
        onClick={
          cart.length > 0
            ? buyHandler
            : () => {
                navigate("/products");
              }
        }
      >
        {cart.length > 0 ? "Finalizar compra" : "Volver a productos"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Cart;
