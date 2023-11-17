import React, { useEffect, useState } from "react";
import { useAPI } from "../../services/apiContext/api.context";
import useProducts from "../../custom/useAPIMethods/useProducts";
import { Button, Form } from "react-bootstrap";

const EditProduct = ({ token, product, handleEdit }) => {
  const { productsFiltered, putProduct, deleteProduct } = useAPI();
  const [updateProduct, setUpdateProduct] = useState(product);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isValid =
        updateProduct.instrument !== "" &&
        updateProduct.price !== 0 &&
        updateProduct.stock !== 0;
      setFormValid(isValid);
    });
  });

  const editHandler = () => handleEdit();

  const changeHandler = ({ target: { value, type, name } }) => {
    setUpdateProduct((prevInstrument) => ({
      ...prevInstrument,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };
  const addChangeHandler = () => {
    putProduct({ id: 1, ...updateProduct }, token);
    setUpdateProduct(product);
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
            value={updateProduct.instrument}
            onChange={changeHandler}
            placeholder="instrumento"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ingrese el nuevo precio:</Form.Label>
          <Form.Control
            className="new-book-control"
            type="number"
            name="price"
            value={updateProduct.price}
            onChange={changeHandler}
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
            value={updateProduct.stock}
            onChange={changeHandler}
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
