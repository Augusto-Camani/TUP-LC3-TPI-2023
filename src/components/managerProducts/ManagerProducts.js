import { useState } from "react";
import { Button, Table } from "react-bootstrap";

import { useAPI } from "../../services/apiContext/api.context";
import { useAuth } from "../../services/authenticationContext/authentication.context";
import useProducts from "../../custom/useAPIMethods/useProducts";
import useCatchRejectedFetch from "../../custom/useCatchRejectedFetch/useCatchRejectedFetch";
import EditProduct from "../editProduct/EditProduct";
import NewProduct from "../newProduct/NewProduct";

const ManagerProducts = () => {
  const { products, setProducts } = useAPI();
  const { accessToken } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);
  const [currentProduct, setCurrentProduct] = useState({});

  useProducts();

  const deleteProduct = async (id, token) => {
    await fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error(
            "No se pudo eliminar el producto. Intentelo de nuevo"
          );
      }, useCatchRejectedFetch)
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
      });
  };

  const isEditingHandler = (product = {}) => {
    setCurrentProduct(product);
    setIsEditing((prev) => !prev);
  };

  const isAddingHandler = () => setIsAdding((prev) => !prev);

  const deleteProductHandler = (id) => {
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
    deleteProduct(idToDelete, accessToken);
  };

  return (
    <>
      {!isAdding && (
        <Button
          className="d-flex justify-content-center m-auto my-5 p-3"
          onClick={isAddingHandler}
        >
          Agregar nuevo instrumento
        </Button>
      )}
      <div className="container d-flex justify-content-center m-auto my-5 p-3">
        {isEditing && isAdding && (
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
                  <td>{product.id}</td>
                  <td>{product.instrument}</td>
                  <td className="text-end">$ {product.price}</td>
                  <td className="text-end">{product.stock}</td>
                  <td className="d-flex justify-content-evenly">
                    {idToDelete !== product.id ? (
                      <>
                        <Button
                          className="m-auto p-1"
                          onClick={() => isEditingHandler(product)}
                        >
                          Editar
                        </Button>
                        <Button
                          className="m-auto p-1"
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
        {isEditing && (
          <EditProduct
            product={currentProduct}
            token={accessToken}
            handleEdit={isEditingHandler}
          />
        )}
        {isAdding && (
          <NewProduct token={accessToken} handleIsAdding={isAddingHandler} />
        )}
      </div>
    </>
  );
};

export default ManagerProducts;
