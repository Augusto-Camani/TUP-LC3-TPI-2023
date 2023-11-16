import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import "./NewProduct.css";

import useProducts from "../../custom/useAPIMethods/useProducts";
import { useAPI } from "../../services/apiContext/api.context";
import { useAuth } from "../../services/authenticationContext/authentication.context";

const NewProduct = () => {
  const instrumentObject = { instrument: "", price: 0, stock: 0 };
  const { postProduct } = useAPI();
  const { user } = useAuth();
  const [instrument, setInstrument] = useState(instrumentObject);
  const [formValid, setFormValid] = useState(false);

  useProducts();

  useEffect(() => {
    const timer = setTimeout(() => {
      const isValid =
        instrument.name !== "" &&
        instrument.price !== 0 &&
        instrument.stock !== 0;
      setFormValid(isValid);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [instrument]);

  const changeHandler = ({ target: { value, type, name } }) =>
    setInstrument((prevInstrument) => ({
      ...prevInstrument,
      [name]: type === "number" ? parseInt(value) : value,
    }));

  const addProductHandler = () => {
    postProduct(instrument, user.accessToken);
    setInstrument(instrumentObject);
  };

  return (
    <div className="new-product">
      <Form>
        <Form.Group className="new-book-controls">
          <Form.Label>Instrumento</Form.Label>
          <Form.Control
            className="new-book-control"
            type="text"
            name="instrument"
            value={instrument.name}
            onChange={changeHandler}
            placeholder="Guitarra"
          />
        </Form.Group>
        <Form.Group className="new-book-control">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            className="input-control"
            type="number"
            name="price"
            value={instrument.price}
            onChange={changeHandler}
            placeholder="100000"
            min="1"
            step="1"
          />
        </Form.Group>
        <Form.Group className="new-book-control">
          <Form.Label>Cantidad disponible</Form.Label>
          <Form.Control
            className="input-control"
            type="number"
            name="stock"
            value={instrument.stock}
            onChange={changeHandler}
            placeholder="10"
            min="1"
            step="1"
          />
        </Form.Group>
        <Form.Group className="new-book-actions">
          <Button as={Link} to="/products">
            Cancelar
          </Button>
          <Button
            disabled={!formValid}
            onClick={addProductHandler}
            as={Link}
            to="/products"
          >
            Agregar Producto
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewProduct;
