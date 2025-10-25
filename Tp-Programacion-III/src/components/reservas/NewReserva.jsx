import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, Form, Button, Col, Row, Spinner, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFuncionesFromAPI from "../../hooks/useFuncionesFromAPI";
import PageNotFound from "../ui/PageNotFound";

const NewReserva = ({ peliculas, onAddReserva }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const funcionIdFromUrl = searchParams.get('funcionId');

  // Hook para cargar funciones desde la API
  const { funciones, loading, error } = useFuncionesFromAPI();

  const [reserva, setReserva] = useState({
    funcionId: funcionIdFromUrl,
    cantidad: "",
  });

  const [errores, setErrores] = useState({
    funcionId: "",
    cantidad: "",
  });

  const [showModal, setShowModal] = useState(false);

  // Pre-llenar película
  useEffect(() => {
    if (funcionIdFromUrl) {
      const funcion = funciones.find(f => f.id === parseInt(funcionIdFromUrl));
      if (funcion) {
        setReserva(prev => ({
          ...prev,
          peliculaId: funcion.peliculaId.toString(),
          funcionId: funcionIdFromUrl
        }));
      }
    }
  }, [funcionIdFromUrl, funciones]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setReserva((prev) => ({ ...prev, [name]: value }));

    // Validación en tiempo real para cantidad
    if (name === "cantidad") {
      const cantidad = Number(value);
      if (cantidad > 5) {
        setErrores((prev) => ({ ...prev, cantidad: "No se pueden comprar más de 5 entradas" }));
      } else if (cantidad <= 0 && value !== "") {
        setErrores((prev) => ({ ...prev, cantidad: "Debe ingresar una cantidad válida" }));
      } else {
        setErrores((prev => ({ ...prev, cantidad: "" })));
      }
    } else {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = {};

    if (!reserva.cantidad || Number(reserva.cantidad) <= 0) {
      nuevosErrores.cantidad = "Debe ingresar una cantidad válida";
    } else if (Number(reserva.cantidad) > 5) {
      nuevosErrores.cantidad = "No se pueden comprar más de 5 entradas";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      toast.error("Por favor revise los campos");
      return;
    }

    setShowModal(true);
  };

  const handleConfirmReserva = () => {
    const nuevaReserva = {
      peliculaId: parseInt(reserva.peliculaId),
      funcionId: parseInt(reserva.funcionId),
      cantidadAsientos: parseInt(reserva.cantidad),
    };

    onAddReserva(nuevaReserva);
    setShowModal(false);
    navigate("/home");
  };

  if (funcionIdFromUrl) {
    if (loading) {
      return (
        <Card className="m-4 w-50" bg="secondary" text="white">
          <Card.Body>
            <div className="d-flex align-items-center justify-content-center py-5">
              <Spinner animation="border" size="sm" className="me-2" />
              <span>Cargando información de la función...</span>
            </div>
          </Card.Body>
        </Card>
      );
    }

    if (error) {
      return (
        <Card className="m-4 w-50" bg="secondary" text="white">
          <Card.Body>
            <div className="text-center py-5">
              <p className="text-danger">Error al cargar las funciones: {error}</p>
              <Button variant="outline-light" onClick={() => navigate("/home")}>
                Volver al inicio
              </Button>
            </div>
          </Card.Body>
        </Card>
      );
    }

    const funcion = funciones.find(f => f.id === parseInt(funcionIdFromUrl));
    const pelicula = peliculas.find(p => p.id === funcion?.peliculaId);
    const precioTotal = funcion ? (funcion.precio * Number(reserva.cantidad)).toFixed(2) : 0;

    return (
      <>
        <Card className="m-4 w-50" bg="secondary" text="white">
          <Card.Body>
            <h4 className="mb-4">🎟️ Nueva Reserva</h4>
            <div className="mb-4">
              <h5>Película: {pelicula?.titulo}</h5>
              <p>Función: {funcion?.fecha} a las {funcion?.hora}</p>
              <p>Precio por entrada: ${funcion?.precio}</p>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Cantidad de Entradas</Form.Label>
                <Form.Control
                  type="number"
                  name="cantidad"
                  min="1"
                  max="5"
                  value={reserva.cantidad}
                  onChange={handleChange}
                  isInvalid={!!errores.cantidad}
                  placeholder="Máximo 5 entradas"
                />
                <Form.Control.Feedback type="invalid">
                  {errores.cantidad}
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

        {/* Modal de confirmación */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>🎟️ Confirmar Reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h5 className="mb-3">Resumen de la Reserva</h5>
              <div className="mb-3">
                <strong>Película:</strong> {pelicula?.titulo}
              </div>
              <div className="mb-3">
                <strong>Función:</strong> {funcion?.fecha} a las {funcion?.hora}
              </div>
              <div className="mb-3">
                <strong>Cantidad de entradas:</strong> {reserva.cantidad}
              </div>
              <div className="mb-3">
                <strong>Precio por entrada:</strong> ${funcion?.precio}
              </div>
              <hr />
              <div className="mb-3">
                <h4><strong>Precio Total: ${precioTotal}</strong></h4>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleConfirmReserva}>
              Confirmar Reserva
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  // Si no viene desde una función específica, mostrar PageNotFound
  return <PageNotFound />;
};

export default NewReserva;