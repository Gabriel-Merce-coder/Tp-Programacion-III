import { useState, useRef } from 'react'
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errores, setErrores] = useState({
        email: "",
        password: "",
    });
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (errores.email) {
            setErrores({ ...errores, email: "" });
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errores.password) {
            setErrores({ ...errores, password: "" });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const currentEmail = emailRef.current.value;
        const currentPassword = passwordRef.current.value;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let Errores = {
            email: "",
            password: ""
        }

        if (currentEmail === "") {
            Errores.email = "El email no puede estar vacío";
        } else if (!regexEmail.test(currentEmail)) {
            Errores.email = "El email no es válido";
        }

        if (currentPassword === "") {
            Errores.password = "La contraseña no puede estar vacía";
        } else if (currentPassword.length < 6) {
            Errores.password = "La contraseña debe tener al menos 6 caracteres";
        }

        if (Errores.email || Errores.password) {
            setErrores(Errores);
            if (Errores.email) {
                emailRef.current.focus();
            } else {
                passwordRef.current.focus();
            }
            return;
        }

        fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: currentEmail, password: currentPassword })
        })
            .then(response => response.json())
            .then(data => {

                if (data.error) {
                    alert(data.error);
                    return;
                }

                const token = data.token;
                localStorage.setItem("token", token);

                alert(data.message);
                navigate("/dashboard");

                setErrores({ email: "", password: "" });
                setEmail("");
                setPassword("");
            })
            .catch(error => {
                console.error("Error de conexión:", error);
                alert("Error de conexión. Verifica que el servidor esté funcionando.");
            });
    }

    return (
        <>
            <Card className="mt-5 mx-3 p-3 px-5 shadow">
                <Card.Body>
                    <Row className="mb-2">
                        <h5>Iniciar Sesion</h5>
                    </Row>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="mb-4">
                            <Form.Control
                                type="email"
                                placeholder="Ingresar email"
                                onChange={handleEmailChange}
                                value={email}
                                ref={emailRef}

                            />
                            {errores.email && <span className="error-text">{errores.email}</span>}
                        </FormGroup>
                        <FormGroup className="mb-4">
                            <Form.Control
                                type="password"
                                placeholder="Ingresar contraseña"
                                onChange={handlePasswordChange}
                                value={password}
                                ref={passwordRef}

                            />
                            {errores.password && <span className="error-text">{errores.password}</span>}
                        </FormGroup>
                        <Row>
                            <Col />
                            <Col md={6} className="d-flex justify-content-end">
                                <Button variant="secondary" type="submit">
                                    Iniciar sesión
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>

        </>
    );
};

export default Login; 