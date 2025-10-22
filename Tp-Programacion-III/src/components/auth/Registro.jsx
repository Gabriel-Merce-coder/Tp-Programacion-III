import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'


const Registro = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [errores, setErrores] = useState({
        email: "",
        password: "",
        nombre: "",
        telefono: "",
    });
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const nombreRef = useRef(null);
    const telefonoRef = useRef(null);

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
    const handleNombreChange = (e) => {
        setNombre(e.target.value);
        if (errores.nombre) {
            setErrores({ ...errores, nombre: "" });
        }
    }
    const handleTelefonoChange = (e) => {
        setTelefono(e.target.value);
        if (errores.telefono) {
            setErrores({ ...errores, telefono: "" });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const currentEmail = emailRef.current.value;
        const currentPassword = passwordRef.current.value;
        const currentNombre = nombreRef.current.value;
        const currentTelefono = telefonoRef.current.value;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let Errores = {
            email: "",
            password: "",
            nombre: "",
            telefono: "",
        }

        if (currentEmail === "") {
            Errores.email = "El correo electronico no puede estar vacio"
        } else if (!regexEmail.test(currentEmail)) {
            Errores.email = "El correo electronico no es valido"
        }

        if (currentPassword === "") {
            Errores.password = "La contraseña no puede estar vacia"
        } else if (currentPassword.length < 6) {
            Errores.password = "La contraseña debe tener al menos 6 caracteres"
        }

        if (currentNombre === "") {
            Errores.nombre = "El nombre no puede estar vacio"
        }

        if (currentTelefono === "") {
            Errores.telefono = "El telefono no puede estar vacio"
        }

        if (Errores.email || Errores.password || Errores.nombre || Errores.telefono) {
            setErrores(Errores);
            alert("Error, revise los campos")
            if (Errores.email) {
                emailRef.current.focus();
            } else if (Errores.password) {
                passwordRef.current.focus();
            } else if (Errores.nombre) {
                nombreRef.current.focus();
            } else if (Errores.telefono) {
                telefonoRef.current.focus();
            }
            return;
        }

        alert("Te registraste exitosamente");
        navigate("/login");
        console.log("Credenciales: ", {
            email: currentEmail,
            password: currentPassword,
            nombre: currentNombre,
            telefono: currentTelefono
        });
        setErrores({
            email: "",
            password: "",
            nombre: "",
            telefono: "",
        });
        setEmail("");
        setPassword("");
        setNombre("");
        setTelefono("");
    }
    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h3>Registrarse</h3>
                <div className="email-group">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={handleEmailChange}
                        ref={emailRef}
                    />
                    {errores.email && <span className="error">{errores.email}</span>}
                </div>
                <div className="password-group">
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={handlePasswordChange}
                        ref={passwordRef}
                    />
                    {errores.password && <span className="error">{errores.password}</span>}
                </div>
                <div className="nombre-group">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={handleNombreChange}
                        ref={nombreRef}
                    />
                    {errores.nombre && <span className="error">{errores.nombre}</span>}
                </div>
                <div className="telefono-group">
                    <input
                        type="tel"
                        placeholder="Teléfono"
                        value={telefono}
                        onChange={handleTelefonoChange}
                        ref={telefonoRef}
                    />
                    {errores.telefono && <span className="error">{errores.telefono}</span>}
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}
export default Registro;