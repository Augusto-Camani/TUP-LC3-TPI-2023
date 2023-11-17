import React from "react";
import NewProduct from "../newProduct/NewProduct";
import { useAPI } from "../../services/apiContext/api.context";
import useProducts from "../../custom/useAPIMethods/useProducts";

import "./ProductManager.css";

const ProductManager = () => {
  const { productsFiltered } = useAPI();

  useProducts();

  return (
    <div className="div-container">
      <div className="add">
        <NewProduct />
      </div>
      <div className="produtcs">
        <table>
          {" "}
          <tbody>
            <th>id</th>
            <br />
            <th>product</th>
            <br />
            <th>price</th>
            <br />
            <th>stock</th>
            {productsFiltered.map((instrument, index) => (
              <tr key={index}>
                <td>{instrument.id}</td>
                <br />
                <td>{instrument.instrument}</td>
                <br />
                <td>{instrument.price}</td>
                <br />
                <td>{instrument.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManager;
