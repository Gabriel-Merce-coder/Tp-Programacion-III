import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import DeleteModal from "../ui/Mymodal";

const FuncionItem = ({ funcion, peliculas, onDelete, onEdit }) => {
  const [showConfirm, setShowConfirm] = useState(false); // Estado para el modal
  const pelicula = peliculas.find((p) => p.id === funcion.peliculaId);

  const handleConfirmDelete = () => {
    setShowConfirm(false);
    onDelete(funcion.id);
  };

  return (
    <>
      <Card className="mb-3 bg-secondary text-white shadow-sm border-0 rounded-3">
        <Card.Body>
          <Card.Title className="mb-3">
            🎬 {pelicula ? pelicula.titulo : "Película desconocida"}
          </Card.Title>

          <div className="ms-2">
            <p className="mb-1">
              <strong>Sala:</strong> {funcion.salaId}
            </p>
            <p className="mb-1">
              <strong>Fecha:</strong> {funcion.fecha}
            </p>
            <p className="mb-1">
              <strong>Hora:</strong> {funcion.hora}
            </p>
            <p className="mb-1">
              <strong>Precio:</strong> ${funcion.precio}
            </p>
            <p className="mb-2">
              <strong>Estado:</strong> {funcion.estado ? "Activa" : "Inactiva"}
            </p>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="warning" size="sm" onClick={() => onEdit(funcion)}>
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
        message="¿Deseás eliminar esta función?"
        confirmText="Sí, eliminar"
        cancelText="No, cancelar"
      />
    </>
  );
};

export default FuncionItem;
