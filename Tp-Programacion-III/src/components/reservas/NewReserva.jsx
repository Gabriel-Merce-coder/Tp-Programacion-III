// /////////////////////////////////////////////////////////
// CAMBIO JULIAN: formulario de reserva con filtrado de funciones por película
// /////////////////////////////////////////////////////////

import { useState, useEffect, useMemo } from "react";
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
    cantidad: "",
    precioTotal: "",
  });

  const [errores, setErrores] = useState({
    nombre: "",
    peliculaId: "",
    funcionId: "",
    cantidad: "",
  });

  // /////////////////////////////////////////////////////////
  // CAMBIO JULIAN: filtrar funciones por película seleccionada
  // /////////////////////////////////////////////////////////
  const funcionesFiltradas = useMemo(() => {
    const pid = parseInt(reserva.peliculaId);
    if (!pid) return [];
    return funciones.filter((f) => f.peliculaId === pid);
  }, [funciones, reserva.peliculaId]);
  // FIN CAMBIO JULIAN

  // /////////////////////////////////////////////////////////
  // CAMBIO JULIAN: si cambia la película, limpiar función y precio
  // /////////////////////////////////////////////////////////
  useEffect(() => {
    setReserva((prev) => ({
      ...prev,
      funcionId: "",
      precioTotal: "",
    }));
    // también limpiamos el error de funcionId
    setErrores((prev) => ({ ...prev, funcionId: "" }));
  }, [reserva.peliculaId]);
  // FIN CAMBIO JULIAN

  // /////////////////////////////////////////////////////////
  // CAMBIO JULIAN: calcular precio total (función * cantidad)
  // /////////////////////////////////////////////////////////
  const calcularPrecio = (cantidad, funcionId) => {
    const funcSel = funciones.find((f) => f.id === parseInt(funcionId));
    if (!funcSel || !cantidad) return "";
    return (Number(funcSel.precio) * Number(cantidad)).toFixed(2);
  };
  // FIN CAMBIO JULIAN

  const handleChange = (e) => {
    const { name, value } = e.target;

    setReserva((prev) => {
      const next = { ...prev, [name]: value };

      // actualizar precioTotal en tiempo real si cambian cantidad o funcionId
      if (name === "cantidad" || name === "funcionId") {
        next.precioTotal = calcularPrecio(
          name === "cantidad" ? value : prev.cantidad,
          name === "funcionId" ? value : prev.funcionId
        );
      }

      return next;
    });

    setErrores((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = {};
    if (!reserva.nombre) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!reserva.peliculaId)
      nuevosErrores.peliculaId = "Debe seleccionar una película";
    if (!reserva.funcionId)
      nuevosErrores.funcionId = "Debe seleccionar una función";
    if (!reserva.cantidad || Number(reserva.cantidad) <= 0)
      nuevosErrores.cantidad = "Debe ingresar una cantidad válida";

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
      cantidad: parseInt(reserva.cantidad),
      precioTotal: reserva.precioTotal ? parseFloat(reserva.precioTotal) : 0,
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
              disabled={!reserva.peliculaId} // deshabilitar hasta elegir película
            >
              <option value="">
                {reserva.peliculaId
                  ? "Seleccione una función"
                  : "Seleccione primero una película"}
              </option>
              {funcionesFiltradas.map((funcion) => (
                <option key={funcion.id} value={funcion.id}>
                  {`Sala ${funcion.salaId} - ${funcion.fecha} ${funcion.hora} ($${funcion.precio})`}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errores.funcionId}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad de Entradas</Form.Label>
            <Form.Control
              type="number"
              name="cantidad"
              min="1"
              value={reserva.cantidad}
              onChange={handleChange}
              isInvalid={!!errores.cantidad}
            />
            <Form.Control.Feedback type="invalid">
              {errores.cantidad}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio Total</Form.Label>
            <Form.Control
              type="text"
              name="precioTotal"
              value={reserva.precioTotal ? `$${reserva.precioTotal}` : ""}
              readOnly
            />
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




