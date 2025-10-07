import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import useSalaForm from "../hooks/useSalaForm";

const NewSala = ({ onSalaAdd }) => {
  const navigate = useNavigate();

  const {
    tipo_sala,
    capacidad,
    estado,
    errores,

    tipo_salaRef,
    capacidadRef,

    handleChangeTipo_Sala,
    handleChangeCapacidad,
    handleChangeEstado,

    setTipo_Sala,
    setCapacidad,
    setEstado,
    setErrores,
  } = useSalaForm();

  const handleAddSala = (e) => {
    e.preventDefault();

    let errorSala = { tipo_sala: "", capacidad: "" };

    if (!tipo_sala) {
      errorSala.tipo_sala = "El tipo de sala no puede estar vacío";
    }
    if (!capacidad || capacidad <= 0) {
      errorSala.capacidad = "La capacidad debe ser un número mayor a 0";
    }

    if (errorSala.tipo_sala || errorSala.capacidad) {
      setErrores(errorSala);
      toast.error("Por favor, revise los campos");

      if (errorSala.tipo_sala) tipo_salaRef.current.focus();
      else if (errorSala.capacidad) capacidadRef.current.focus();

      return;
    }

    const nuevaSala = {
      tipo_sala: tipo_sala,
      capacidad: parseInt(capacidad),
      estado: estado,
    };

    toast.success("Sala agregada correctamente");
    onSalaAdd(nuevaSala);

    // Reset de campos
    setTipo_Sala("");
    setCapacidad("");
    setEstado(true);

    navigate("/home");
  };

  return (
    <div>
    

      <Card className="m-4 w-50" bg="info">
        <Card.Body>
          <Form className="text-white" onSubmit={handleAddSala}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="tipo_sala">
                  <Form.Label>Tipo de Sala</Form.Label>
                  <Form.Select
                    ref={tipo_salaRef}
                    value={tipo_sala}
                    onChange={handleChangeTipo_Sala}
                    isInvalid={!!errores.tipo_sala}
                  >
                    <option value="">Seleccione tipo</option>
                    <option value="2D">2D</option>
                    <option value="3D">3D</option>
                    <option value="4D">4D</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errores.tipo_sala}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

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
            </Row>

            <Row>
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

            <Row className="justify-content-end">
              <Col md={3} className="d-flex flex-column justify-content-end align-items-end">
                <Button variant="primary" type="submit">
                  Agregar Sala
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewSala;
