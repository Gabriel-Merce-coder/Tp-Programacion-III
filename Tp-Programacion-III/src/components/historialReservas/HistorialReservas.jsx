// /////////////////////////////////////////////////////////
// CAMBIO JULIAN: nuevo componente para mostrar el historial de reservas
// /////////////////////////////////////////////////////////

import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HistorialReservas = ({ reservas, peliculas, funciones }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-dark min-vh-100 text-white">
      <h2 className="mb-4">📜 Historial de Reservas</h2>

      {reservas.length === 0 ? (
        <p>No hay reservas registradas todavía.</p>
      ) : (
        <Row>
          {reservas.map((reserva) => {
            const pelicula = peliculas.find((p) => p.id === reserva.peliculaId);
            const funcion = funciones.find((f) => f.id === reserva.funcionId);

            return (
              <Col key={reserva.id} xs={12} md={6} lg={4} className="mb-3">
                <Card bg="secondary" text="white" className="shadow-sm">
                  <Card.Body>
                    <Card.Title>🎟️ {reserva.nombre}</Card.Title>
                    <Card.Text>
                      <strong>Película:</strong>{" "}
                      {pelicula ? pelicula.titulo : "No encontrada"} <br />
                      <strong>Función:</strong>{" "}
                      {funcion
                        ? `Sala ${funcion.salaId} - ${funcion.fecha} ${funcion.hora}`
                        : "No encontrada"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      <div className="text-end mt-4">
        <Button variant="outline-light" onClick={() => navigate("/home")}>
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};

export default HistorialReservas;

// FIN CAMBIO JULIAN
