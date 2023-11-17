import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

import { useAPI } from "../../services/apiContext/api.context";
import { useAuth } from "../../services/authenticationContext/authentication.context";
import useCatchRejectedFetch from "../../custom/useCatchRejectedFetch/useCatchRejectedFetch";
import EditUser from "../editUser/EditUser";

const ManagerProducts = () => {
  const { toggleLoading, users, setUsers } = useAPI();
  const { accessToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  useEffect((token) => {
    if (users.length > 0) return;
    toggleLoading(true);
    fetch("https://tuxguitarsapi.onrender.com/users", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error(
            "Hubo un problema. Si el problema persiste contacte a soporte"
          );
      }, useCatchRejectedFetch)
      .then((usersData) => {
        setUsers(usersData);
      })
      .catch((error) => console.log(error.message))
      .finally(() => toggleLoading(false));
  }, []);

  const deleteUser = async (id, token) => {
    toggleLoading(true);
    await fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error("No se pudo eliminar el usuario. Intentelo de nuevo");
      }, useCatchRejectedFetch)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== id));
      })
      .catch((error) => console.log(error.message))
      .finally(() => toggleLoading(false));
  };

  const isEditingHandler = (user = {}) => {
    setCurrentUser(user);
    setIsEditing((prev) => !prev);
  };

  const deleteUserHandler = (id) => {
    setIsDeleting(true);
    setIdToDelete(id);
  };

  const cancelDelete = () => {
    setIsDeleting(false);
    setIdToDelete(0);
  };

  const confirmDelete = () => {
    setIsDeleting(false);
    setIdToDelete(0);
    deleteUser(idToDelete, accessToken);
  };

  return (
    <div className="container d-flex justify-content-center m-auto my-5 p-3">
      {!isEditing ? (
        <Table striped bordered hover className="w-auto">
          <thead className="text-center">
            <tr>
              <th>ID</th>
              <th>EMAIL</th>
              <th>CONTRASEÑA</th>
              <th>TIPO DE USUARIO</th>
              <th>OPCIONES</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.userType}</td>
                <td className="d-flex justify-content-evenly">
                  {idToDelete !== user.id ? (
                    <>
                      <Button
                        className="m-auto p-1"
                        onClick={() => isEditingHandler(user)}
                      >
                        Editar
                      </Button>
                      <Button
                        className="m-auto p-1"
                        onClick={() => {
                          deleteUserHandler(user.id);
                        }}
                      >
                        Borrar
                      </Button>
                    </>
                  ) : (
                    isDeleting && (
                      <>
                        <Button className="m-auto p-1" onClick={cancelDelete}>
                          Cancelar
                        </Button>
                        <Button className="m-auto p-1" onClick={confirmDelete}>
                          Confirmar
                        </Button>
                      </>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <EditUser
          user={currentUser}
          token={accessToken}
          handleEdit={isEditingHandler}
        />
      )}
    </div>
  );
};

export default ManagerProducts;
