import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registro = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [errores, setErrores] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        nombre: "",
    });
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const nombreRef = useRef(null);

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
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (errores.confirmPassword) {
            setErrores({ ...errores, confirmPassword: "" });
        }
    }
    const handleNombreChange = (e) => {
        setNombre(e.target.value);
        if (errores.nombre) {
            setErrores({ ...errores, nombre: "" });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let Errores = {
            email: "",
            password: "",
            confirmPassword: "",
            nombre: "",
        }

        if (email === "") {
            Errores.email = "El correo electronico no puede estar vacio"
        } else if (!regexEmail.test(email)) {
            Errores.email = "El correo electronico no es valido"
        }

        if (password === "") {
            Errores.password = "La contraseña no puede estar vacia"
        } else if (password.length < 6) {
            Errores.password = "La contraseña debe tener al menos 6 caracteres"
        }

        if (confirmPassword === "") {
            Errores.confirmPassword = "Debe confirmar la contraseña"
        } else if (password !== confirmPassword) {
            Errores.confirmPassword = "Las contraseñas no coinciden"
        }

        if (nombre === "") {
            Errores.nombre = "El nombre no puede estar vacio"
        }

        if (Errores.email || Errores.password || Errores.confirmPassword || Errores.nombre) {
            setErrores(Errores);
            toast.error("Error, revise los campos")
            if (Errores.email) {
                emailRef.current.focus();
            } else if (Errores.password) {
                passwordRef.current.focus();
            } else if (Errores.confirmPassword) {
                confirmPasswordRef.current.focus();
            } else if (Errores.nombre) {
                nombreRef.current.focus();
            }
            return;
        }

        // Llamada a la API de registro
        fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName: nombre,
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    toast.error(data.error);
                    return;
                }

                toast.success("Te registraste exitosamente");
                navigate("/login");

                setErrores({
                    email: "",
                    password: "",
                    confirmPassword: "",
                    nombre: "",
                });
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setNombre("");
            })
            .catch(error => {
                console.error("Error de conexión:", error);
                toast.error("Error de conexión. Verifica que el servidor esté funcionando.");
            });
    }
    return (
        <>
            <Card className="mt-5 mx-3 p-3 px-5 shadow">
                <Card.Body>
                    <Row className="mb-2">
                        <h5>Registrarse</h5>
                    </Row>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="mb-4">
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                onChange={handleNombreChange}
                                value={nombre}
                                ref={nombreRef}
                            />
                            {errores.nombre && <span className="text-danger">{errores.nombre}</span>}
                        </FormGroup>
                        <FormGroup className="mb-4">
                            <Form.Control
                                type="email"
                                placeholder="Correo electrónico"
                                onChange={handleEmailChange}
                                value={email}
                                ref={emailRef}
                            />
                            {errores.email && <span className="text-danger">{errores.email}</span>}
                        </FormGroup>
                        <FormGroup className="mb-4">
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                onChange={handlePasswordChange}
                                value={password}
                                ref={passwordRef}
                            />
                            {errores.password && <span className="text-danger">{errores.password}</span>}
                        </FormGroup>
                        <FormGroup className="mb-4">
                            <Form.Control
                                type="password"
                                placeholder="Repetir contraseña"
                                onChange={handleConfirmPasswordChange}
                                value={confirmPassword}
                                ref={confirmPasswordRef}
                            />
                            {errores.confirmPassword && <span className="text-danger">{errores.confirmPassword}</span>}
                        </FormGroup>
                        <Row>
                            <Col />
                            <Col md={6} className="d-flex justify-content-end">
                                <Button variant="secondary" type="submit">
                                    Registrarse
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                    {/* Botón para ir al login */}
                    <Row className="mt-3">
                        <Col className="text-center">
                            <p className="text-muted mb-2">¿Ya tienes una cuenta?</p>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => navigate("/login")}
                            >
                                Iniciar sesión
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
}
export default Registro;

