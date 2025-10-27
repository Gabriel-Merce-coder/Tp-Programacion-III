import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { BsTicketPerforated } from "react-icons/bs";
import Navbar from "../navbar/Navbar";
import useMyReservas from "../../hooks/useMyReservas";
import ReservaTicket from "./ReservaTicket";

const MyReservas = ({ onLogOut }) => {
    const { reservas, loading, cancelReserva } = useMyReservas();

    if (loading) {
        return (
            <div className="min-vh-100 bg-dark text-white">
                <Navbar onLogOut={onLogOut} />
                <Container className="py-4">
                    <div className="d-flex justify-content-center align-items-center py-5">
                        <Spinner animation="border" variant="light" className="me-3" />
                        <span className="text-white">Cargando tus reservas...</span>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="min-vh-100 bg-dark text-white">
            <Navbar onLogOut={onLogOut} />
            <Container className="py-4">
                <div className="d-flex align-items-center mb-4">
                    <BsTicketPerforated className="me-3 text-warning" size={32} />
                    <div>
                        <h2 className="text-white mb-0">🎫 Mis Reservas</h2>
                        <p className="text-muted mb-0">Todas tus entradas de cine</p>
                    </div>
                </div>

                {reservas.length === 0 ? (
                    <Alert variant="info" className="text-center">
                        <Alert.Heading>No tienes reservas</Alert.Heading>
                        <p>
                            Aún no has realizado ninguna reserva.
                            <br />
                            ¡Explora nuestra cartelera y reserva tus entradas favoritas!
                        </p>
                    </Alert>
                ) : (
                    <>
                        <div className="mb-3">
                            <p className="text-white">
                                Tienes <strong>{reservas.length}</strong> {reservas.length === 1 ? 'reserva' : 'reservas'} confirmada{reservas.length === 1 ? '' : 's'}
                            </p>
                        </div>

                        <Row>
                            {reservas.map((reserva) => (
                                <Col key={reserva.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
                                    <ReservaTicket
                                        reserva={reserva}
                                        onCancelReserva={cancelReserva}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </>
                )}
            </Container>
        </div>
    );
};

export default MyReservas;
