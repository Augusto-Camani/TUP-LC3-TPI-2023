import { Navigate } from "react-router";

import { useAuth } from "../../services/authenticationContext/authentication.context";

const Protected = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Protected;
