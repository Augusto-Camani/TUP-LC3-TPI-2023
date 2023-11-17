import React from "react";

const CartItem = ({ product, setCart }) => {
  const deleteFromCartHandler = () => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== product.id));
  };
  return (
    <div>
      <h1>{product.instrument}</h1>
      <h2>{product.price}</h2>
      <button onClick={deleteFromCartHandler}>Eliminar del carrito</button>
    </div>
  );
};

export default CartItem;
