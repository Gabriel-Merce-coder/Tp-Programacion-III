import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import useSalaForm from "../../hooks/useSalaForm";
import { useEffect } from "react";

const NewSala = ({ onSalaAdd, editSala }) => {
  const navigate = useNavigate();

  const {
    numeroSala,
    tipoSala,
    capacidad,
    estado,
    errores,
    numeroSalaRef,
    tipoSalaRef,
    capacidadRef,
    handleChangeNumeroSala,
    handleChangeTipoSala,
    handleChangeCapacidad,
    handleChangeEstado,
    setNumeroSala,
    setTipoSala,
    setCapacidad,
    setEstado,
    setErrores,
  } = useSalaForm();

  // 🟡 Precargar datos si se edita una sala
  useEffect(() => {
    if (editSala) {
      setNumeroSala(editSala.numeroSala || "");
      setTipoSala(editSala.tipoSala || "");
      setCapacidad(editSala.capacidad || "");
      setEstado(editSala.estado ?? true);
    }
  }, [editSala]);

  const handleAddSala = (e) => {
    e.preventDefault();

    const errorSala = { numeroSala: "", tipoSala: "", capacidad: "" };

    if (!numeroSala || numeroSala <= 0) {
      errorSala.numeroSala = "El número de sala debe ser mayor a 0";
    }
    if (!tipoSala) {
      errorSala.tipoSala = "El tipo de sala no puede estar vacío";
    }
    if (!capacidad || capacidad <= 0) {
      errorSala.capacidad = "La capacidad debe ser mayor a 0";
    }

    if (errorSala.numeroSala || errorSala.tipoSala || errorSala.capacidad) {
      setErrores(errorSala);
      toast.error("Por favor, revise los campos");
      if (errorSala.numeroSala) numeroSalaRef.current.focus();
      else if (errorSala.tipoSala) tipoSalaRef.current.focus();
      else if (errorSala.capacidad) capacidadRef.current.focus();
      return;
    }

    const nuevaSala = {
      numeroSala: parseInt(numeroSala),
      tipoSala,
      capacidad: parseInt(capacidad),
      estado,
    };

    onSalaAdd(nuevaSala);

    // Resetear formulario
    setNumeroSala("");
    setTipoSala("");
    setCapacidad("");
    setEstado(true);

    navigate("/dashboard");
  };

  return (
    <Card className="m-4 w-50" bg="info">
      <Card.Body>
        <Form className="text-white" onSubmit={handleAddSala}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="numeroSala">
                <Form.Label>Número de Sala</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese número"
                  min="1"
                  value={numeroSala}
                  onChange={handleChangeNumeroSala}
                  ref={numeroSalaRef}
                  isInvalid={!!errores.numeroSala}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.numeroSala}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="tipoSala">
                <Form.Label>Tipo de Sala</Form.Label>
                <Form.Select
                  ref={tipoSalaRef}
                  value={tipoSala}
                  onChange={handleChangeTipoSala}
                  isInvalid={!!errores.tipoSala}
                >
                  <option value="">Seleccione tipo</option>
                  <option value="2D">2D</option>
                  <option value="3D">3D</option>
                  <option value="4D">4D</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errores.tipoSala}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="capacidad">
                <Form.Label>Capacidad</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Capacidad de la sala"
                  min="1"
                  value={capacidad}
                  onChange={handleChangeCapacidad}
                  ref={capacidadRef}
                  isInvalid={!!errores.capacidad}
                />
                <Form.Control.Feedback type="invalid">
                  {errores.capacidad}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="estado">
                <Form.Label>Estado</Form.Label>
                <div className="mt-2">
                  <Form.Check
                    type="switch"
                    id="estado-switch"
                    label={estado ? "Activa" : "Inactiva"}
                    checked={estado}
                    onChange={handleChangeEstado}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-between">
            <Col md={4}>
              <Button
                variant="outline-light"
                onClick={() => navigate("/dashboard")}
                type="button"
              >
                Volver al inicio
              </Button>
            </Col>
            <Col md={3} className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                {editSala ? "Guardar Cambios" : "Agregar Sala"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NewSala;
