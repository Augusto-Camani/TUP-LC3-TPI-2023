import { useCallback, useState } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Protected from "./Components/routes/Protected";
import NotFound from "./Components/routes/NotFound";
import Login from "./Components/login/Login";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import NewProduct from "./Components/NewProduct/NewProduct";
import ProductsPage, { PRODUCTS } from "./Components/productsPage/ProductsPage";
import Register from "./Components/register/Register";

//temenos que implementar estas consignas:{
//Utilizar Context en al menos un caso de uso.
//Enrutado dinámico establecido mediante la librería “react-router” para aprovechamiento e implementación de conceptos de SPA
//Crear al menos un ABM (alta, baja y modificación) mediante el uso de formularios,modales y otras herramientas disponibles.
//Consumo de API para la gestión de datos.

const App = () => {
  const [products, setProducts] = useState(PRODUCTS);
  const [ProductsFilter, setProductsFilter] = useState([]);

  const appProductsHandler = useCallback(
    (product) => {
      console.log(products);
      setProducts((prevProducts) => [...prevProducts, product]);
      setProductsFilter((prevProducts) => [...prevProducts, product]);

      const newProductId = products[products.length - 1].id + 1;

      fetch("http://localhost:8000/products", {
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
            ...products,
            { ...product, id: newProductId },
          ];
          setProducts(newProductArray);
          setProductsFilter(newProductArray);
        })
        .catch((error) => console.log(error));
    },
    [products]
  );

  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/home" replace /> },
    { path: "*", element: <NotFound /> },
    {
      path: "/editProduct",
      element: <Protected></Protected>,
    },
    { path: "/home", element: <Home /> },
    { path: "/login", element: <Login /> },
    {
      path: "/newProduct",
      element: (
        <Protected>
          <NewProduct onProductSaved={appProductsHandler} />
        </Protected>
      ),
    },
    {
      path: "/products",
      element: (
        <Protected>
          <ProductsPage />
        </Protected>
      ),
    },
    { path: "/register", element: <Register /> },
  ]);

  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
