import { Card, Button } from "react-bootstrap";

const SalaItem = ({ sala, onDelete, onEdit }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>🏛️ Sala {sala.numero}</Card.Title>
        <Card.Text>
          Capacidad: {sala.capacidad} <br />
          Ubicación: {sala.ubicacion}
        </Card.Text>

        <div className="d-flex gap-2 mt-2">
          {/* /////////////////////////////////////////////////////////
              CAMBIO JULIAN: botones editar y eliminar funcionales
              ///////////////////////////////////////////////////////// */}
          <Button
            variant="warning"
            size="sm"
            onClick={() => onEdit(sala)} // Editar sala
          >
            ✏️ Editar
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onDelete} // Eliminar sala
          >
            🗑️ Eliminar
          </Button>
          {/* FIN CAMBIO JULIAN */}
        </div>
      </Card.Body>
    </Card>
  );
};

export default SalaItem;

