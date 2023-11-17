import { createContext, useContext, useState } from "react";

import useCatchRejectedFetch from "../../custom/useCatchRejectedFetch/useCatchRejectedFetch";

const APIContext = createContext();

export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) throw new Error("There is no API provider");
  return context;
};

export const APIContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const toggleLoading = (value) => {
    setIsLoading(value);
  };

  //Mover a sus respectivos componentes NewProduct, EditProduct, DeleteProduct
  const postProduct = async (product, token) => {
    toggleLoading(true);
    const newProduct = { id: products[products.length - 1].id + 1, ...product };

    await fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error("No se pudo agregar el producto. Intentelo de nuevo");
      }, useCatchRejectedFetch)
      .then(() => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
      })
      .catch((error) => console.log(error.message))
      .finally(() => toggleLoading(false));
  };

  const putProduct = async (product, token) => {
    await fetch(`http://localhost:8000/products/${product.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error("No se pudo editar el producto. Intentelo de nuevo");
      }, useCatchRejectedFetch)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === product.id ? product : p))
        );
      })
      .catch((error) => console.log(error.message))
      .finally(() => toggleLoading(false));
  };

  //Mover a sus respectivos componentes ManageUsers, NewUser, EditUser, DeleteUser

  const postUser = async (user, token) => {
    const newUser = { id: users[users.length - 1].id + 1, ...user };
    await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error("No se pudo agregar el usuario. Intentelo de nuevo");
      }, useCatchRejectedFetch)
      .then(() => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
      });
  };

  const putUser = async (user, token) => {
    await fetch(`http://localhost:8000/users/${user.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error("No se pudo editar el producto. Intentelo de nuevo");
      }, useCatchRejectedFetch)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === user.id ? user : u))
        );
      });
  };

  //Mover a sus respectivos componentes ManageSales, PurchaseHistory, Cart, EditSale, DeleteSale

  const getSales = async (token) => {
    toggleLoading(true);
    await fetch("http://localhost:8000/sales", {
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
      .then((salesData) => {
        setSales(salesData);
      })
      .catch((error) => console.log(error.message))
      .finally(() => toggleLoading(false));
  };

  const getPurchaseHistory = (id, token) => {
    if (sales.length > 0) return;
    fetch("http://localhost:8000/sales", {
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
      .then((salesData) => {
        setSales(salesData.filter((s) => s.userID === id));
      });
  };

  const postSale = async (sale, token) => {
    const newSale = { id: users[users.length - 1].id + 1, ...sale };
    await fetch("http://localhost:8000/sales", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newSale),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error(
            "No se pudo hacer la compra/venta. Intentelo de nuevo"
          );
      }, useCatchRejectedFetch)
      .then(() => {
        setSales((prevSales) => [...prevSales, newSale]);
      });
  };

  const putSale = async (sale, token) => {
    await fetch(`http://localhost:8000/sales/${sale.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sale),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("No se pudo editar la venta. Intentelo de nuevo");
      }, useCatchRejectedFetch)
      .then(() => {
        setSales((prevSales) =>
          prevSales.map((s) => (s.id === sale.id ? sale : s))
        );
      });
  };

  const deleteSale = async (id, token) => {
    await fetch(`http://localhost:8000/sales/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error("No se pudo eliminar la venta. Intentelo de nuevo");
      }, useCatchRejectedFetch)
      .then(() => {
        setSales((prevSales) => prevSales.filter((s) => s.id !== id));
      });
  };

  return (
    <APIContext.Provider
      value={{
        isLoading,
        toggleLoading,
        users,
        setUsers,
        sales,
        setSales,
        products,
        setProducts,
        cart,
        setCart,
        postProduct,
        putProduct,
        postUser,
        putUser,
        getSales,
        getPurchaseHistory,
        postSale,
        putSale,
        deleteSale,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
