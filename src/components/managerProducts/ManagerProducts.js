import { useState } from "react";
import { Button, Table } from "react-bootstrap";

import { useAPI } from "../../services/apiContext/api.context";
import { useAuth } from "../../services/authenticationContext/authentication.context";
import { useProducts } from "../../custom/useAPIMethods/useAPIMethods";
import EditProduct from "../editProduct/EditProduct";
import NewProduct from "../newProduct/NewProduct";

const ManagerProducts = () => {
  const { toggleLoading, products, setProducts } = useAPI();
  const { accessToken } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);
  const [currentProduct, setCurrentProduct] = useState({});

  useProducts();

  const deleteProduct = async (id) => {
    toggleLoading(true);
    await fetch(`https://tuxguitarsapi.onrender.com/products/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken()}`,
      },
    })
      .then(
        (response) => {
          if (response.ok) return response.json();
          else
            throw new Error(
              "No se pudo eliminar el producto. Intentelo de nuevo"
            );
        },
        () => {
          throw new Error("Error de servidor. Intentelo de nuevo más tarde");
        }
      )
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
      })
      .finally(() => toggleLoading(false));
  };

  const isAddingHandler = () => setIsAdding((prev) => !prev);

  const isEditingHandler = (product = {}) => {
    setCurrentProduct(product);
    setIsEditing((prev) => !prev);
  };

  const deleteProductHandler = (id) => {
    setIsDeleting(true);
    setIdToDelete(id);
  };

  const cancelDelete = () => {
    setIsDeleting(false);
    setIdToDelete(0);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(idToDelete);
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
          Agregar nuevo instrumento
        </Button>
      )}
      <div className="container d-flex justify-content-center m-auto my-5 p-3">
        {!isEditing &&
          !isAdding &&
          (products.length > 0 ? (
            <Table striped bordered hover className="w-auto">
              <thead className="text-center">
                <tr>
                  <th>ID</th>
                  <th>INSTRUMENTO</th>
                  <th>PRECIO</th>
                  <th>STOCK</th>
                  <th>OPCIONES</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td className="text-center">{product.id}</td>
                    <td className="text-break">{product.instrument}</td>
                    <td className="text-end">${product.price}</td>
                    <td className="text-end">{product.stock}</td>
                    <td className="d-flex justify-content-evenly">
                      {idToDelete !== product.id ? (
                        <>
                          <Button
                            className="p-1"
                            onClick={() => isEditingHandler(product)}
                          >
                            Editar
                          </Button>
                          <Button
                            className="ms-1 p-1"
                            variant="danger"
                            onClick={() => {
                              deleteProductHandler(product.id);
                            }}
                          >
                            Borrar
                          </Button>
                        </>
                      ) : (
                        isDeleting && (
                          <>
                            <Button className="p-1" onClick={cancelDelete}>
                              Cancelar
                            </Button>
                            <Button
                              className="ms-1 p-1"
                              variant="danger"
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
          ) : (
            <h3>No se encontraron productos</h3>
          ))}
        {isEditing && !isAdding && (
          <EditProduct
            product={currentProduct}
            handleIsEditing={isEditingHandler}
          />
        )}
        {isAdding && !isEditing && (
          <NewProduct handleIsAdding={isAddingHandler} />
        )}
      </div>
    </>
  );
};

export default ManagerProducts;
