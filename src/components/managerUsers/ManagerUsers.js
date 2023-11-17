import React, { useEffect, useState } from "react";
import { useAPI } from "../../services/apiContext/api.context";
import Table from "react-bootstrap/Table";

import { useAuth } from "../../services/authenticationContext/authentication.context";
import EditUser from "../editUser/EditUser";

const ManagerProducts = () => {
  const { deleteProduct } = useAPI();
  const { accessToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const { getUsers, usersFiltered, users } = useAPI();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (users.length > 0) return;
    getUsers(accessToken);
  }, []);

  const editHandler = (user = {}) => {
    setCurrentUser(user);
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
              <th>mail</th>
              <th>contraseña</th>
              <th>tipo de usuario</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.userType}</td>
                <td>
                  <button onClick={() => editHandler(user)}>Editar</button>
                  <button
                    onClick={() => {
                      deleteProductHandler(user.id);
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
        <EditUser
          token={accessToken}
          handleEdit={editHandler}
          user={currentUser}
        />
      )}
    </>
  );
};

export default ManagerProducts;
