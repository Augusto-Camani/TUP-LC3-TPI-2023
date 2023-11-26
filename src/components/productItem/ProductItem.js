import { useEffect, useState } from "react";
import { Button, Card, CardGroup } from "react-bootstrap";

import { useAPI } from "../../services/apiContext/api.context";

const ProductItem = ({ product }) => {
  const { cart, setCart } = useAPI();
  const productInCart = cart.find((p) => p.id === product.id);
  const [inCart, setInCart] = useState(productInCart);

  useEffect(() => {
    if (!inCart) return;
    const timer = setTimeout(() => {
      setCart((prevCart) =>
        inCart.quantity === 0
          ? prevCart.filter((p) => p.id !== inCart.id)
          : productInCart
          ? prevCart.map((p) => (p.id === inCart.id ? inCart : p))
          : [...prevCart, inCart]
      );
    }, 300);
    return () => clearTimeout(timer);
  }, [inCart]);

  const addToCartHandler = () => {
    setCart((prevCart) => [
      ...prevCart,
      productInCart
        ? productInCart
        : {
            ...product,
            quantity: 0,
          },
    ]);
    setInCart({ ...product, quantity: 0 });
  };

  const decreaseHandler = () =>
    setInCart((prevInCart) => ({
      ...prevInCart,
      quantity: prevInCart.quantity - 1,
    }));

  const increaseHandler = () =>
    setInCart((prevInCart) => ({
      ...prevInCart,
      quantity: prevInCart.quantity + 1,
    }));

  return (
    <Card
      border="dark"
      style={{ width: "17rem", height: "17rem", margin: "1rem" }}
    >
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.instrument}</Card.Title>
        <Card.Subtitle>Precio: {product.price}</Card.Subtitle>
        <Card.Subtitle>Disponibilidad: {product.stock}</Card.Subtitle>
        <CardGroup className="mt-auto justify-content-center">
          {!inCart ? (
            <Button disabled={!product.stock} onClick={addToCartHandler}>
              Agregar al carrito
            </Button>
          ) : (
            <>
              <Button
                disabled={inCart.quantity === 0}
                onClick={decreaseHandler}
              >
                -
              </Button>
              <div>
                <p className="mx-2 my-1">{inCart.quantity}</p>
              </div>
              <Button
                disabled={inCart.quantity === product.stock}
                onClick={increaseHandler}
              >
                +
              </Button>
            </>
          )}
        </CardGroup>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
