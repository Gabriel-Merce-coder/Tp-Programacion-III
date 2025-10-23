// /////////////////////////////////////////////////////////
// CAMBIO JULIAN: mostrar la información formateada y legible
// /////////////////////////////////////////////////////////
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import DeleteModal from "../ui/Mymodal";

const ReservaItem = ({ reserva, pelicula, funcion, onCancel }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmCancel = () => {
    setShowConfirm(false);
    onCancel(); 
  };

  return (
    <>
      <Card className="mb-3 bg-secondary text-white shadow-sm border-0 rounded-3">
        <Card.Body>
          <Card.Title className="mb-3">
            Reserva de <span className="text-capitalize">{reserva.nombre}</span>
          </Card.Title>

          <div className="ms-2">
            <p className="mb-1">
              <strong> Película:</strong>{" "}
              {pelicula ? pelicula.titulo : "No encontrada"}
            </p>
            {funcion ? (
              <>
                <p className="mb-1">
                  <strong> Sala:</strong> {funcion.salaId}
                </p>
                <p className="mb-1">
                  <strong> Fecha:</strong> {funcion.fecha}
                </p>
                <p className="mb-1">
                  <strong> Hora:</strong> {funcion.hora}
                </p>
              </>
            ) : (
              <p className="mb-1 text-danger">Función no encontrada</p>
            )}
            <p className="mb-1">
              <strong> Cantidad:</strong> {reserva.cantidad}
            </p>
            <p className="mb-2">
              <strong> Precio total:</strong>{" "}
              {reserva.precioTotal ? `$${reserva.precioTotal.toFixed(2)}` : "—"}
            </p>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowConfirm(true)}
            >
              Cancelar Reserva
            </Button>
          </div>
        </Card.Body>
      </Card>

      <DeleteModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={handleConfirmCancel}
        title="Confirmar cancelación"
        message="¿Deseás cancelar la reserva?"
        confirmText="Sí, cancelar reserva"
      />
    </>
  );
};

export default ReservaItem;

// FIN CAMBIO JULIAN
