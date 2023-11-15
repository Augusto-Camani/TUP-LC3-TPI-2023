import { Navigate } from "react-router";

import { useAuth } from "../../services/authenticationContext/authentication.context";

const AlreadySigned = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/" replace />;
};

export default AlreadySigned;
