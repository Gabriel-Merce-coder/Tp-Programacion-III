import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import DeleteModal from "../ui/Mymodal";

const SalaItem = ({ sala, onDelete, onEdit }) => {
  const [showConfirm, setShowConfirm] = useState(false); 
  const handleConfirmDelete = () => {
    setShowConfirm(false);
    onDelete(sala.id);
  };
  return (
    <>
      <Card className="mb-3 bg-secondary text-white shadow-sm border-0 rounded-3">
        <Card.Body>
          <Card.Title className="mb-3">
            🏛️ Sala {sala.numero || "No especificada"}
          </Card.Title>

          <div className="ms-2">
            <p className="mb-1">
              <strong>Número:</strong> {sala.numero || "No especificado"}
            </p>
            <p className="mb-1">
              <strong>Tipo:</strong> {sala.tipo_sala || "No especificado"}
            </p>
            <p className="mb-1">
              <strong>Capacidad:</strong> {sala.capacidad || "No especificada"}
            </p>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="warning" size="sm" onClick={() => onEdit(sala)}>
              Editar
            </Button>
            <Button variant="danger" size="sm" onClick={() => setShowConfirm(true)}>
              Eliminar
            </Button>
          </div>
        </Card.Body>
      </Card>
      <DeleteModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar eliminación"
        message="¿Deseás eliminar esta sala?"
        confirmText="Sí, eliminar"
        cancelText="No, cancelar"
      />
    </>
  );
};

export default SalaItem;
