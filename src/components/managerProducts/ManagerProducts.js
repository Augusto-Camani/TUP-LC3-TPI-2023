import React, { useState } from "react";
import { useAPI } from "../../services/apiContext/api.context";
import useProducts from "../../custom/useAPIMethods/useProducts";
import Table from "react-bootstrap/Table";
import EditProduct from "../editProduct/EditProduct";
import { useAuth } from "../../services/authenticationContext/authentication.context";
const ManagerProducts = () => {
  const { productsFiltered, putProduct } = useAPI();
  const { accessToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  useProducts();
  const editHandler = () => {
    setIsEditing(true);
  };
  return (
    <>
      {!isEditing ? (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>id</th>
              <th>instrumento</th>
              <th>precio</th>
              <th>stock</th>
            </tr>
          </thead>
          <tbody>
            {productsFiltered.map((instrument, index) => (
              <tr key={index}>
                <td>{instrument.id}</td>
                <td>{instrument.instrument}</td>
                <td>{instrument.price}</td>
                <td>{instrument.stock}</td>
                <td>
                  <button onClick={editHandler}>Editar</button>
                  <button>Borrar </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <EditProduct token={accessToken} />
      )}
    </>
  );
};

export default ManagerProducts;
