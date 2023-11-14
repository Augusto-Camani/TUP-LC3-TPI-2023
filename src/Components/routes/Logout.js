import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../services/authenticationContext/authentication.context";
import { useAPI } from "../../services/apiContext/api.context";

const Logout = () => {
  const { handleLogout } = useAuth();
  const { toggleLoading } = useAPI();
  const navigate = useNavigate();

  useEffect(() => {
    toggleLoading(true);
    handleLogout();
    navigate("/", { replace: true });
    toggleLoading(false);
  }, []);
};

export default Logout;
