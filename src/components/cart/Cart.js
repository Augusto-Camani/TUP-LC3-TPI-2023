import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Table } from "react-bootstrap";

import { useAPI } from "../../services/apiContext/api.context";
import { useAuth } from "../../services/authenticationContext/authentication.context";
import {
  useProducts,
  useSales,
} from "../../custom/useAPIMethods/useAPIMethods";

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
    const newSale = {
      id: sales.length > 0 ? sales.slice(-1)[0].id + 1 : 1,
      ...sale,
    };
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

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== id));
  };

  return (
    <div
      className="d-flex flex-column m-auto my-3"
      style={{ minWidth: "30rem", maxWidth: "90%" }}
    >
      {cart.length > 0 ? (
        <Table striped hover className="mb-3">
          <thead>
            <tr>
              <th>Instrumento</th>
              <th className="text-end">Cantidad</th>
              <th className="text-end">Precio</th>
              <th className="text-end">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product, index) => (
              <tr key={index}>
                <td className="text-break">{product.instrument}</td>
                <td className="text-end">{product.quantity}</td>
                <td className="text-end">{product.price}</td>
                <td className="text-end">{product.quantity * product.price}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td />
              <td className="text-end">
                <b>Precio final:</b>
              </td>
              <td>
                <b>
                  $
                  {cart.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </b>
              </td>
            </tr>
          </tfoot>
        </Table>
      ) : (
        <h1>No hay productos en el carrito</h1>
      )}
      <div className="d-flex align-self-center justify-content-between w-100 mb-3">
        <Button variant="secondary" onClick={() => navigate("/products")}>
          Volver a productos
        </Button>
        <Button variant="success">Finalizar compra</Button>
      </div>
    </div>
  );
};

export default Cart;
