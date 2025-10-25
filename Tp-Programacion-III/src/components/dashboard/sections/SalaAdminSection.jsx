import { useState } from "react";
import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import Mymodal from "../../ui/Mymodal";
import useSala from "../../../hooks/useSala";

const SalaAdminSection = () => {
  const { salas, toggleEstadoSala } = useSala();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedSala, setSelectedSala] = useState(null);

  const handleStatusClick = (sala) => {
    setSelectedSala(sala);
    setShowConfirm(true);
  };

  const confirmStatusChange = async () => {
    if (!selectedSala) return;

    
    const result = await toggleEstadoSala(selectedSala.id);

    if (result?.success) {
      toast.success(result.message || "Estado actualizado correctamente");
    } else {
      toast.error(result?.message || "Error al actualizar el estado");
    }

    setShowConfirm(false);
    setSelectedSala(null);
  };

  return (
    <>
      <Container className="py-4">
        <Row>
          <Col>
            <Card className="bg-dark text-white">
              <Card.Header className="bg-secondary">
                <h4 className="mb-0">Gestión de Salas</h4>
              </Card.Header>
              <Card.Body>
                {salas.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted">No hay salas registradas</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <Table striped bordered hover variant="dark" size="sm">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Número</th>
                          <th>Tipo</th>
                          <th>Capacidad</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salas.map((sala, index) => (
                          <tr key={sala.id || index}>
                            <td>{index + 1}</td>
                            <td>{sala.numeroSala}</td>
                            <td>{sala.tipoSala}</td>
                            <td>{sala.capacidad}</td>
                            <td>
                              <Badge
                                bg={sala.estado ? "success" : "danger"}
                                style={{ cursor: "pointer" }}
                                onClick={() => handleStatusClick(sala)}
                              >
                                {sala.estado ? "Activa" : "Inactiva"}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Mymodal
        show={showConfirm}
        onHide={() => {
          setShowConfirm(false);
          setSelectedSala(null);
        }}
        onConfirm={confirmStatusChange}
        title="Confirmar cambio de estado"
        message={`¿Estás seguro de ${
          selectedSala?.estado ? "desactivar" : "activar"
        } la sala número ${selectedSala?.numeroSala}?`}
        confirmText={selectedSala?.estado ? "Sí, desactivar" : "Sí, activar"}
        cancelText="No, cancelar"
      />
    </>
  );
};

export default SalaAdminSection;

