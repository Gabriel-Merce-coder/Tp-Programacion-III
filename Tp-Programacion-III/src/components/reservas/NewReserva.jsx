// /////////////////////////////////////////////////////////
// CAMBIO JULIAN: nuevo formulario para reservar una película
// /////////////////////////////////////////////////////////

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewReserva = ({ peliculas, funciones, onAddReserva }) => {
  const navigate = useNavigate();

  const [reserva, setReserva] = useState({
    nombre: "",
    peliculaId: "",
    funcionId: "",
  });

  const [errores, setErrores] = useState({
    nombre: "",
    peliculaId: "",
    funcionId: "",
  });

  const handleChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = {};
    if (!reserva.nombre) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!reserva.peliculaId)
      nuevosErrores.peliculaId = "Debe seleccionar una película";
    if (!reserva.funcionId)
      nuevosErrores.funcionId = "Debe seleccionar una función";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      toast.error("Por favor revise los campos");
      return;
    }

    const nuevaReserva = {
      id: Date.now(),
      nombre: reserva.nombre,
      peliculaId: parseInt(reserva.peliculaId),
      funcionId: parseInt(reserva.funcionId),
    };

    onAddReserva(nuevaReserva);
    
    navigate("/home");
  };

  return (
    <Card className="m-4 w-50" bg="secondary" text="white">
      <Card.Body>
        <h4 className="mb-4">🎟️ Nueva Reserva</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={reserva.nombre}
              onChange={handleChange}
              isInvalid={!!errores.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errores.nombre}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Película</Form.Label>
            <Form.Select
              name="peliculaId"
              value={reserva.peliculaId}
              onChange={handleChange}
              isInvalid={!!errores.peliculaId}
            >
              <option value="">Seleccione una película</option>
              {peliculas.map((peli) => (
                <option key={peli.id} value={peli.id}>
                  {peli.titulo}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errores.peliculaId}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Función</Form.Label>
            <Form.Select
              name="funcionId"
              value={reserva.funcionId}
              onChange={handleChange}
              isInvalid={!!errores.funcionId}
            >
              <option value="">Seleccione una función</option>
              {funciones.map((funcion) => (
                <option key={funcion.id} value={funcion.id}>
                  {`Sala ${funcion.salaId} - ${funcion.fecha} ${funcion.hora}`}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errores.funcionId}
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="justify-content-between mt-4">
            <Col md={4}>
              <Button
                variant="outline-light"
                onClick={() => navigate("/home")}
                type="button"
              >
                Volver al inicio
              </Button>
            </Col>
            <Col md={4} className="text-end">
              <Button variant="light" type="submit">
                Confirmar Reserva
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NewReserva;

// FIN CAMBIO JULIAN

