import { createContext, useContext, useState } from "react";

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

  const catchRejectedFetch = () => {
    throw new Error("Error de servidor. Intentelo de nuevo más tarde");
  };

  const putProduct = (product, token) => {
    fetch(`http://localhost:8000/products/${product.id}`, {
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
      }, catchRejectedFetch)
      .then(() =>
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === product.id ? product : p))
        )
      );
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
          throw new Error("No se pudo editar el usuario. Intentelo de nuevo");
      }, catchRejectedFetch)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === user.id ? user : u))
        );
      });
  };

  const postSale = async (sale, token) => {
    const newSale = { id: sales[sales.length - 1].id + 1, ...sale };
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
      }, catchRejectedFetch)
      .then(() => {
        setSales((prevSales) => [...prevSales, newSale]);
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
        putProduct,
        putUser,
        postSale,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
