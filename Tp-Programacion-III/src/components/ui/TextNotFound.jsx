import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const TextNotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/login");
  };

  return (
    <div className="notfound-container">
      <div className="notfound-content text-center">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Página no encontrada</h2>
        <p className="notfound-text">
          Parece que la página que buscás no existe o el enlace es incorrecto.
        </p>
        <Button
          variant="danger"
          className="notfound-btn"
          onClick={handleGoBack}
        >
          Volver al login
        </Button>
      </div>
    </div>
  );
};

export default TextNotFound;
