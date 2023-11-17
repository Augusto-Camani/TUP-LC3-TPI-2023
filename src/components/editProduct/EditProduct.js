import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import { useAPI } from "../../services/apiContext/api.context";

const EditProduct = ({ product, token, handleEdit }) => {
  const { putProduct } = useAPI();
  const productObjet = { ...product };
  const [updatedProduct, setUpdatedProduct] = useState(productObjet);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isValid =
        updatedProduct.instrument !== "" &&
        updatedProduct.price !== 0 &&
        updatedProduct.stock !== 0;
      setFormValid(isValid);
    }, 300);
    return () => clearTimeout(timer);
  }, [updatedProduct]);

  const editHandler = () => handleEdit();

  const changeHandler = ({ target: { value, type, name } }) => {
    setUpdatedProduct((prevInstrument) => ({
      ...prevInstrument,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };
  const addChangeHandler = () => {
    putProduct({ ...product, ...updatedProduct, id: product.id }, token);
    setUpdatedProduct(productObjet);
    editHandler();
  };

  return (
    <div className="container w-50">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>ingrese el nuevo nombre del instrumento:</Form.Label>
          <Form.Control
            className="new-book-control"
            type="text"
            name="instrument"
            value={updatedProduct.instrument}
            onChange={changeHandler}
            placeholder={product.instrument}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ingrese el nuevo precio:</Form.Label>
          <Form.Control
            className="new-book-control"
            type="number"
            name="price"
            value={updatedProduct.price}
            onChange={changeHandler}
            placeholder={product.price}
            min="1"
            step="1"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ingrese el nuevo stock:</Form.Label>
          <Form.Control
            className="new-book-control"
            type="number"
            name="stock"
            value={updatedProduct.stock}
            onChange={changeHandler}
            placeholder={product.stock}
            min="1"
            step="1"
          />
        </Form.Group>
        <Form.Group>
          <Button onClick={editHandler}>Cancelar</Button>
          <Button disabled={!formValid} onClick={addChangeHandler}>
            Subir Producto
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditProduct;
