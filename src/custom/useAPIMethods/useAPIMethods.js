import { useEffect } from "react";

import { useAPI } from "../../services/apiContext/api.context";
import { useAuth } from "../../services/authenticationContext/authentication.context";

const catchRejectedFetch = () => {
  throw new Error("Error de servidor. Intentelo de nuevo más tarde");
};

export const useProducts = () => {
  const { toggleLoading, products, setProducts } = useAPI();

  useEffect(() => {
    if (products.length > 0) return;
    toggleLoading(true);
    fetch("https://tuxguitarsapi.onrender.com/products", {
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error(
            "Hubo un problema. Si el problema persiste contacte a soporte"
          );
      }, catchRejectedFetch)
      .then((productsData) => {
        setProducts(productsData);
      })
      .catch((error) => console.log(error.message))
      .finally(() => toggleLoading(false));
  }, []);
};

export const useSales = () => {
  const { toggleLoading, sales, setSales } = useAPI();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (sales.length > 0) return;
    toggleLoading(true);
    fetch("https://tuxguitarsapi.onrender.com/sales", {
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
      .then((salesData) => {
        setSales(salesData);
      })
      .catch((error) => console.log(error.message))
      .finally(() => toggleLoading(false));
  }, []);
};

export const useUsers = () => {
  const { toggleLoading, users, setUsers } = useAPI();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (users.length > 0) return;
    toggleLoading(true);
    fetch("https://tuxguitarsapi.onrender.com/users", {
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
};
