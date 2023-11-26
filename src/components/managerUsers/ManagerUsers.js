import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

import { useAPI } from "../../services/apiContext/api.context";
import { useAuth } from "../../services/authenticationContext/authentication.context";
import EditUser from "../editUser/EditUser";
import NewUser from "../newUser/NewUser";

const ManagerUsers = () => {
  const { toggleLoading, users, setUsers } = useAPI();
  const { accessToken } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  const catchRejectedFetch = () => {
    throw new Error("Error de servidor. Intentelo de nuevo más tarde");
  };

  useEffect(() => {
    if (users.length > 0) return;
    toggleLoading(true);
    fetch("http://localhost:8000/users", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken()}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error(
            "Hubo un problema. Si el problema persiste contacte a soporte"
          );
      }, catchRejectedFetch)
      .then((usersData) => {
        setUsers(usersData);
      })
      .catch((error) => console.log(error.message))
      .finally(() => toggleLoading(false));
  }, []);

  const deleteUser = async (id) => {
    toggleLoading(true);
    await fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken()}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error("No se pudo eliminar el usuario. Intentelo de nuevo");
      }, catchRejectedFetch)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== id));
      })
      .finally(() => toggleLoading(false));
  };

  const isAddingHandler = () => setIsAdding((prev) => !prev);

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

  const confirmDelete = async () => {
    try {
      await deleteUser(idToDelete);
      setIsDeleting(false);
      setIdToDelete(0);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      {!isAdding && !isEditing && (
        <Button
          className="d-flex justify-content-center m-auto my-5 p-3"
          onClick={isAddingHandler}
        >
          Agregar nuevo usuario
        </Button>
      )}
      <div className="container d-flex justify-content-center m-auto my-5 p-3">
        {!isEditing && !isAdding && (
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
                          className="mx-1 p-1"
                          onClick={() => isEditingHandler(user)}
                        >
                          Editar
                        </Button>
                        <Button
                          className="mx-1 p-1"
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
                          <Button
                            className="m-auto p-1"
                            onClick={confirmDelete}
                          >
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
        )}
        {isEditing && !isAdding && (
          <EditUser user={currentUser} handleIsEditing={isEditingHandler} />
        )}
        {isAdding && !isEditing && <NewUser handleIsAdding={isAddingHandler} />}
      </div>
    </>
  );
};

export default ManagerUsers;
