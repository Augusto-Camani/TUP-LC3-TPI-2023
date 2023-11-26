import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import { useAPI } from "../../services/apiContext/api.context";
import { useAuth } from "../../services/authenticationContext/authentication.context";

const NewProduct = ({ handleIsAdding }) => {
  const { toggleLoading, products, setProducts } = useAPI();
  const { accessToken } = useAuth();
  const productObject = { instrument: "", price: "", stock: "" };
  const [product, setProduct] = useState(productObject);
  const [formValid, setFormValid] = useState(false);

  const postProduct = async () => {
    const newProduct = { id: products[products.length - 1].id + 1, ...product };

    await fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken()}`,
      },
      body: JSON.stringify(newProduct),
    })
      .then(
        (response) => {
          if (response.ok) return response.json();
          else
            throw new Error(
              "No se pudo agregar el producto. Intentelo de nuevo"
            );
        },
        () => {
          throw new Error("Error de servidor. Intentelo de nuevo más tarde");
        }
      )
      .then(() => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const isValid =
        product.instrument !== "" && product.price !== 0 && product.stock !== 0;
      setFormValid(isValid);
    }, 300);
    return () => clearTimeout(timer);
  }, [product]);

  const addHandler = () => handleIsAdding();

  const changeHandler = ({ target: { value, type, name } }) =>
    setProduct((prevInstrument) => ({
      ...prevInstrument,
      [name]:
        type === "number"
          ? value.length > 0
            ? parseInt(value)
            : value
          : value,
    }));

  const saveNewHandler = async () => {
    try {
      toggleLoading(true);
      await postProduct();
      setProduct(productObject);
      addHandler();
    } catch (error) {
      alert(error);
    } finally {
      toggleLoading(false);
    }
  };

  return (
    <div className="container w-50">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Instrumento</Form.Label>
          <Form.Control
            type="text"
            name="instrument"
            value={product.name}
            onChange={changeHandler}
            placeholder="ejemplo: Guitarra"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={changeHandler}
            placeholder="ejemplo: 100000"
            min="1"
            step="1"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cantidad disponible</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={product.stock}
            onChange={changeHandler}
            placeholder="ejemplo: 100"
            min="1"
            step="1"
          />
        </Form.Group>
        <Form.Group>
          <Button onClick={addHandler}>Cancelar</Button>
          <Button disabled={!formValid} onClick={saveNewHandler}>
            Agregar Producto
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewProduct;
