import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useAPI } from "../../services/apiContext/api.context";
import { useAuth } from "../../services/authenticationContext/authentication.context";
import {
  useProducts,
  useSales,
} from "../../custom/useAPIMethods/useAPIMethods";
import CartItem from "../cartItem/CartItem";

const Cart = () => {
  const { products, cart, setCart, putProduct, postSale } = useAPI();
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const [sale, setSale] = useState({ userID: user.id, content: cart });

  useProducts();

  useSales();

  useEffect(
    () => setSale((prevSale) => ({ ...prevSale, content: cart })),
    [cart]
  );

  const buyHandler = async () => {
    await postSale(sale, accessToken());

    cart.forEach((product) => {
      const productToUpdate = products.find((p) => p.id === product.id);
      putProduct(
        {
          ...productToUpdate,
          stock: productToUpdate.stock - product.quantity,
        },
        accessToken()
      );
    });
    setCart([]);
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
    </div>
  );
};

export default Cart;
