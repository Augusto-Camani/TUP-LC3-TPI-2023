import { Button } from "react-bootstrap";

import "./ProductForm.css";

import { useEffect, useState } from "react";

const ProductForm = ({ onSaveProduct }) => {
  const [instrument, setInstrument] = useState("");
  const [price, setPrice] = useState("");
  const [seller, setSeller] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("check form");
      const isValid = instrument !== "" && price !== "" && seller !== "";
      setFormValid(isValid);
    }, 500);

    return () => {
      console.log("Cleanup");
      clearTimeout(timer);
    };
  }, [instrument, price, seller]);

  const changeInstrumentHandler = (event) => {
    setInstrument(event.target.value);
  };
  const changePriceHandler = (event) => {
    setPrice(event.target.value);
  };
  const changeSellerHandler = (event) => {
    setSeller(event.target.value);
  };
  const addProductHandler = () => {
    const newProduct = {
      instrument,
      price,
      seller,
    };
    onSaveProduct(newProduct);
    setInstrument("");
    setPrice("");
    setSeller("");
  };

  return (
    <form>
      <div>
        <div>
          <label>Instrumento</label>
          <input
            onChange={changeInstrumentHandler}
            type="text"
            className="input-control"
            value={instrument}
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            onChange={changePriceHandler}
            type="number"
            className="input-control"
            value={price}
            min="1"
            step="1"
          />
        </div>
        <div>
          <label>Vendedor</label>
          <input
            onChange={changeSellerHandler}
            type="text"
            className="input-control"
            value={seller}
          />
        </div>
      </div>
      <div>
        <Button>Cancelar</Button>
        <Button disabled={!formValid} onClick={addProductHandler}>
          Agregar Producto
        </Button>
      </div>
    </form>
  );
};
export default ProductForm;
