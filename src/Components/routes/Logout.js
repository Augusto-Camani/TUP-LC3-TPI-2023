import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../services/authenticationContext/authentication.context";
import { useAPI } from "../../services/apiContext/api.context";

const Logout = () => {
  const { logoutHandler } = useAuth();
  const { toggleLoading } = useAPI();
  const navigate = useNavigate();

  useEffect(() => {
    toggleLoading(true);
    logoutHandler();
    navigate("/", { replace: true });
    toggleLoading(false);
  }, []);
};

export default Logout;
