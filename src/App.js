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
import Dashboard from "./Components/DashBoard/DashBoard";
import Protected from "./Components/Security/Protected/Protected";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
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
  ]);

  return <RouterProvider router={router} />;
};

export default App;
