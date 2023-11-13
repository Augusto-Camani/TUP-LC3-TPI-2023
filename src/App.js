import { useState } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Protected from "./components/routes/Protected";
import NotFound from "./components/routes/NotFound";

import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import NewProduct from "./components/newProduct/NewProduct";
import ProductsPage, { PRODUCTS } from "./components/productsPage/ProductsPage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

//temenos que implementar estas consignas:{
//Utilizar Context en al menos un caso de uso.
//Enrutado dinámico establecido mediante la librería “react-router” para aprovechamiento e implementación de conceptos de SPA
//Crear al menos un ABM (alta, baja y modificación) mediante el uso de formularios,modales y otras herramientas disponibles.
//Consumo de API para la gestión de datos.

const App = () => {
  const [products, setProducts] = useState(PRODUCTS);
  const [ProductsFilter, setProductsFilter] = useState([]);

  const appProductsHandler = (product) => {
    setProducts((prevProducts) => [product, ...prevProducts]);
    setProductsFilter((prevProducts) => [product, ...prevProducts]);

    const newProductId = products[products.length - 1].id + 1;

    fetch("http://localhost:3000/Products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: newProductId,
        instrument: products.instrument,
        price: products.price,
        seller: products.seller,
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
          { ...products, id: newProductId },
          ...products,
        ];
        setProducts(newProductArray);
        setProductsFilter(newProductArray);
      })
      .catch((error) => console.log(error));
  };

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
