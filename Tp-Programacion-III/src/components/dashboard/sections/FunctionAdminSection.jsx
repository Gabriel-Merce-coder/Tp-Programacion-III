import { useState } from "react";
import { Container, Row, Col, Card, Table, Badge, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Mymodal from "../../ui/Mymodal";
import useFunciones from "../../../hooks/useFunciones";
import { useNavigate } from "react-router";

const FuncionAdminSection = ({ setEditFuncion }) => {
  const { funciones, toggleEstadoFuncion } = useFunciones();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedFuncion, setSelectedFuncion] = useState(null);
  const navigate = useNavigate();

  const handleStatusClick = (funcion) => {
    setSelectedFuncion(funcion);
    setShowConfirm(true);
  };

  const confirmStatusChange = async () => {
    if (!selectedFuncion) return;

    const result = await toggleEstadoFuncion(selectedFuncion.id);

    if (result?.success) {
      toast.success(result.message || "Estado actualizado correctamente");
    } else {
      toast.error(result?.message || "Error al actualizar el estado");
    }

    setShowConfirm(false);
    setSelectedFuncion(null);
  };

  const handleEditClick = (funcion) => {
    setEditFuncion(funcion);
    navigate(`/dashboard/edit-function/${funcion.id}`);
  };

  return (
    <>
      <Container className="py-4">
        <Row>
          <Col>
            <Card className="bg-dark text-white">
              <Card.Header className="bg-secondary">
                <h4 className="mb-0">Gestión de Funciones</h4>
              </Card.Header>
              <Card.Body>
                {funciones.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted">No hay funciones registradas</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <Table striped bordered hover variant="dark" size="sm">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Película</th>
                          <th>Sala</th>
                          <th>Fecha</th>
                          <th>Hora</th>
                          <th>Precio</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {funciones.map((funcion, index) => (
                          <tr key={funcion.id || index}>
                            <td>{index + 1}</td>
                            <td>{funcion.pelicula?.titulo || "—"}</td>
                            <td>{funcion.sala?.numeroSala || "—"}</td>
                            <td>{funcion.fecha}</td>
                            <td>{funcion.hora}</td>
                            <td>${funcion.precio}</td>
                            <td>
                              <Badge
                                bg={funcion.estado ? "success" : "danger"}
                                style={{ cursor: "pointer" }}
                                onClick={() => handleStatusClick(funcion)}
                              >
                                {funcion.estado ? "Activa" : "Inactiva"}
                              </Badge>
                            </td>
                            <td className="text-center">
                              <Button
                                variant="warning"
                                size="sm"
                                onClick={() => handleEditClick(funcion)}
                              >
                                Editar
                              </Button>
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
          setSelectedFuncion(null);
        }}
        onConfirm={confirmStatusChange}
        title="Confirmar cambio de estado"
        message={`¿Estás seguro de ${selectedFuncion?.estado ? "desactivar" : "activar"
          } la función de la película ${selectedFuncion?.pelicula?.titulo || ""
          } en la sala ${selectedFuncion?.sala?.numeroSala || ""}?`}
        confirmText={selectedFuncion?.estado ? "Sí, desactivar" : "Sí, activar"}
        cancelText="No, cancelar"
      />
    </>
  );
};

export default FuncionAdminSection;
