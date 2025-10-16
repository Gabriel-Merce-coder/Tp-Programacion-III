import { Card, Button } from "react-bootstrap";

const SalaItem = ({ sala, onDelete }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>🏛️ Sala {sala.numero}</Card.Title>
        <Card.Text>
          Capacidad: {sala.capacidad} <br />
          Ubicación: {sala.ubicacion}
        </Card.Text>

        <div className="d-flex gap-2 mt-2">
          <Button variant="warning" size="sm">
            ✏️ Editar
          </Button>
          <Button variant="danger" size="sm" onClick={onDelete}>
            🗑️ Eliminar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SalaItem;
