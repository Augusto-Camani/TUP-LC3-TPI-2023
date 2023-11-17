import { useEffect } from "react";

import useCatchRejectedFetch from "../useCatchRejectedFetch/useCatchRejectedFetch";
import { useAPI } from "../../services/apiContext/api.context";

const useProducts = () => {
  const { toggleLoading, products, setProducts } = useAPI();

  useEffect(() => {
    if (products.length > 0) return;
    toggleLoading(true);
    fetch("http://localhost:8000/products", {
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error(
            "Hubo un problema. Si el problema persiste contacte a soporte"
          );
      }, useCatchRejectedFetch)
      .then((productsData) => {
        setProducts(productsData);
        toggleLoading(false);
      });
  }, []);
};

export default useProducts;
