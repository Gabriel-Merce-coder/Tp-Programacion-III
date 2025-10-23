import { Button, Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PublicNavbar = () => {
    const navigate = useNavigate();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
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
    );
};

export default PublicNavbar;
