import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  const backToHomePageHandler = () => {
    navigate("/home");
  };
  return (
    <div className="text-center">
      <h2 className="my-4">¡Oops! La página solicitada no fue encontrada</h2>
      <Button onClick={backToHomePageHandler}>Volver al inicio</Button>
    </div>
  );
};

export default NotFound;
