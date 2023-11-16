import React from "react";
import { useAPI } from "../../services/apiContext/api.context";
import { useEffect, useState } from "react";
import useProducts from "../../custom/useAPIMethods/useProducts";

import "./ManagerProducts.css";
import { useAuth } from "../../services/authenticationContext/authentication.context";

const ManagerProducts = () => {
  const { user } = useAuth();
  const newInstrumentObject = { instrument: "", price: 0, stock: 0 };
  const [newInstrument, setNewInstrument] = useState(newInstrumentObject);
  const instrumentObject = { id: 0, instrument: "", price: 0, stock: 0 };
  const [instrument, setInstrument] = useState(instrumentObject);
  const [formValid, setFormValid] = useState(false);
  const [editId, setEditId] = useState(0);
  const [error, setError] = useState("");

  const { postProduct, putProduct, deleteProduct, productsFiltered } = useAPI();

  useProducts();
  useEffect(() => {
    const timer = setTimeout(() => {
      const isValid =
        newInstrument.name !== "" &&
        newInstrument.price !== 0 &&
        newInstrument.stock !== 0;
      setFormValid(isValid);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [newInstrument]);

  const changeHandler = ({ target: { value, type, name } }) => {
    setNewInstrument((prevInstrument) => ({
      ...prevInstrument,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const addProductHandler = () => {
    try {
      postProduct(newInstrument, user.accessToken);
    } catch (error) {
      setError(error.message);
    }
    setNewInstrument(newInstrumentObject);
  };

  const editProductHandler = (product) => {
    putProduct(product);
  };

  const deleteProductHandler = (product) => {
    deleteProduct(product.id);
  };

  function Edit() {
    return (
      <tr>
        <td>
          <input
            type="text"
            name="instrument"
            placeholder="nombre del instrumento "
            value={instrument.instrument}
            onChange={"changeHandler"}
          />
        </td>
        <td>
          <input
            type="number"
            name="price"
            min="1"
            step="1"
            placeholder="10 "
            value={instrument.price}
            onChange={"changeHandler"}
          />
        </td>
        <td>
          <input
            type="number"
            name="stock"
            min="1"
            step="1"
            placeholder="stock del instrumento "
            value={instrument.stock}
            onChange={"changeHandler"}
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
        <form>
          <input
            type="text"
            name="instrument"
            placeholder="nombre del instrumento "
            value={newInstrument.instrument}
            onChange={changeHandler}
          />
          <input
            type="number"
            name="price"
            min="1"
            step="1"
            placeholder="10 "
            value={newInstrument.price}
            onChange={changeHandler}
          />
          <input
            type="number"
            name="stock"
            min="1"
            step="1"
            placeholder="stock del instrumento "
            value={newInstrument.stock}
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
              <Edit current={instrument} list={[]} />
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
                  <button onClick={() => editProductHandler(instrument)}>
                    edit
                  </button>
                  <button>delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ManagerProducts;
