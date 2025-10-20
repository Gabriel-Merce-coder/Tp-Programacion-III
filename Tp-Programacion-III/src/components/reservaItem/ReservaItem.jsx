// /////////////////////////////////////////////////////////
// CAMBIO JULIAN: nuevo componente para mostrar reservas
// /////////////////////////////////////////////////////////

import { Card, Button } from "react-bootstrap";

const ReservaItem = ({ reserva, pelicula, funcion, onCancel }) => {
  return (
    <Card className="mb-3 bg-secondary text-white shadow-sm">
      <Card.Body>
        <Card.Title>🎟️ Reserva de {reserva.nombre}</Card.Title>
        <Card.Text>
          <strong>Película:</strong>{" "}
          {pelicula ? pelicula.titulo : "No encontrada"} <br />
          <strong>Función:</strong>{" "}
          {funcion
            ? `Sala ${funcion.salaId} - ${funcion.fecha} ${funcion.hora}`
            : "No encontrada"}
        </Card.Text>

        <div className="d-flex justify-content-end">
          <Button variant="danger" size="sm" onClick={onCancel}>
            🗑️ Cancelar Reserva
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReservaItem;

// FIN CAMBIO JULIAN
