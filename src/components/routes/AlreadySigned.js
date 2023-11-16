import { Navigate } from "react-router";

import { useAuth } from "../../services/authenticationContext/authentication.context";

const AlreadySigned = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
};

export default AlreadySigned;
