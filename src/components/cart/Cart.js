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
  const {
    sales,
    setSales,
    products,
    cart,
    setCart,
    setPurchaseHistory,
    putProduct,
  } = useAPI();
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const [sale, setSale] = useState({ userID: user.id, content: cart });

  useProducts();

  useSales();

  useEffect(
    () => setSale((prevSale) => ({ ...prevSale, content: cart })),
    [cart]
  );

  const postSale = async () => {
    const newSale = { id: sales[sales.length - 1].id + 1, ...sale };
    await fetch("http://localhost:8000/sales", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken()}`,
      },
      body: JSON.stringify(newSale),
    })
      .then(
        (response) => {
          if (response.ok) return response.json();
          else
            throw new Error(
              "No se pudo realizar la compra. Intentelo de nuevo"
            );
        },
        () => {
          throw new Error(
            "Ha habido un problema. Intentelo de nuevo más tarde"
          );
        }
      )
      .then(() => {
        setSales((prevSales) => [...prevSales, newSale]);
        setPurchaseHistory((prevHistory) => [...prevHistory, newSale]);
      });
  };

  const buyHandler = async () => {
    try {
      await cart.forEach((product) => {
        const productToUpdate = products.find((p) => p.id === product.id);
        putProduct(
          {
            ...productToUpdate,
            stock: productToUpdate.stock - product.quantity,
          },
          accessToken()
        );
      });
      await postSale();
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
    } catch (error) {
      alert(error.message);
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
    </div>
  );
};

export default Cart;
