import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import "./NewProduct.css";

import { useAPI } from "../../services/apiContext/api.context";

const NewProduct = ({ token, handleisAdding }) => {
  const { postProduct } = useAPI();
  const productObject = { instrument: "", price: 0, stock: 0 };
  const [product, setProduct] = useState(productObject);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isValid =
        product.instrument !== "" && product.price !== 0 && product.stock !== 0;
      setFormValid(isValid);
    }, 300);
    return () => clearTimeout(timer);
  }, [product]);

  const addHandler = () => handleisAdding();

  const changeHandler = ({ target: { value, type, name } }) =>
    setProduct((prevInstrument) => ({
      ...prevInstrument,
      [name]: type === "number" ? parseInt(value) : value,
    }));

  const saveNewHandler = () => {
    postProduct(product, token);
    setProduct(productObject);
    addHandler();
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
