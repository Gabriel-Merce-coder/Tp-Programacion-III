import { useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import usePeliculasPublicas from "../../hooks/usePeliculasPublicas";

const PublicNavbar = () => {
    const navigate = useNavigate();
    const { peliculas } = usePeliculasPublicas();


    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
            <Container className="justify-content-between">
                <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                    🎬 CineApp
                </Navbar.Brand>
                <div className="d-flex align-items-center gap-2">
                    <Button variant="outline-light" onClick={() => navigate("/login")}> 
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
