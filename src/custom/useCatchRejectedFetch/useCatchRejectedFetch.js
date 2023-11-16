import { useAPI } from "../../services/apiContext/api.context";

const useCatchRejectedFetch = () => {
  const { toggleLoading } = useAPI();

  toggleLoading(false);
  throw new Error("Error de servidor. Intentelo de nuevo más tarde");
};

export default useCatchRejectedFetch;
