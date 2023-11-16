import React from "react";
import { useAPI } from "../../services/apiContext/api.context";
import { useEffect, useState } from "react";
import useProducts from "../../custom/useAPIMethods/useProducts";
import Products from "../products/Products";

import { Await } from "react-router";
import "./ManagerProducts.css";
import { Button } from "bootstrap";

const ManagerProducts = () => {
  const instrumentObject = { instrument: "", price: 0, stock: 0 };
  const [instrument, setInstrument] = useState(instrumentObject);
  const [formValid, setFormValid] = useState(false);

  const [editId, setEditId] = useState(-1);
  const {
    toggleLoading,
    deleteProduct,
    putProduct,
    postProduct,
    setProducts,
    productsFiltered,
  } = useAPI();

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
    postProduct(instrument);
    setInstrument(instrumentObject);
  };
  const handlerEdit = (id) => {
    setEditId(id);
  };

  function handlerDelete(id){
    const new
  }
  function Edit() {
    return (
      <tr>
        <td>
          <input
            type="text"
            placeholder="nombre del instrumento "
            value={instrument.instrument}
          />
        </td>
        <td>
          <input
            type="number"
            min="1"
            step="1"
            placeholder="10 "
            value={instrument.price}
          />
        </td>
        <td>
          <input
            type="number"
            min="1"
            step="1"
            placeholder="stock del instrumento "
            value={instrument.stock}
          />
        </td>
        <td>
          <button type="submit">update</button>
        </td>
      </tr>
    );
  }

  return (
    <div className="container">
      <div>
        <form action="">
          <input
            type="text"
            placeholder="nombre del instrumento "
            value={instrument.instrument}
            onChange={changeHandler}
          />
          <input
            type="number"
            min="1"
            step="1"
            placeholder="10 "
            value={instrument.price}
            onChange={changeHandler}
          />
          <input
            type="number"
            min="1"
            step="1"
            placeholder="stock del instrumento "
            value={instrument.stock}
            onChange={changeHandler}
          />
          <button disabled={!formValid} onClick={addProductHandler}>
            add
          </button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <br />
            <th>product</th>
            <br />
            <th>price</th>
            <br />
            <th>stock</th>
          </tr>
        </thead>
        <tbody style={{}}>
          {productsFiltered.map((instrument, index) =>
            instrument.id === editId ? (
              <Edit current={instrument} list ={} />
            ) : (
              <tr key={index}>
                <td>{instrument.id}</td>
                <br />
                <td>{instrument.instrument}</td>
                <br />
                <td>{instrument.price}</td>
                <br />
                <td>{instrument.stock}</td>
                <td>
                  <button onClick={() => handlerEdit(instrument.id)}>
                    edit
                  </button>
                  <button>delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerProducts;
