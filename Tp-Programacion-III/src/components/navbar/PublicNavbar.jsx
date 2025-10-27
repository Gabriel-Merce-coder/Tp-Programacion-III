import { Button, Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Importamos los estilos

const PublicNavbar = () => {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="public-navbar fixed-top py-3">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand
          onClick={() => navigate("/")}
          className="navbar-logo"
        >
          CineFlix
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-3">
          <Button
            variant="outline-light"
            className="navbar-btn"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </Button>
          <Button
            variant="primary"
            className="navbar-btn-red"
            onClick={() => navigate("/registro")}
          >
            Registrarse
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default PublicNavbar;

