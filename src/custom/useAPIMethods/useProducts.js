import { useEffect } from "react";

import { useAPI } from "../../services/apiContext/api.context";

const useProducts = () => {
  const { toggleLoading, products, setProducts } = useAPI();

  useEffect(() => {
    if (products.length > 0) return;
    toggleLoading(true);
    fetch("http://localhost:8000/products", {
      headers: { "content-type": "application/json" },
    })
      .then(
        (response) => {
          if (response.ok) return response.json();
          else
            throw new Error(
              "Hubo un problema. Si el problema persiste contacte a soporte"
            );
        },
        () => {
          throw new Error("Error de servidor. Intentelo de nuevo más tarde");
        }
      )
      .then((productsData) => {
        setProducts(productsData);
      })
      .catch((error) => console.log(error.message))
      .finally(() => toggleLoading(false));
  }, []);
};

export default useProducts;
