import { useState } from "react";
import Table from "react-bootstrap/Table";

import { useAPI } from "../../services/apiContext/api.context";
import { useAuth } from "../../services/authenticationContext/authentication.context";
import useProducts from "../../custom/useAPIMethods/useProducts";
import EditProduct from "../editProduct/EditProduct";

const ManagerProducts = () => {
  const { products, deleteProduct } = useAPI();
  const { accessToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  useProducts();

  const isEditingHandler = (product = {}) => {
    setCurrentProduct(product);
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
                  <button onClick={() => isEditingHandler(product)}>
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      deleteProductHandler(product.id);
                    }}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <EditProduct
          product={currentProduct}
          token={accessToken}
          handleEdit={isEditingHandler}
        />
      )}
    </>
  );
};

export default ManagerProducts;
