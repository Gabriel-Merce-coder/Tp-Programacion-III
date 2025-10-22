import { Card, Button } from "react-bootstrap";

const SalaItem = ({ sala, onDelete, onEdit }) => {
  return (
    <Card className="mb-3 bg-secondary text-white shadow-sm border-0 rounded-3">
      <Card.Body>
        <Card.Title className="mb-3">
          🏛️ Sala {sala.numero}
        </Card.Title>

        <div className="ms-2">
          <p className="mb-1">
          <p className="mb-1">
            <strong>Número:</strong> {sala.numero|| "No especificado"}
          </p>
            <strong>Tipo:</strong> {sala.tipo_sala || "No especificado"}
          </p>
          <p className="mb-1">
            <strong>Capacidad:</strong> {sala.capacidad}
          </p>
          
          
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button
            variant="warning"
            size="sm"
            onClick={() => onEdit(sala)}
          >
             Editar
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onDelete}
          >
           Eliminar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SalaItem;
