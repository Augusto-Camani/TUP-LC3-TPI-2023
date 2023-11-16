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
import Products from "./components/products/Products";
import ManagerProducts from "./components/managerProducts/ManagerProducts";
import NewProduct from "./components/newProduct/NewProduct";
import AccountSettings from "./components/accountSettings/accountSettings";

//temenos que implementar estas consignas:{
//Utilizar Context en al menos un caso de uso.
//Enrutado dinámico establecido mediante la librería “react-router” para aprovechamiento e implementación de conceptos de SPA
//Crear al menos un ABM (alta, baja y modificación) mediante el uso de formularios,modales y otras herramientas disponibles.
//Consumo de API para la gestión de datos.

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
      path: "/products",
      element: (
        <>
          <Navbar />
          <Products />
        </>
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
      path: "/newproduct",
      element: (
        <Protected allowedRole={admin}>
          <Navbar />
          <NewProduct />
        </Protected>
      ),
    },
    {
      path: "/editProduct",
      element: (
        <Protected allowedRole={admin}>
          <Navbar />
          {/* <EditProduct /> */}
        </Protected>
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
