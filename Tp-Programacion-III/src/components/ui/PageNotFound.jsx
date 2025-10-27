import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/home");
  };

  return (
    <div className="notfound-container">
      <div className="notfound-content text-center">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Página no encontrada</h2>
        <p className="notfound-text">
          Lo sentimos, la página que estás buscando no existe o fue movida.
        </p>
        <Button
          variant="danger"
          className="notfound-btn"
          onClick={handleGoBack}
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
