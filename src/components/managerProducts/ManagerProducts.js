import React, { useState } from "react";
import { useAPI } from "../../services/apiContext/api.context";
import useProducts from "../../custom/useAPIMethods/useProducts";
import Table from "react-bootstrap/Table";
import EditProduct from "../editProduct/EditProduct";
import { useAuth } from "../../services/authenticationContext/authentication.context";

const ManagerProducts = () => {
  const { products, deleteProduct } = useAPI();
  const { accessToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  useProducts();
  const editHandler = () => {
    setIsEditing((prev) => !prev);
  };
  const deleteProductHandler = (id) => {
    deleteProduct(id, accessToken);
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
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.instrument}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={editHandler}>Editar</button>
                  <button
                    onClick={() => {
                      deleteProductHandler(product.id);
                    }}
                  >
                    Borrar{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <EditProduct token={accessToken} handleEdit={editHandler} />
      )}
    </>
  );
};

export default ManagerProducts;
