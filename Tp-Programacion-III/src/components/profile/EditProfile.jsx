import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../ui/Mymodal";
import Navbar from "../navbar/Navbar";
import { useUser } from "../../context/UserContext";

const EditProfile = ({ onLogOut }) => {
  const { user } = useUser();
  const role = user?.role;

  const [usuario, setUsuario] = useState({
    nombre: "",
    password: "",
    confirmPassword: "",
  });

  const [errores, setErrores] = useState({
    nombre: "",
    password: "",
    confirmPassword: "",
  });

  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && !usuario.nombre) {
      setUsuario(prev => ({
        ...prev,
        nombre: user.fullName || user.nombre || ''
      }));
    }
  }, [user, usuario.nombre]);


  const nombreRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nombre, password, confirmPassword } = usuario;
    const nuevosErrores = {};

    if (!nombre.trim()) nuevosErrores.nombre = "El nombre no puede estar vacío";

    if (password.trim()) {
      if (password.length < 6)
        nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres";

      if (!confirmPassword.trim())
        nuevosErrores.confirmPassword = "Debe confirmar la contraseña";
      else if (password !== confirmPassword)
        nuevosErrores.confirmPassword = "Las contraseñas no coinciden";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      toast.error("Por favor revise los campos");
      if (nuevosErrores.nombre) nombreRef.current.focus();
      else if (nuevosErrores.password) passwordRef.current.focus();
      else if (nuevosErrores.confirmPassword) confirmPasswordRef.current.focus();
      return;
    }

    setShowConfirm(true);
  };

  const handleProfileUpdate = async () => {
    setShowConfirm(false);

    try {
      const token = localStorage.getItem('token');

      const updateData = {
        fullName: usuario.nombre
      };

      if (usuario.password.trim()) {
        updateData.password = usuario.password;
      }

      const response = await fetch('http://localhost:3000/api/user/profile', {
        method: 'PUT',
        headers: {
          'x-token': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || "Perfil actualizado correctamente");

        if (role === 'user') {
          navigate("/home");
        } else {
          navigate("/dashboard");
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || errorData.message || 'Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error de conexión');
    }
  };

  const handleVolverInicio = () => {
    if (role === 'user') {
      navigate("/home")
    } else {
      navigate("/dashboard")
    }
  };

  return (
    <div className="min-vh-100 bg-dark text-white">
      <Navbar onLogOut={onLogOut} />
      <div className="d-flex justify-content-center align-items-center min-vh-100">
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

              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Nueva contraseña (opcional)"
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

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirme la contraseña (opcional)"
                      name="confirmPassword"
                      value={usuario.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errores.confirmPassword}
                      ref={confirmPasswordRef}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errores.confirmPassword}
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
    </div>
  );
};

export default EditProfile;
