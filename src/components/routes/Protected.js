import { Navigate } from "react-router";

import { useAuth } from "../../services/authenticationContext/authentication.context";

const Protected = ({ children, allowedRole = ["sysadmin"] }) => {
  const { user } = useAuth();
  return allowedRole.includes(user ? user.userType : "unsigned") ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

export default Protected;
