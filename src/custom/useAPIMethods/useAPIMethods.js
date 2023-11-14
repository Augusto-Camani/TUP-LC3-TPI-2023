import { useEffect } from "react";

import { useAPI } from "../../services/apiContext/api.context";

export const useGetProducts = () => {
  const { toggleLoading, products, setProducts, setProductsFiltered } =
    useAPI();

  useEffect(() => {
    if (products.length > 0) return;
    toggleLoading(true);
    fetch("http://localhost:8000/products", {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((productsData) => {
        setProducts(productsData);
        setProductsFiltered(productsData);
        toggleLoading(false);
      })
      .catch((error) => {
        toggleLoading(false);
        console.log(error);
      });
  }, []);
};

export const usePostProducts = () => {
  return;
};

export const usePutProducts = () => {
  return;
};

export const usePatchProducts = () => {
  return;
};
