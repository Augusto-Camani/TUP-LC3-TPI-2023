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
  const [usersFiltered, setUsersFiltered] = useState(users);
  const [salesFiltered, setSalesFiltered] = useState(sales);
  const [productsFiltered, setProductsFiltered] = useState(products);

  const toggleLoading = (value) => {
    setIsLoading(value);
  };

  //Mover a sus respectivos componentes NewProduct, EditProduct, DeleteProduct
  const postProduct = async (product, token) => {
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
          throw new Error(
            "No se pudo agregar el producto. Intentelo de nuevo."
          );
      }, useCatchRejectedFetch)
      .then(() => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setProductsFiltered((prevProducts) => [...prevProducts, newProduct]);
      });
  };

  const putProduct = async (product) => {
    await fetch(`http://localhost:8000/products/${product.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error("No se pudo editar el producto. Intentelo de nuevo");
      }, useCatchRejectedFetch)
      .then(() => {
        setProducts((prevProducts) => [...prevProducts, product]);
        setProductsFiltered((prevProducts) => [...prevProducts, product]);
      });
  };

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
            "No se pudo eliminar el producto. Intentelo de nuevo más tarde"
          );
      }, useCatchRejectedFetch)
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
        setProductsFiltered((prevProducts) =>
          prevProducts.filter((p) => p.id !== id)
        );
      });
  };

  //Mover a sus respectivos componentes ManageUsers, NewUser, EditUser, DeleteUser

  const getUsers = async (token) => {
    await fetch("http://localhost:8000/users", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("The response had some errors");
      }, useCatchRejectedFetch)
      .then((usersData) => {
        setUsers(usersData);
        setUsersFiltered(usersData);
      });
  };

  const postUser = async (user, token) => {
    const newUser = { id: users[users.length - 1].id + 1, ...user };
    toggleLoading(true);
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
        else throw new Error("The response had some errors");
      }, useCatchRejectedFetch)
      .then(() => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setUsersFiltered((prevUsers) => [...prevUsers, newUser]);
      });
    toggleLoading(false);
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
        else throw new Error("The response had some errors");
      }, useCatchRejectedFetch)
      .then(() => {
        setUsers((prevUsers) => [...prevUsers, user]);
        setUsersFiltered((prevUsers) => [...prevUsers, user]);
      });
  };

  const deleteUser = async (id, token) => {
    await fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("No se encontró el usuario");
      }, useCatchRejectedFetch)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== id));
        setUsersFiltered((prevUsers) => prevUsers.filter((u) => u.id !== id));
      });
  };

  //Mover a sus respectivos componentes ManageSales, PurchaseHistory, Cart, EditSale, DeleteSale

  const getSales = async (token) => {
    await fetch("http://localhost:8000/sales", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("The response had some errors");
      }, useCatchRejectedFetch)
      .then((salesData) => {
        setSales(salesData);
        setSalesFiltered(salesData);
      });
  };

  const getPurchaseHistory = (id, token) => {
    if (sales.length > 0) return;
    toggleLoading(true);
    fetch("http://localhost:8000/sales", {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("The response had some errors");
      }, useCatchRejectedFetch)
      .then((salesData) => {
        const salesByUser = salesData.filter((s) => s.userID === id);
        setSales(salesByUser);
        setSalesFiltered(salesByUser);
        toggleLoading(false);
      });
  };

  const buyCartHandler = async (sale, token) => {
    const newSale = { id: users[users.length - 1].id + 1, ...sale };
    toggleLoading(true);
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
        else throw new Error("The response had some errors");
      }, useCatchRejectedFetch)
      .then(() => {
        setSales((prevSales) => [...prevSales, newSale]);
        setSalesFiltered((prevSales) => [...prevSales, newSale]);
      });
    toggleLoading(false);
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
        else throw new Error("The response had some errors");
      }, useCatchRejectedFetch)
      .then(() => {
        setSales((prevSales) => [...prevSales, sale]);
        setSalesFiltered((prevSales) => [...prevSales, sale]);
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
        else throw new Error("No se encontró la venta");
      }, useCatchRejectedFetch)
      .then(() => {
        setSales((prevSales) => prevSales.filter((s) => s.id !== id));
        setSalesFiltered((prevSales) => prevSales.filter((s) => s.id !== id));
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
        usersFiltered,
        setUsersFiltered,
        salesFiltered,
        setSalesFiltered,
        productsFiltered,
        setProductsFiltered,
        postProduct,
        putProduct,
        deleteProduct,
        getUsers,
        postUser,
        putUser,
        deleteUser,
        getSales,
        getPurchaseHistory,
        buyCartHandler,
        putSale,
        deleteSale,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
