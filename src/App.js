import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Spinner } from "react-bootstrap";

import { useAPI } from "./services/apiContext/api.context";
import AlreadySigned from "./components/routes/AlreadySigned";
import Logout from "./components/routes/Logout";
import NotFound from "./components/routes/NotFound";
import Protected from "./components/routes/Protected";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import AccountSettings from "./components/accountSettings/accountSettings";
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import ManagerProducts from "./components/managerProducts/ManagerProducts";
import ManagerUsers from "./components/managerUsers/ManagerUsers";
const App = () => {
  const { isLoading } = useAPI();
  const admin = ["admin", "sysadmin"];
  const user = ["user", ...admin];

  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/home" replace /> },
    { path: "*", element: <NotFound /> },
    {
      path: "/home",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <AlreadySigned>
          <Navbar />
          <Login />
        </AlreadySigned>
      ),
    },
    {
      path: "/logout",
      element: (
        <Protected allowedRole={user}>
          <Logout />
        </Protected>
      ),
    },
    {
      path: "/register",
      element: (
        <AlreadySigned>
          <Navbar />
          <Register />
        </AlreadySigned>
      ),
    },
    {
      path: "/accountSettings",
      element: (
        <Protected allowedRole={user}>
          <Navbar />
          <AccountSettings />
        </Protected>
      ),
    },
    {
      path: "/products",
      element: (
        <>
          <Navbar />
          <Products />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <Protected allowedRole={user}>
          <Navbar />
          <Cart />
        </Protected>
      ),
    },
    {
      path: "/manageproducts",
      element: (
        <Protected allowedRole={admin}>
          <Navbar />
          <ManagerProducts />
        </Protected>
      ),
    },
    {
      path: "/managerusers",
      element: (
        <Protected allowedRole={admin}>
          <Navbar />
          <ManagerUsers />
        </Protected>
      ),
    },
  ]);

  return (
    <div className={isLoading ? "opacity-75" : undefined}>
      <RouterProvider router={router} />
      {isLoading && (
        <div
          className="spinner"
          children={<Spinner className="d-flex m-auto" />}
        />
      )}
    </div>
  );
};

export default App;
