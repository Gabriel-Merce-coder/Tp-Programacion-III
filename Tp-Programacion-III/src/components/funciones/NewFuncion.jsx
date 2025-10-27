import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import useFuncionForm from "../../hooks/useFuncionForm";
import { useEffect } from "react";
import "./NewFuncion.css"; // 🎨 Estilos tipo Netflix

const NewFuncion = ({ onFuncionAdd, editFuncion }) => {
  const navigate = useNavigate();

  // nos traemos todo de useFuncionForm
  const {
    precio,
    fecha,
    hora,
    peliculaId,
    salaId,
    estado,
    errores,
    precioRef,
    fechaRef,
    horaRef,
    peliculaIdRef,
    salaIdRef,
    handleChangePrecio,
    handleChangeFecha,
    handleChangeHora,
    handleChangePeliculaId,
    handleChangeSalaId,
    handleChangeEstado,
    setPrecio,
    setFecha,
    setHora,
    setPeliculaId,
    setSalaId,
    setEstado,
    setErrores,
  } = useFuncionForm();

  // /////////////////////////////////////////////////////////
  // CAMBIO JULIAN: precargar datos si se edita una función
  // /////////////////////////////////////////////////////////
  useEffect(() => {
    if (editFuncion) {
      setPrecio(editFuncion.precio);
      setFecha(editFuncion.fecha);
      setHora(editFuncion.hora);
      setPeliculaId(editFuncion.peliculaId);
      setSalaId(editFuncion.salaId);
      setEstado(editFuncion.estado);
    }
  }, [editFuncion]);
  // FIN CAMBIO JULIAN

  const handleAddFunction = (e) => {
    e.preventDefault();

    let errorFuncion = {
      precio: "",
      fecha: "",
      hora: "",
      peliculaId: "",
      salaId: "",
    };

    if (precio === "" || precio <= 0) {
      errorFuncion.precio = "El precio no puede estar vacío o ser menor a 0";
    }
    if (fecha === "") {
      errorFuncion.fecha = "La fecha no puede estar vacía";
    }
    if (hora === "") {
      errorFuncion.hora = "La hora no puede estar vacía";
    }
    if (peliculaId === "" || peliculaId <= 0) {
      errorFuncion.peliculaId =
        "El ID de la película no puede estar vacío y debe ser mayor a 0";
    }
    if (salaId === "" || salaId <= 0) {
      errorFuncion.salaId =
        "El ID de la sala no puede estar vacío y debe ser mayor a 0";
    }

    if (
      errorFuncion.precio ||
      errorFuncion.fecha ||
      errorFuncion.hora ||
      errorFuncion.peliculaId ||
      errorFuncion.salaId
    ) {
      setErrores(errorFuncion);
      toast.error("Por favor, revise los campos");
      // Poner focus en el primer input con error
      if (errorFuncion.precio) precioRef.current.focus();
      else if (errorFuncion.fecha) fechaRef.current.focus();
      else if (errorFuncion.hora) horaRef.current.focus();
      else if (errorFuncion.peliculaId) peliculaIdRef.current.focus();
      else if (errorFuncion.salaId) salaIdRef.current.focus();
      return;
    }

    const funcionData = {
      peliculaId: parseInt(peliculaId),
      salaId: parseInt(salaId),
      precio: parseFloat(precio),
      fecha,
      hora,
      estado,
    };

    console.log(funcionData);
    onFuncionAdd(funcionData);

    setPrecio("");
    setFecha("");
    setHora("");
    setPeliculaId("");
    setSalaId("");
    setEstado(true);

    navigate("/dashboard");
  };

  // ============================
  // ESTRUCTURA VISUAL - NETFLIX STYLE
  // ============================
  return (
    <div className="new-funcion-container">
      <Card className="new-funcion-card">
        <Card.Body>
          <h4 className="text-center mb-4">
            {editFuncion ? "Editar Función" : "Agregar Nueva Función"}
          </h4>

          <Form onSubmit={handleAddFunction}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="peliculaId">
                  <Form.Label>ID Película</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="ID de la película"
                    min="1"
                    value={peliculaId}
                    onChange={handleChangePeliculaId}
                    ref={peliculaIdRef}
                    isInvalid={!!errores.peliculaId}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.peliculaId}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="salaId">
                  <Form.Label>ID Sala</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="ID de la sala"
                    min="1"
                    value={salaId}
                    onChange={handleChangeSalaId}
                    ref={salaIdRef}
                    isInvalid={!!errores.salaId}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.salaId}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="precio">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Precio"
                    min="0"
                    value={precio}
                    onChange={handleChangePrecio}
                    ref={precioRef}
                    isInvalid={!!errores.precio}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.precio}
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

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="fecha">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    value={fecha}
                    onChange={handleChangeFecha}
                    ref={fechaRef}
                    isInvalid={!!errores.fecha}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.fecha}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="hora">
                  <Form.Label>Hora</Form.Label>
                  <Form.Control
                    type="time"
                    value={hora}
                    onChange={handleChangeHora}
                    ref={horaRef}
                    isInvalid={!!errores.hora}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.hora}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-between mt-4">
              <Col md={4}>
                <Button
                  variant="outline-light"
                  onClick={() => navigate("/dashboard")}
                  type="button"
                >
                  Volver al inicio
                </Button>
              </Col>
              <Col
                md={3}
                className="d-flex flex-column justify-content-end align-items-end"
              >
                <Button variant="primary" type="submit">
                  {/* CAMBIO JULIAN: botón dinámico */}
                  {editFuncion ? "Guardar Cambios" : "Agregar Función"}
                  {/* FIN CAMBIO JULIAN */}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewFuncion;

