import { useState, useRef } from 'react'
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../../context/UserContext';
import PublicNavbar from '../navbar/PublicNavbar';
import "./Login.css";


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

    const { user } = useUser();
    const role = user?.role;

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


        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let Errores = {
            email: "",
            password: ""
        }

        if (email === "") {
            Errores.email = "El email no puede estar vacío";
        } else if (!regexEmail.test(email)) {
            Errores.email = "El email no es válido";
        }

        if (password === "") {
            Errores.password = "La contraseña no puede estar vacía";
        } else if (password.length < 6) {
            Errores.password = "La contraseña debe tener al menos 6 caracteres";
        }

        if (Errores.email || Errores.password) {
            setErrores(Errores);
            toast.error("Error, revise los campos")
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
            body: JSON.stringify({ email: email, password: password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    toast.error(data.error);
                    return;
                }

                const token = data.token;
                localStorage.setItem("token", token);


                if (role === 'user') {
                    navigate("/home")
                } else {
                    navigate("/dashboard")
                }
                toast.success("Iniciaste sesión exitosamente!");

                setErrores({ email: "", password: "" });
                setEmail("");
                setPassword("");
            })
            .catch(error => {
                console.error("Error de conexión:", error);
                toast.error("Error de conexión. Verifica que el servidor esté funcionando.");
            });
    }

    return (
        <>
  <PublicNavbar />
  <div className="login-container">
  <div className="login-card">
    <h5>Iniciar Sesión</h5>
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Control
          type="email"
          placeholder="Ingresar email"
          onChange={handleEmailChange}
          value={email}
          ref={emailRef}
        />
        {errores.email && <span className="text-danger">{errores.email}</span>}
      </FormGroup>

      <FormGroup>
        <Form.Control
          type="password"
          placeholder="Ingresar contraseña"
          onChange={handlePasswordChange}
          value={password}
          ref={passwordRef}
        />
        {errores.password && <span className="text-danger">{errores.password}</span>}
      </FormGroup>

      <Button type="submit" className="btn-login">Iniciar sesión</Button>
    </Form>

    <p className="mt-3 text-center">
      ¿No tienes una cuenta? 
      <span className="register-link" onClick={() => navigate("/registro")}>
        Crear cuenta
      </span>
    </p>
  </div>
</div>
</>
);
};

export default Login; 