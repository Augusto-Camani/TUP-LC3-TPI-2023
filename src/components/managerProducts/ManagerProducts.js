import React, { useEffect, useState } from "react";
import { useAPI } from "../../services/apiContext/api.context";
import useProducts from "../../custom/useAPIMethods/useProducts";
import { useAuth } from "../../services/authenticationContext/authentication.context";

const ManagerProducts = () => {
  const { user } = useAuth();
  const newInstrumentObject = { instrument: "", price: 0, stock: 0 };
  const [newInstrument, setNewInstrument] = useState(newInstrumentObject);
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState("");
  const [editedProduct, setEditedProduct] = useState(null);
  const [editID, setEditID] = useState(0);
  const { postProduct, putProduct, deleteProduct, productsFiltered } = useAPI();

  useProducts();

  useEffect(() => {
    const timer = setTimeout(() => {
      const isValid =
        newInstrument.instrument !== "" &&
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
    setEditedProduct(product);
    setEditID(product.id);
  };

  const cancelEditHandler = () => {
    setEditedProduct(null);
    setEditID(0);
  };

  const updateProductHandler = async (updatedProduct) => {
    try {
      await putProduct(updatedProduct, user.accessToken);
      // Aquí puedes realizar acciones adicionales después de la actualización
      setEditedProduct(null); // Restablecer editedProduct después de la actualización
      setEditID(0);
    } catch (error) {
      setError(error.message);
    }
  };

  function Edit({ product, updateProductHandler, cancelEditHandler }) {
    const [editedInstrument, setEditedInstrument] = useState({
      instrument: product.instrument,
      price: product.price,
      stock: product.stock,
    });

    const inputHandler = (e) => {
      setEditedInstrument((prevInstrument) => ({
        ...prevInstrument,
        [e.target.name]: e.target.value,
      }));
    };

    return (
      <tr>
        <td>
          <input
            type="text"
            name="instrument"
            value={editedInstrument.instrument}
            onChange={inputHandler}
          />
        </td>
        <td>
          <input
            type="number"
            name="price"
            min="1"
            step="1"
            value={editedInstrument.price}
            onChange={inputHandler}
          />
        </td>
        <td>
          <input
            type="number"
            name="stock"
            min="1"
            step="1"
            value={editedInstrument.stock}
            onChange={inputHandler}
          />
        </td>
        <td>
          <button
            type="button"
            onClick={() => updateProductHandler(editedInstrument)}
          >
            update
          </button>
          <button type="button" onClick={cancelEditHandler}>
            cancel
          </button>
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
          <button
            disabled={!formValid}
            type="button"
            onClick={addProductHandler}
          >
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
        <tbody>
          {productsFiltered.map((product, index) =>
            product.id === editID ? (
              <Edit
                key={index}
                product={editedProduct}
                updateProductHandler={updateProductHandler}
                cancelEditHandler={cancelEditHandler}
              />
            ) : (
              <tr key={index}>
                <td>{product.id}</td>
                <br />
                <td>{product.instrument}</td>
                <br />
                <td>{product.price}</td>
                <br />
                <td>{product.stock}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => editProductHandler(product)}
                  >
                    edit
                  </button>
                  <button type="button">delete</button>
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
