import React, { useState } from "react";
import { useAPI } from "../../services/apiContext/api.context";
import Table from "react-bootstrap/Table";
import EditProduct from "../editProduct/EditProduct";
import { useAuth } from "../../services/authenticationContext/authentication.context";

const ManagerProducts = () => {
  const { productsFiltered, deleteProduct } = useAPI();
  const { accessToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const { getUsers, usersFiltered, users } = useAPI();

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
              <th>nombre</th>
              <th>mail</th>
            </tr>
          </thead>
          <tbody>
            {usersFiltered.map((users, index) => (
              <tr key={index}>
                <td>{users.id}</td>
                <td>{users.name}</td>
                <td>{users.mail}</td>
                <td>
                  <button onClick={editHandler}>Editar</button>
                  <button
                    onClick={() => {
                      deleteProductHandler(users.id);
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
