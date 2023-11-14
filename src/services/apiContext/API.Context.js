import { createContext, useCallback, useContext, useState } from "react";

const APIContext = createContext();

export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) throw new Error("There is no API provider");
  return context;
};

export const APIContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState(products);

  const toggleLoading = (value) => {
    setIsLoading(value);
  };

  const postProducts = useCallback(
    async (product) => {
      setProducts((prevProducts) => [...prevProducts, product]);
      setProductsFiltered((prevProducts) => [...prevProducts, product]);

      console.log(products);
      const newProductId = products[products.length - 1].id + 1;

      await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: newProductId,
          instrument: product.instrument,
          price: product.price,
          seller: product.seller,
        }),
      })
        .then((response) => {
          if (response.ok) return response.json();
          else {
            throw new Error("The response had some errors");
          }
        })
        .then(() => {
          const newProductArray = [
            { ...product, id: newProductId },
            ...products,
          ];
          setProducts(newProductArray);
          setProductsFiltered(newProductArray);
        })
        .catch((error) => console.log(error));
    },
    [products]
  );

  return (
    <APIContext.Provider
      value={{
        isLoading,
        toggleLoading,
        products,
        setProducts,
        productsFiltered,
        setProductsFiltered,
        postProducts,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
