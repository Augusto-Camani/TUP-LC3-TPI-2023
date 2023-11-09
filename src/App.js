import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Products from "./Components/Products/Products";
import ProductItem from "./Components/productItem/ProductItem";
import NewProduct from "./Components/NewProduct/NewProduct";
import { Form, useAccordionButton } from "react-bootstrap";
import ProductForm from "./Components/ProductForm/ProductForm";

import { useState } from "react";
import SingIn from "./Components/SingIn/SingIn";
import Dashboard, { PRODUCTS } from "./Components/DashBoard/DashBoard";
import Protected from "./Components/Security/Protected/Protected";

//temenos que implementar estas consignas:{
//Utilizar Context en al menos un caso de uso.
//Enrutado dinámico establecido mediante la librería “react-router” para aprovechamiento e implementación de conceptos de SPA
//Crear al menos un ABM (alta, baja y modificación) mediante el uso de formularios,modales y otras herramientas disponibles.
//Consumo de API para la gestión de datos.

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [products, setProducts] = useState(PRODUCTS);
  const [ProductsFilter, setProductsFilter] = useState([]);

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };
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
    {
      path: "/login",
      element: <SingIn onLoggedin={loginHandler} />,
    },
    {
      path: "/home",
      element: (
        <Protected isSignedIn={isLoggedIn}>
          <Dashboard onLogout={logoutHandler} />
        </Protected>
      ),
    },
    {
      path: "/NewProduct",
      element: (
        <Protected isSignedIn={isLoggedIn}>
          <NewProduct onProductSaved={appProductsHandler} />
        </Protected>
      ),
    },
    {
      path: "/EditProduct",
      element: <Protected isSignedIn={isLoggedIn}></Protected>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
