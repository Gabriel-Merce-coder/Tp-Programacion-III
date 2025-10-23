import { Button, Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center bg-dark text-white min-vh-100"
      style={{
        backgroundImage: "url('https://wallpapers.com/images/featured/imagenes-de-cine-itv2fyqylv6mex00.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🔹 Navbar arriba */}
      <Navbar bg="dark" variant="dark" expand="lg" className="w-100 position-absolute top-0">
        <Container className="justify-content-between">
          <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            🎬 CineApp
          </Navbar.Brand>
          <div>
            <Button variant="outline-light" className="me-2" onClick={() => navigate("/login")}>
              Iniciar sesión
            </Button>
            <Button variant="primary" onClick={() => navigate("/registro")}>
              Registrarse
            </Button>
          </div>
        </Container>
      </Navbar>

    </div>
  );
};

export default LandingPage;