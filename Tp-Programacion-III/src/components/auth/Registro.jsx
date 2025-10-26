import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup } from "react-bootstrap";
import { toast } from 'react-toastify';
import PublicNavbar from '../navbar/PublicNavbar';
import 'react-toastify/dist/ReactToastify.css';
import './Registro.css';

const Registro = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [errores, setErrores] = useState({
        email: "", password: "", confirmPassword: "", nombre: "",
    });

    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const nombreRef = useRef(null);

    const handleChange = (setter, field) => e => {
        setter(e.target.value);
        if (errores[field]) setErrores(prev => ({ ...prev, [field]: "" }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let Errores = { email: "", password: "", confirmPassword: "", nombre: "" };

        if (!email) Errores.email = "El correo electronico no puede estar vacio";
        else if (!regexEmail.test(email)) Errores.email = "El correo electronico no es valido";

        if (!password) Errores.password = "La contraseña no puede estar vacia";
        else if (password.length < 6) Errores.password = "La contraseña debe tener al menos 6 caracteres";

        if (!confirmPassword) Errores.confirmPassword = "Debe confirmar la contraseña";
        else if (password !== confirmPassword) Errores.confirmPassword = "Las contraseñas no coinciden";

        if (!nombre) Errores.nombre = "El nombre no puede estar vacio";

        if (Object.values(Errores).some(err => err)) {
            setErrores(Errores);
            toast.error("Error, revise los campos");
            if (Errores.email) emailRef.current.focus();
            else if (Errores.password) passwordRef.current.focus();
            else if (Errores.confirmPassword) confirmPasswordRef.current.focus();
            else if (Errores.nombre) nombreRef.current.focus();
            return;
        }

        fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName: nombre, email, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) { toast.error(data.error); return; }
            toast.success("Te registraste exitosamente");
            navigate("/login");
            setEmail(""); setPassword(""); setConfirmPassword(""); setNombre("");
            setErrores({ email: "", password: "", confirmPassword: "", nombre: "" });
        })
        .catch(err => { console.error(err); toast.error("Error de conexión"); });
    };

    return (
        <>
        <PublicNavbar />
        <div className="registro-container">
            <div className="registro-card">
                <h5>Registrarse</h5>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Form.Control
                            type="text"
                            placeholder="Nombre"
                            onChange={handleChange(setNombre, "nombre")}
                            value={nombre}
                            ref={nombreRef}
                        />
                        {errores.nombre && <span className="text-danger">{errores.nombre}</span>}
                    </FormGroup>

                    <FormGroup>
                        <Form.Control
                            type="email"
                            placeholder="Correo electrónico"
                            onChange={handleChange(setEmail, "email")}
                            value={email}
                            ref={emailRef}
                        />
                        {errores.email && <span className="text-danger">{errores.email}</span>}
                    </FormGroup>

                    <FormGroup>
                        <Form.Control
                            type="password"
                            placeholder="Contraseña"
                            onChange={handleChange(setPassword, "password")}
                            value={password}
                            ref={passwordRef}
                        />
                        {errores.password && <span className="text-danger">{errores.password}</span>}
                    </FormGroup>

                    <FormGroup>
                        <Form.Control
                            type="password"
                            placeholder="Repetir contraseña"
                            onChange={handleChange(setConfirmPassword, "confirmPassword")}
                            value={confirmPassword}
                            ref={confirmPasswordRef}
                        />
                        {errores.confirmPassword && <span className="text-danger">{errores.confirmPassword}</span>}
                    </FormGroup>

                    <Button type="submit" className="btn-login">
                        Registrarse
                    </Button>
                </Form>

                <p className="mt-3 text-center">
                    ¿Ya tienes una cuenta?{" "}
                    <span className="register-link" onClick={() => navigate("/login")}>
                        Iniciar sesión
                    </span>
                </p>
            </div>
        </div>
        </>
    );
}

export default Registro;
