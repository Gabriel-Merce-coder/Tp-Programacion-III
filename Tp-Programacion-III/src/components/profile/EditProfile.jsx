import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../ui/Mymodal"; // Ahora lo usamos como ConfirmModal

const EditProfile = () => {
  const role =localStorage.getItem("role"); // me traigo el rol 
  const [usuario, setUsuario] = useState({
    nombre: "Juan Pérez",
    email: "juanperez@gmail.com",
    telefono: "123456789",
    password: "123456",
  });

  const [errores, setErrores] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
  });

  const [showConfirm, setShowConfirm] = useState(false); 

  const navigate = useNavigate();

  const nombreRef = useRef(null);
  const emailRef = useRef(null);
  const telefonoRef = useRef(null);
  const passwordRef = useRef(null);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  // Validación del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const { nombre, email, telefono, password } = usuario;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nuevosErrores = {};

    if (!nombre.trim()) nuevosErrores.nombre = "El nombre no puede estar vacío";
    if (!email.trim()) nuevosErrores.email = "El email no puede estar vacío";
    else if (!regexEmail.test(email))
      nuevosErrores.email = "El formato de email no es válido";

    if (!telefono.trim())
      nuevosErrores.telefono = "El teléfono no puede estar vacío";

    if (!password.trim() || password.length < 6)
      nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      toast.error("Por favor revise los campos");
      if (nuevosErrores.nombre) nombreRef.current.focus();
      else if (nuevosErrores.email) emailRef.current.focus();
      else if (nuevosErrores.telefono) telefonoRef.current.focus();
      else if (nuevosErrores.password) passwordRef.current.focus();
      return;
    }

    setShowConfirm(true);
  };

  const handleProfileUpdate = () => {
    setShowConfirm(false);

    toast.success("Perfil actualizado correctamente");
    console.log("Datos guardados:", usuario);
    if (role ==='user'){
      navigate("/home")
    } else {
      navigate("/dashboard")
    }
  };

  const handleVolverInicio = () => {
    if (role ==='user'){
      navigate("/home")
    } else {
      navigate("/dashboard")
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
      <Card className="p-4 w-50" bg="secondary" text="white">
        <Card.Body>
          <h3 className="mb-4 text-center">Editar Perfil</h3>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre"
                    name="nombre"
                    value={usuario.nombre}
                    onChange={handleChange}
                    isInvalid={!!errores.nombre}
                    ref={nombreRef}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.nombre}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                    name="email"
                    value={usuario.email}
                    readOnly //  bloqueo edición del email
                    isInvalid={!!errores.email}
                    ref={emailRef}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Ingrese su teléfono"
                    name="telefono"
                    value={usuario.telefono}
                    onChange={handleChange}
                    isInvalid={!!errores.telefono}
                    ref={telefonoRef}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.telefono}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese nueva contraseña"
                    name="password"
                    value={usuario.password}
                    onChange={handleChange}
                    isInvalid={!!errores.password}
                    ref={passwordRef}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="outline-light" onClick={handleVolverInicio}>
                Volver al inicio
              </Button>

              <Button variant="light" type="submit">
                Guardar Cambios
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* 🔹 Modal de confirmación */}
      <DeleteModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={handleProfileUpdate}
        title="Confirmar cambios"
        message="¿Deseás guardar los cambios en tu perfil?"
        confirmText="Sí, guardar cambios"
        cancelText="No, cancelar"
      />
    </div>
  );
};

export default EditProfile;
