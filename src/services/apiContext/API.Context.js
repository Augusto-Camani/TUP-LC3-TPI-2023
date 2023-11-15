import { createContext, useContext, useState } from "react";

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

  const postProduct = async (product) => {
    const newProduct = { id: products[products.length - 1].id + 1, ...product };

    await fetch("http://localhost:8000/products", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error("The response had some errors");
        }
      })
      .then(() => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        setProductsFiltered((prevProducts) => [...prevProducts, newProduct]);
      })
      .catch((error) => console.log(error));
  };

  const putProduct = async (product) => {
    await fetch(`http://localhost:8000/products/${product.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error("The response had some errors");
        }
      })
      .then(() => {
        setProducts((prevProducts) => [...prevProducts, product]);
        setProductsFiltered((prevProducts) => [...prevProducts, product]);
      })
      .catch((error) => console.log(error));
  };

  const deleteProduct = async (product) => {
    await fetch(`http://localhost:8000/products/${product.id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) return response.json();
        else {
          throw new Error("The response had some errors");
        }
      })
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== product.id)
        );
        setProductsFiltered((prevProducts) =>
          prevProducts.filter((p) => p.id !== product.id)
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <APIContext.Provider
      value={{
        isLoading,
        toggleLoading,
        products,
        setProducts,
        productsFiltered,
        setProductsFiltered,
        postProduct,
        putProduct,
        deleteProduct,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
