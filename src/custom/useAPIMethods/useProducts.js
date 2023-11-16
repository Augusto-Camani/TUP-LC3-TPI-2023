import { useEffect } from "react";

import useCatchRejectedFetch from "../useCatchRejectedFetch/useCatchRejectedFetch";
import { useAPI } from "../../services/apiContext/api.context";

const useProducts = () => {
  const { toggleLoading, products, setProducts, setProductsFiltered } =
    useAPI();

  useEffect(() => {
    if (products.length > 0) return;
    toggleLoading(true);
    fetch("http://localhost:8000/products", {
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Hubo un problema al llamar a la api");
      }, useCatchRejectedFetch)
      .then((productsData) => {
        setProducts(productsData);
        setProductsFiltered(productsData);
        toggleLoading(false);
      });
  }, []);
};

export default useProducts;
