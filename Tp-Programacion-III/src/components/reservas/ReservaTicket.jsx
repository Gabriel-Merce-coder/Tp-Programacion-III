import { useState } from "react";
import { Card, Badge, Row, Col, Button } from "react-bootstrap";
import { BsCalendarDate, BsClock, BsTicketPerforated, BsXCircle } from "react-icons/bs";
import Mymodal from "../ui/Mymodal";

const ReservaTicket = ({ reserva, onCancelReserva }) => {
    const { funcion, cantidadAsientos, precioTotal, createdAt } = reserva;
    const { pelicula, estado: funcionEstado } = funcion || {};

    const isFuncionCancelada = funcionEstado === false;

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleCancelClick = () => {
        setShowConfirmModal(true);
    };

    const confirmCancel = () => {
        if (onCancelReserva) {
            onCancelReserva(reserva.id);
        }
        setShowConfirmModal(false);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <Card
                className={`bg-dark text-white mb-3 ${isFuncionCancelada ? 'border-danger' : 'border-secondary'}`}
                style={{ maxWidth: '400px' }}
            >
                <Card.Header className={`${isFuncionCancelada ? 'bg-danger' : 'bg-secondary'} d-flex justify-content-between align-items-center`}>
                    <div className="d-flex align-items-center">
                        <BsTicketPerforated className="me-2" />
                        <strong>Ticket #{reserva.id}</strong>
                    </div>
                    <Badge bg={isFuncionCancelada ? "danger" : "success"}>
                        {isFuncionCancelada ? "Función Cancelada" : "Confirmada"}
                    </Badge>
                </Card.Header>

                <Card.Body>
                    <div className="mb-3">
                        <h5 className="text-warning mb-1">{pelicula?.titulo || 'Película no disponible'}</h5>
                    </div>

                    <Row className="mb-3">
                        <Col xs={6}>
                            <div className="d-flex align-items-center">
                                <BsCalendarDate className="me-2 text-info" />
                                <div>
                                    <small className="text-muted">Fecha</small>
                                    <div className="fw-bold">{funcion?.fecha || 'N/A'}</div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div className="d-flex align-items-center">
                                <BsClock className="me-2 text-info" />
                                <div>
                                    <small className="text-muted">Hora</small>
                                    <div className="fw-bold">{funcion?.hora || 'N/A'}</div>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={6}>
                            <div>
                                <small className="text-muted">Asientos</small>
                                <div className="fw-bold">{cantidadAsientos} {cantidadAsientos === 1 ? 'entrada' : 'entradas'}</div>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div>
                                <small className="text-muted">Precio</small>
                                <div className="fw-bold text-success">${precioTotal}</div>
                            </div>
                        </Col>
                    </Row>

                    <div className="border-top pt-2">
                        <small className="text-muted">
                            Reservado el {formatDate(createdAt)} a las {formatTime(createdAt)}
                        </small>
                    </div>

                    {/* Botón de cancelar reserva - solo si la función no está cancelada */}
                    {!isFuncionCancelada && (
                        <div className="mt-3 text-center">
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={handleCancelClick}
                                className="d-flex align-items-center mx-auto"
                            >
                                <BsXCircle className="me-2" />
                                Cancelar Reserva
                            </Button>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Modal de confirmación */}
            <Mymodal
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                onConfirm={confirmCancel}
                title="Eliminar Reserva"
                message="¿Estás seguro que quieres eliminar esta reserva?"
                confirmText="Sí, eliminar"
                cancelText="No, cancelar"
            />
        </>
    );
};

export default ReservaTicket;
